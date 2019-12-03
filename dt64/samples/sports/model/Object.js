define(['../../../src/index'], function (tt) {

    return tt.core.defineClass({

        init: function (params) {
            this.name = params.name;
            this.parent = params.parent;
            this.deleted = false;
        },

        getName: function () {
            return this.name;
        },

        getDeleted: function (deleted) {
            return this.deleted;
        },

        setDeleted: function (deleted) {
            this.deleted = deleted;
        },

        delete: function () {
            this.setDeleted(true);
        }

    });

});