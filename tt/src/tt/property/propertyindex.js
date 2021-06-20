core, event, util, PropertyManager, initList

import { core } from '../../core/core';
import { event } from '../../core/event';
import { util } from '../util';
import { PropertyManager } from './propertymanager';
import { initList } from '../list/initlist';

var module = {};
export var propertyindex = module;

module.initProperty = function (obj, propertyName, mode) {
    module._initObject(obj);
    return event.getEventData(obj).propertyManager.initProperty(propertyName, mode);
};

module.createCalculatedProperty = function (obj, propertyName, calc, mode) {
    module._initObject(obj);
    return event.getEventData(obj).propertyManager.createCalculatedProperty({ propertyName: propertyName, calc: calc, mode: mode });
};

module.createReducedListProperty = function (obj, propertyName, list, reducer, startValue, mode) {
    module._initObject(obj);
    initList(list);
    return event.getEventData(obj).propertyManager.createCalculatedProperty({ propertyName: propertyName, list: list, reducer: reducer, startValue: startValue, type: 'ReducedList', mode: mode });
};

module._initObject = function (obj) {
    var eventData = event.getEventData(obj);
    if (eventData.propertyManager) {
        return;
    }
    eventData.propertyManager = new PropertyManager({ obj: obj });
};

var PropertyObserver = core.defineClass({
    init: function (params) {
        event.addEventHandler(params.obj, util.methodName('set', params.propertyName), this, this.changed);
    },
    changed: function () {
        // console.log(arguments[0], ':', arguments[1]);
    },
    delete: function () {
        event.delete(this);
    }
});

module.createPropertyObserver = function (obj, propertyName) {
    return new PropertyObserver({ obj: obj, propertyName: propertyName });
}



