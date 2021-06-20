import { core } from '../../core/core';
import { propertyindex } from '../property/propertyindex';

var module = {

    createCalculatedObject: function (params) {
        var calculatedObject = {};
        for (var propertyName in params) {
            var propertyValue = params[propertyName];
            if (core.isFunction(propertyValue)) {
                propertyindex.createCalculatedProperty(calculatedObject, propertyName, propertyValue);
            } else {
                calculatedObject[propertyName] = propertyValue;
            }
        }
        return calculatedObject;
    },

    initObject: function (obj, propertyMetaData) {
        for (var propertyName in propertyMetaData) {
            var property = propertyMetaData[propertyName];
            switch (property.type) {
                case 'Property':
                    propertyindex.initProperty(obj, propertyName);
                    break;
                case 'CalculatedProperty':
                    propertyindex.createCalculatedProperty(obj, propertyName, property.calculation);
                    break;
                case 'ReducedListProperty':
                    propertyindex.createReducedListProperty(obj, propertyName, property.list, property.reducer, property.startValue);
                    break;
            }
        }
        return obj;
    }

};

export var objectindex = module;

