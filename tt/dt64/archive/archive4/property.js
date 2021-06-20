define(['../core/core', '../core/decorate', '../eventing/event', './propertyCollector'], function (core, decorate, event, propertyCollector) {

    var module = {};

    var methodName = module.methodName = function (type, property) {
        return type + property[0].toUpperCase() + property.slice(1);
    };

    module.initProperty = function (obj, propertyName) {

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
                propertyCollector.notify({ obj: obj, propertyName: propertyName });
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
                event.raiseEvent(obj, setterName, value);;
            });
        }

    };

    module.initObject = function (obj) {
        for (var propertyName in obj) {
            var propertyValue = obj[propertyName];
            module.initProperty(obj, propertyName);
            if (core.isObject(propertyValue)) {
                module.initObject(propertyValue);
            }
        }
    }

    module.initList = function (list) {
        if (!decorate.isDecorated('raise-push-event')) {
            decorate.decorate(list, 'push', 'raise-push-event', null, function () {
                event.raiseEvent(list, 'push', core.argumentsToList(arguments));
            });
            decorate.decorate(list, 'splice', 'raise-splice-event', null, function () {
                event.raiseEvent(list, 'splice', core.argumentsToList(arguments));
            });
        }
    }

    module.dictGet = function (obj, propertyName) {
        propertyCollector.notify({ obj: obj, propertyName: propertyName });
        return obj[propertyName];
    };

    module.dictSet = function (obj, propertyName, value) {
        obj[propertyName] = value;
        event.raiseEvent(obj, methodName('set', propertyName), value);
    };

    module._get = function (obj, propertyName) {
        return obj[methodName('get', propertyName)].apply(obj, []);
    };

    module._set = function (obj, propertyName, value) {
        return obj[methodName('set', propertyName)].apply(obj, [value]);
    };

    return module;

});