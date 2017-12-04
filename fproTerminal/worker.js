define(['./core', './fileUpload'], function (core, fileUpload) {

    var module = {};

    // ===================================================================
    // message types
    // ===================================================================
    var ExecuteRequest = 'Execute';
    var FileUploadRequest = 'FileUpload';
    var ResultResponse = 'Result';
    var ProgressResponse = 'Progress';
    var RequestFileUploadResponse = 'RequestFileUpload';

    // ===================================================================
    // word admin class 
    // - spawns worker
    // - used for sending commands to worker 
    // - receiving result of commands
    // ===================================================================
    module.Worker = core.defineClass({
        _init: function (workerScript) {
            this.workerScript = workerScript;
            this.commandAdminMap = {};
        },
        start: function () {
            return new Promise(function (resolve, reject) {
                this.startPromise = { resolve: resolve, reject: reject };
                this.workerThread = new window.Worker(this.workerScript);
                this.workerThread.addEventListener('message', this.handleMessage.bind(this), false);
            }.bind(this));
        },
        handleMessage: function (message) {

            if (message.data === 'worker started') {
                this.startPromise.resolve();
                return;
            }

            var commandAdmin = this.commandAdminMap[message.data.id];

            switch (message.data.messageType) {
                case ResultResponse:
                    delete this.commandAdminMap[message.data.id];
                    if (!message.data.error) {
                        commandAdmin.resolve(message.data.result);
                    } else {
                        commandAdmin.reject(message.data.error);
                    }
                    break;
                case ProgressResponse:
                    if (commandAdmin.progress) {
                        commandAdmin.progress(message.data.progress);
                    }
                    break;
                case RequestFileUploadResponse:
                    fileUpload().then(function (file) {
                        this.workerThread.postMessage({
                            messageType: FileUploadRequest,
                            id: message.data.id,
                            file: file
                        });
                    }.bind(this)).catch(function (error) {
                        this.workerThread.postMessage({
                            messageType: FileUploadRequest,
                            id: message.data.id,
                            error: error
                        });
                    }.bind(this));
                    break;
            };

        },
        execute: function (command) {
            return new Promise(function (resolve, reject) {

                // store command in command admin map
                var commandAdmin = {
                    id: core.generateId(),
                    resolve: resolve,
                    reject: reject,
                    progress: command.progress
                };
                this.commandAdminMap[commandAdmin.id] = commandAdmin;

                // extend command by id and message type
                command.id = commandAdmin.id;
                command.messageType = ExecuteRequest;

                // send command to worker thread (temporay remove none serializable properties)
                delete command.progress;
                this.workerThread.postMessage(command);
                command.progress = commandAdmin.progress;

            }.bind(this));
        }
    });

    // ===================================================================
    // worker initialization
    // called within worker thread for registering commands
    // ===================================================================



    module.initializeWorker = function (commands) {

        module.commandRegistryMap = {};
        for (var i = 0; i < commands.length; ++i) {
            var command = commands[i];
            module.commandRegistryMap[command.prototype.type] = command;
        }

        var fileUploadRequestMap = {};

        self.addEventListener('message', function (message) {

            switch (message.data.messageType) {
                case ExecuteRequest:
                    message.data.progress = function (progressData) {
                        self.postMessage({ messageType: ProgressResponse, id: message.data.id, progress: progressData });
                    };
                    message.data.fileUpload = function () {
                        return new Promise(function (resolve, reject) {
                            var fileUploadRequestId = core.generateId();
                            fileUploadRequestMap[fileUploadRequestId] = { resolve: resolve, reject: reject };
                            self.postMessage({ messageType: RequestFileUploadResponse, id: fileUploadRequestId });
                        });
                    };
                    var command = new module.commandRegistryMap[message.data.type](message.data);
                    Promise.resolve().then(function () {
                        return command.execute();
                    }).then(function (result) {
                        self.postMessage({ messageType: ResultResponse, id: message.data.id, result: result });
                    }).catch(function (error) {
                        self.postMessage({ messageType: ResultResponse, id: message.data.id, error: error.toString() });
                    });
                    break;
                case FileUploadRequest:
                    var fileUploadRequest = fileUploadRequestMap[message.data.id];
                    delete fileUploadRequestMap[message.data.id];
                    if (!message.data.error) {
                        fileUploadRequest.resolve(message.data.file);
                    } else {
                        fileUploadRequest.reject(message.data.error);
                    }
                    break;
            }

        }, false);

        self.postMessage('worker started');
    };

    return module;

});












