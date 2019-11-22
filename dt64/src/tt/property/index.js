define(['../../core/core', '../../core/event', '../util', './PropertyManager'], function (core, event, util, PropertyManager) {

    var module = {};

    module.initProperty = function (obj, propertyName) {
        module._initObject(obj);
        event.getEventData(obj).propertyManager.initProperty(propertyName);
    };

    module.createCalculatedProperty = function (obj, propertyName, calc) {
        module._initObject(obj);
        event.getEventData(obj).propertyManager.createCalculatedProperty(propertyName, calc);
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
            console.log(arguments[0], ':', arguments[1]);
        },
        delete: function () {
            event.delete(this);
        }
    });

    module.getProperty = util.getProperty;
    module.setProperty = util.setProperty;

    module.createPropertyObserver = function (obj, propertyName) {
        return new PropertyObserver({ obj: obj, propertyName: propertyName });
    }

    return module;

});