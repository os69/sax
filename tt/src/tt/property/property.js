import { core } from "../../core/core";
import { util } from "../util";

export var Property = core.defineClass({
    init: function (params) {
        this.obj = params.obj;
        this.propertyName = params.propertyName;
        this.mode = params.mode;
        this.usageCounter = 0;
        this.active = false;
    },
    set: function (value) {
        util._setProperty(this.obj, this.propertyName, value, this.mode);
    },
    get: function () {
        return util._getProperty(this.obj, this.propertyName, this.mode);
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

