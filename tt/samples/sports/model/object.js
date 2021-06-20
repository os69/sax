import { tt } from '../../../src/tt/tt';

export var Object = tt.core.defineClass({

    init: function (params) {
        this.initProps(params);
        this.initTt();
    },

    initProps: function () {
        this.name = params.name;
        this.parent = params.parent;
        this.deleted = false;
        this.usageCounter = 0;
    },

    initTt: function () {
        tt.initProperty(this, 'name');
        tt.initProperty(this, 'parent');
        tt.initProperty(this, 'deleted');
        tt.initProperty(this, 'usageCounter');
    },

    postDeSerialize: function () {
        this.initTt();
    },

    incUsageCounter: function () {
        this.setUsageCounter(this.getUsageCounter() + 1);
    },

    decUsageCounter: function () {
        this.setUsageCounter(this.getUsageCounter() - 1);
    },

    delete: function () {
        if (this.isRoot() || this.getParent().isRoot() || this.getUsageCounter() > 0) {
            return false;
        }
        this.setDeleted(true);
        return true;
    },

    isRoot: function () {
        return false;
    }

});
