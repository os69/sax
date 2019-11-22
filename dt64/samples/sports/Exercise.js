define(['../../src/index'], function (tt) {

    return tt.core.defineClass({

        init: function (params) {
            this.name = params.name;
            this.parent = params.parent;
        },

        getName: function () {
            return this.name;
        },

        delete: function () {
            tt.core.removeObject(this.parent.exercises, this);
        }

    });

});