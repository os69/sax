define(['../../core/core', '../../core/event', '../util', './Property', './CalculatedProperty'], function (core, event, util, Property, CalculatedProperty) {

    return core.defineClass({

        init: function (params) {
            this.obj = params.obj;
            this.properties = {};
            event.addModificationHandler(this.obj, this.eventHandlerModificationHandler.bind(this));
        },

        initProperty: function (propertyName) {
            if (!this.obj.__dict) {
                util.decorateProperty(this.obj, propertyName);
            }
            var property = new Property({
                obj: this.obj,
                propertyName: propertyName,
            });
            this.properties[propertyName] = property;
            return property;
        },

        createCalculatedProperty: function (propertyName, calc) {
            if (!this.obj.__dict) {
                util.decorateProperty(this.obj, propertyName);
            }
            var property = new CalculatedProperty({
                obj: this.obj,
                propertyName: propertyName,
                calc: calc,
                callback: function (value) {
                    util.setProperty(this.obj, propertyName, value);
                }.bind(this)
            });
            this.properties[propertyName] = property;
            return property;
        },

        eventHandlerModificationHandler: function (action, sender, signal, receiver, handler) {
            if (sender !== this.obj) {
                return;
            }
            var propertyName = util.propertyName(signal);
            if (!propertyName) {
                return;
            }
            var property = this.properties[propertyName];
            if (!property) {
                return;
            }
            switch (action) {
                case 'add':
                    property.incUsage();
                    break;
                case 'remove':
                    property.decUsage();
                    break;
            }
        }

    });

});