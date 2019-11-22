define(['../../src/index'], function (tt) {

    return tt.core.defineClass({

        init: function (params) {
            this.name = params.name;
            this.parent = params.parent;
            this.count = params.count || '1';
            this.exercise = params.exercise;
        },

        getName: function () {
            return this.name;
        }

    });

});