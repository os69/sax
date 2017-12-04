define(['./core', './ajax', './fproSuggest'], function (core, ajax, fproSuggest) {

    var module = {};
    var fpro = {};
    var local = {};

    fpro.getJobs = function () {
        module.service.progress('50%');
        var response = ajax.request({ url: 'sample/jobs.json', method: 'GET', async: false, format: 'json' });
        return core.map(response.data, Job.fromJson);
    };

    var Job = core.defineClass({
        _init: function (properties) {
            this.id = properties.id;
            this.description = properties.description;
        },
        getTasks: function () {
            var response = ajax.request({ url: 'sample/tasks_' + this.id + '.json', method: 'GET', async: false, format: 'json' });
            return core.map(response.data, Task.fromJson);
        },
        toString: function () {
            return 'Job ' + this.id;
        }
    });
    Job.fromJson = function (json) {
        return new Job(json);
    };

    var Task = core.defineClass({
        _init: function (properties) {
            this.id = properties.id;
            this.description = properties.description;
        },
        toString: function () {
            return 'Task ' + this.id;
        }
    });
    Task.fromJson = function (json) {
        return new Task(json);
    };

    var Dictionary = core.defineClass({
        _init: function (properties) {
            this.name = properties.name;
        },
        toString: function () {
            return 'Dictionary ' + this.name;
        }
    });
    Dictionary.fromJson = function (json) {
        return new Dictionary(json);
    };
    Dictionary.create = function () {
        return module.service.fileUpload().then(function (file) {
            return 'created';
        });
    };

    module.eval = function (script) {
        var result = eval(script);
        return result;
    };

    module.execute = function (script) {
        return Promise.resolve().then(function () {
            return module.eval(script);
        }).then(function (result) {
            return result.toString();
        });
    };

    module.suggest = function (line) {
        return fproSuggest(line, module.eval);
    };

    module.setServiceHandler = function (handler) {
        module.service.progress = handler.progress;
        module.service.fileUpload = handler.fileUpload;
    };

    module.service = {
        progress: null,
        fileUpload: null,
    };

    return module;
});

