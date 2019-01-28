define(['../core/core'], function (core) {

    return core.defineClass({
        init: function (options) {
            this.title = options.title;
            this._execute = options.execute;
        },
        execute: function () {
            console.log('execute ', this.title);
            this._execute();
        }
    });


});