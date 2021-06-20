define(['../../core/core', '../../core/event', '../property/index'], function (core, event, indexProperty) {

    var module = {

        createDict: function () {
            return {
                __dict: true
            };
        },

        createCalculatedObject: function (params) {
            var calculatedObject = {};
            for (var propertyName in params) {
                var propertyValue = params[propertyName];
                if (core.isFunction(propertyValue)) {
                    indexProperty.createCalculatedProperty(calculatedObject, propertyName, propertyValue);
                } else {
                    calculatedObject[propertyName] = propertyValue;
                }
            }
            return calculatedObject;
        }

    };

    return module;

});