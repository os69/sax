import { core } from '../../core/core';
import { event } from '../../core/event';
import { Property } from './property';
import { CalculatedProperty } from './calculatedproperty';
import { ReducedListProperty } from './reducedlistproperty';
import { util } from '../util';

export var PropertyManager = core.defineClass({

    init: function (params) {
        this.obj = params.obj;
        this.properties = {};
        event.addModificationHandler(this.obj, this.eventHandlerModificationHandler.bind(this));
    },

    initProperty: function (propertyName, mode) {
        mode = mode || 'property';
        if (this.properties[propertyName]) {
            return;
        }
        switch (mode) {
            case 'settergetter':
                util.decorateProperty(this.obj, propertyName);
                break;
            case 'property':
                util.defineProperty(this.obj, propertyName);
                break;
        }
        var property = new Property({
            obj: this.obj,
            propertyName: propertyName,
            mode: mode
        });
        this.properties[propertyName] = property;
        return property;
    },

    createCalculatedProperty: function (params) {
        var mode = params.mode || 'property';
        switch (mode) {
            case 'settergetter':
                util.decorateProperty(this.obj, params.propertyName);
                break;
            case 'property':
                util.defineProperty(this.obj, params.propertyName);
        }
        var property;
        switch (params.type) {
            case 'ReducedList':
                property = new ReducedListProperty(core.cloneExtend(params, {
                    obj: this.obj,
                    mode: mode
                }));
                break;
            default:
                property = new CalculatedProperty(core.cloneExtend(params, {
                    obj: this.obj,
                    mode: mode
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

