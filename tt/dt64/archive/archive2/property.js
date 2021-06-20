define(['./util/decorate', './event'], function (decorate, event) {


    var module = {};

    var methodName = module.methodName = function (type, property) {
        return type + property[0].toUpperCase() + property.slice(1);
    };

    module.init = function (obj, propertyName) {

        // generate getter
        var getterName = methodName('get', propertyName);
        if (!obj[getterName]) {
            obj[getterName] = function () {
                return this[propertyName];
            }
        }

        // decorate getter
        if (!decorate.isDecorated(obj, getterName, 'raise-get-event')) {
            decorate.decorate(obj, getterName, 'raise-get-event', function () {
                event.raiseGlobalEvent('get-property', {
                    obj: obj,
                    propertyName: propertyName
                });
            });
        }

        // generate setter
        var setterName = methodName('set', propertyName);
        if (!obj[setterName]) {
            obj[setterName] = function (value) {
                this[propertyName] = value;
            }
        }

        // decorate setter
        if (!decorate.isDecorated(obj, setterName, 'raise-set-event')) {
            decorate.decorate(obj, setterName, 'raise-set-event', null, function (value) {
                event.raiseEvent(obj, setterName, value);
            });
        }

    };

    module.addGlobalAccessHandler = function (receiver, handler) {
        event.addGlobalEventHandler('get-property', receiver, handler);
    }

    module.removeGlobalAccessHandler = function (receiver, handler) {
        event.removeGlobalEventHandler('get-property', receiver, handler);
    }

    module.addChangedHandler = function (obj, propertyName, receiver, handler) {
        module.init(obj, propertyName);
        event.addEventHandler(obj, methodName('set', propertyName), receiver, handler);
    };

    module.removeChangedHandler = function (obj, propertyName, receiver, handler) {
        module.init(obj, propertyName);
        event.removeEventHandler(obj, methodName('set', propertyName), receiver, handler);
    };

    module._get = function (obj, propertyName) {
        return obj[methodName('get', propertyName)].apply(obj, []);
    };

    module._set = function (obj, propertyName, value) {
        return obj[methodName('set', propertyName)].apply(obj, [value]);
    };

    return module;

});