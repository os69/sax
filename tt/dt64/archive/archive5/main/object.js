
define(['../core/core', './property'], function (core, property) {


    var module = {};

    module.initObject = function (obj) {
        for (var propertyName in obj) {
            var propertyValue = obj[propertyName];
            property.initProperty(obj, propertyName);
        }
    }

    module.createObject = function (definition) {
        var obj = {};
        for (propertyName in definition) {
            var propertyValue = definition[propertyName];
            switch (core.getType(propertyValue)) {
                case 'function':
                    property.createProperty(obj, propertyName, propertyValue);
                    break;
                default:
                    obj[propertyName] = propertyValue;
            }

        }
        return obj;
    }

    return module;

});