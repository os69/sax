import { event } from '../core/event';
import { decorate } from '../core/decorate';
import { PropertyCollector } from './property/propertycollector';

var module = {};
export var util = module;
var propertyPrefix = 'private_';

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

module.methodType = function (methodName) {
    return methodName.slice(0, 3);
};

module.decorateProperty = function (obj, propertyName) {

    var eventData = event.getEventData(obj);

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

module.defineProperty = function (obj, propertyName) {
    if (typeof obj[propertyName] !== 'undefined') {
        if (typeof obj[propertyPrefix + propertyName] !== 'undefined') {
            throw 'define poperty error: ' + propertyName;
        }
        obj[propertyPrefix + propertyName] = obj[propertyName];
        delete obj[propertyName];
    }
    Object.defineProperty(obj, propertyName, {
        set: function (value) {
            this['private_' + propertyName] = value;
            event.raiseEvent(obj, module.methodName('set', propertyName), value);;
        },
        get: function () {
            PropertyCollector.notify({ obj: obj, propertyName: propertyName });
            return this['private_' + propertyName];
        },
    });
}

module._setProperty = function (obj, propertyName, value, mode) {
    switch (mode) {
        case 'settergetter':
            return obj[module.methodName('set', propertyName)].apply(obj, [value]);
        case 'property':
            obj[propertyName] = value;
            return;
    }
}

module._getProperty = function (obj, propertyName, mode) {
    switch (mode) {
        case 'settergetter':
            return obj[module.methodName('get', propertyName)].apply(obj, []);
        case 'property':
            return obj[propertyName];
    }
}



