importScripts("lib/require.js");

requirejs({
    baseUrl: "./"
}, ['./core', './worker', './fpro', './format'], function (core, worker, fpro, format) {

    var AddCommand = core.defineClass({
        type: 'Add',
        _init: function (data) {
            this.data = data;
        },
        execute: function () {
            return this.data.a + this.data.b;
        }
    });

    var ExecuteFproScriptCommand = core.defineClass({
        type: 'ExecuteFproScript',
        _init: function (data) {
            this.data = data;
            fpro.setServiceHandler({ progress: data.progress, fileUpload: data.fileUpload });
        },
        execute: function () {
            return fpro.execute(this.data.script);
        }
    });

    var FproSuggestionCommand = core.defineClass({
        type: 'FproSuggestion',
        _init: function (data) {
            this.data = data;
            fpro.setServiceHandler({ progress: data.progress, fileUpload: data.fileUpload });
        },
        execute: function () {
            return fpro.suggest(this.data.line);
        }
    });

    worker.initializeWorker([AddCommand, ExecuteFproScriptCommand, FproSuggestionCommand]);

});



