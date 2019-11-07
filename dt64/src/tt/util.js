define(['../core/event', '../core/decorate', './property/PropertyCollector'], function (event, decorate, PropertyCollector) {

    var module = {};

    module.methodName = function (type, property) {
        return type + property[0].toUpperCase() + property.slice(1);
    };

    module.propertyName = function (methodName) {
        var prefix = methodName.slice(0, 3);
        if ((prefix !== 'set' && prefix !== 'get') || methodName.length === 3) {
            return null;
        }
        return methodName[3].toLowerCase() + methodName.slice(4);
    };

    module.decorateProperty = function (obj, propertyName) {

        var eventData = event._getEventData(obj);

        // generate getter
        var getterName = module.methodName('get', propertyName);
        if (!obj[getterName]) {
            obj[getterName] = function () {
                return this[propertyName];
            }
        }

        // decorate getter
        if (!decorate.isDecorated(obj, getterName, 'raise-get-event')) {
            decorate.decorate(obj, getterName, 'raise-get-event', function () {
                PropertyCollector.notify({ obj: obj, propertyName: propertyName });
            }.bind(this));
        }

        // generate setter
        var setterName = module.methodName('set', propertyName);
        if (!obj[setterName]) {
            obj[setterName] = function (value) {
                this[propertyName] = value;
            }
        }

        // decorate setter
        if (!decorate.isDecorated(obj, setterName, 'raise-set-event')) {
            decorate.decorate(obj, setterName, 'raise-set-event', null, function (value) {
                event.raiseEvent(obj, module.methodName('set', propertyName), value);;
            }.bind(this));
        }

    };

    module.getProperty = function (obj, propertyName) {
        if (!obj.__dict) {
            return obj[module.methodName('get', propertyName)].apply(obj, []);
        } else {
            PropertyCollector.notify({ obj: obj, propertyName: propertyName });
            return obj[propertyName];
        }
    };

    module.setProperty = function (obj, propertyName, value) {
        if (!obj.__dict) {
            return obj[module.methodName('set', propertyName)].apply(obj, [value]);
        } else {
            obj[propertyName] = value;
            event.raiseEvent(obj, module.methodName('set', propertyName), value);
        }
    };


    return module;
});

