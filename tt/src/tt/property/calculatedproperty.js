Property
import { core } from "../../core/core";
import { PropertyCollector } from "./propertycollector";
import { event } from "../../core/event";
import { util } from "../util";
import { Property } from "./property";

export var CalculatedProperty = core.defineDerivedClass(Property, {
    init: function (params) {
        Property.prototype.init.apply(this, [params]);
        this.calc = params.calc;
        this.callback = params.callback;
        this.dependencies = [];
        if (params.start) {
            this.start();
        }
    },
    start: function () {
        if (this.active) {
            return;
        }
        this.active = true;
        this.calculate();
    },
    stop: function () {
        if (!this.active) {
            return;
        }
        this.removeDependencyChangedEventHandlers();
        this.active = false;
    },
    calculate: function () {
        var propertyCollector = PropertyCollector.create({
            addCallback: function (dependency) {
                event.addEventHandler(dependency.obj, util.methodName('set', dependency.propertyName), this, this.calculate);
            }.bind(this)
        });
        var value = this.calc();
        var dependencies = propertyCollector.stop();
        this.updateDependencyChangedEventHandlers(dependencies);
        if (this.callback) {
            this.callback(value);
        } else {
            this.set(value);
        }
    },
    updateDependencyChangedEventHandlers: function (dependencies) {
        // helper
        var hasProperty = function (properties, property) {
            for (var i = 0; i < properties.length; ++i) {
                var checkProperty = properties[i];
                if (checkProperty.obj === property.obj && checkProperty.propertyName === property.propertyName) {
                    return true;
                }
            }
            return false;
        }
        // calculate new dependencies
        var i, dependency;
        for (i = 0; i < dependencies.length; ++i) {
            dependency = dependencies[i];
            if (!hasProperty(this.dependencies, dependency)) {
                this.dependencies.push(dependency);
                //event.addEventHandler(dependency.obj, util.methodName('set', dependency.propertyName), this, this.calculate); --> add callback
            }
        }
        // calculate deleted dependencies
        for (i = 0; i < this.dependencies.length; ++i) {
            dependency = this.dependencies[i];
            if (!hasProperty(dependencies, dependency)) {
                event.removeEventHandler(dependency.obj, util.methodName('set', dependency.propertyName), this, this.calculate);
                this.dependencies.splice(i, 1);
                --i;
            }
        }
    },
    removeDependencyChangedEventHandlers: function () {
        for (var i = 0; i < this.dependencies.length; ++i) {
            var dependency = this.dependencies[i];
            event.removeEventHandler(dependency.obj, util.methodName('set', dependency.propertyName), this, this.calculate);
        }
        this.dependencies = [];
    }
});

