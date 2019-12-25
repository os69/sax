define(['../../core/core', '../../core/event', '../util', './Property', './CalculatedProperty', './ReducedListProperty'], function (core, event, util, Property, CalculatedProperty, ReducedListProperty) {

    return core.defineClass({

        init: function (params) {
            this.obj = params.obj;
            this.properties = {};
            event.addModificationHandler(this.obj, this.eventHandlerModificationHandler.bind(this));
        },

        initProperty: function (propertyName) {
            if (this.properties[propertyName]) {
                return;
            }
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

        createCalculatedProperty: function (params) {
            if (!this.obj.__dict) {
                util.decorateProperty(this.obj, params.propertyName);
            }
            var property;
            switch (params.type) {
                case 'ReducedList':
                        property = new ReducedListProperty(core.cloneExtend(params, {
                            callback: function (value) {
                                util.setProperty(this.obj, params.propertyName, value);
                            }.bind(this)
                        }));    
                    break;
                default:
                    property = new CalculatedProperty(core.cloneExtend(params, {
                        callback: function (value) {
                            util.setProperty(this.obj, params.propertyName, value);
                        }.bind(this)
                    }));
            }
            this.properties[params.propertyName] = property;
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
            var methodType = util.methodType(signal);
            if (methodType !== 'set') {
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