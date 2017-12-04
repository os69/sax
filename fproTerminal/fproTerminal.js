define(['./core', './worker', './Terminal', './format', './fileUpload'], function (core, worker, Terminal, format, fileUpload) {

    var worker = new worker.Worker('fproWorker.js');

    worker.start().then(function () {

        //fileUpload();

        var terminal = new Terminal({
            prompt: 'fpro $',
            shell_view_id: 'fpro-shell-view',
            shell_panel_id: 'fpro-shell-panel',
            execute: function (cmd) {                          
                return worker.execute({ type: 'ExecuteFproScript', script: cmd, progress: this.progress.bind(this) }).then(function (result) {              
                    return result;
                }).catch(function (error) {                    
                    return format.error(error);
                });
            },
            completion: function (line) {
                return worker.execute({ type: 'FproSuggestion', line: line }).catch(function (error) {
                    console.log(error);
                });
            },
            progress: function (progress) {
                this.shell.renderOutputRaw(format.progress(progress) + '<br>');
            }
        });

    });


});

