define(['../core/core', '../core/decorate', '../core/eventing/event', './util/PropertyCollector','./util/AutoCalc','./util/util'], function (core, decorate, event, PropertyCollector, AutoCalc, util) {

    var module = {};

    module.initProperty = function (obj, propertyName) {

        // generate getter
        var getterName = util.methodName('get', propertyName);
        if (!obj[getterName]) {
            obj[getterName] = function () {
                return this[propertyName];
            }
        }

        // decorate getter
        if (!decorate.isDecorated(obj, getterName, 'raise-get-event')) {
            decorate.decorate(obj, getterName, 'raise-get-event', function () {
                PropertyCollector.notify({ obj: obj, propertyName: propertyName });
            });
        }

        // generate setter
        var setterName = util.methodName('set', propertyName);
        if (!obj[setterName]) {
            obj[setterName] = function (value) {
                this[propertyName] = value;
            }
        }

        // decorate setter
        if (!decorate.isDecorated(obj, setterName, 'raise-set-event')) {
            decorate.decorate(obj, setterName, 'raise-set-event', null, function (value) {
                event.raiseEvent(obj, setterName, value);;
            });
        }

    };

    module.getProperty = function (obj, propertyName) {
        if (!obj.__dict) {
            return obj[util.methodName('get', propertyName)].apply(obj, []);
        } else {
            PropertyCollector.notify({ obj: obj, propertyName: propertyName });
            return obj[propertyName];
        }
    };

    module.setProperty = function (obj, propertyName, value) {
        if (!obj.__dict) {
            return obj[util.methodName('set', propertyName)].apply(obj, [value]);
        } else {
            obj[propertyName] = value;
            event.raiseEvent(obj, util.methodName('set', propertyName), value);
        }
    };

    module.createProperty = function (obj, propertyName, calc) {
        module.initProperty(obj, propertyName);
        return new AutoCalc({
            start: true,
            calc: calc,
            callback: function (value) {
                module.setProperty(obj, propertyName, value);
            }
        });
    };

    return module;

});