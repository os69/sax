define([],function(){

    var module = {};

    var propertyCollectors = [];

    var PropertyCollector = function () {
        this.init.apply(this, arguments);
    };

    PropertyCollector.prototype = {
        init: function () {
            this.properties = [];
        },
        addProperty: function (property) {
            for (var i = 0; i < this.properties.length; ++i) {
                var checkProperty = this.properties[i];
                if (checkProperty.obj === property.obj && checkProperty.propertyName === property.propertyName) {
                    return;
                }
            }
            this.properties.push(property);
        },
        getProperties: function () {
            return this.properties;
        },
        stop: function () {
            if (propertyCollectors.length === 0) {
                throw 'program error';
            }
            if (propertyCollectors[propertyCollectors.length - 1] !== this) {
                throw 'program error';
            }
            propertyCollectors.pop();
            return this.getProperties();
        }
    };

    PropertyCollector.notify = function (property) {
        if (propertyCollectors.length === 0) {
            return;
        }
        propertyCollector = propertyCollectors[propertyCollectors.length - 1];
        propertyCollector.addProperty(property);
    };

    PropertyCollector.create = function () {
        var propertyCollector = new PropertyCollector();
        propertyCollectors.push(propertyCollector);
        return propertyCollector;
    };

    return PropertyCollector;

});