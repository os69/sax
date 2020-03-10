define(['../../../src/index'], function (tt) {

    return tt.core.defineClass({

        init: function (params) {
            this.name = params.name;
            this.parent = params.parent;
            this.deleted = false;
            this.usageCounter = 0;
        },

        incUsageCounter: function () {
            this.usageCounter++;
        },

        decUsageCounter: function () {
            this.usageCounter--;
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
            if (this.isRoot() || this.parent.isRoot() || this.usageCounter > 0) {
                return false;
            }
            this.setDeleted(true);
            return true;
        },

        isRoot: function () {
            return false;
        }


    });

});