define(['../../core/core', '../../core/event', '../util'], function (core, event, util) {

    return core.defineClass({
        init: function (params) {
            this.usageCounter = 0;
            this.active = false;  
        },
        isActive: function () {
            return this.active;
        },
        incUsage: function () {
            this.usageCounter++;
            if (this.usageCounter > 0 && !this.active) {
                this.start();
            }
        },
        decUsage: function () {
            if (this.usageCounter === 0) {
                throw 'program error';
            }
            this.usageCounter--;
            if (this.usageCounter === 0 & this.active) {
                this.stop();
            }
        },
        start: function () {
            this.active = true;
        },
        stop: function () {
            this.active = false;
        }
    });

});