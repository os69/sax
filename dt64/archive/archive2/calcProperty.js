define(['./util/decorate', './event', './property'], function (decorate, event, propertyLib) {


    var module = {};

    var CalcProperty = function () {
        this.init.apply(this, arguments);
    };

    CalcProperty.prototype = {
        init: function (params) {
            this.calcFunction = params.calcFunction;
            this.dependencies = [];
            this.calculate();
        },
        collector: function (signal, property) {
            this.dependencies.push(property);
        },
        calculate: function () {
            this.removeDependencyChangedEventHandlers();
            event.addGlobalEventHandler('get-property', this, this.collector);
            this.value = this.calcFunction();
            event.removeGlobalEventHandler('get-property', this, this.collector);
            event.raiseEvent(this, 'changed', this.value);
            this.addDependencyChangedEventHandlers();
        },
        getValue: function () {
            return this.value;
        },
        addDependencyChangedEventHandlers: function () {
            for (var i = 0; i < this.dependencies.length; ++i) {
                var dependency = this.dependencies[i];
                event.addEventHandler(dependency.obj, propertyLib.methodName('set', dependency.propertyName), this, this.calculate);
            }
        },
        removeDependencyChangedEventHandlers: function () {
            for (var i = 0; i < this.dependencies.length; ++i) {
                var dependency = this.dependencies[i];
                event.removeEventHandler(dependency.obj, propertyLib.methodName('set', dependency.propertyName), this, this.calculate);
            }
            this.dependencies = [];
        },
        addChangedHandler: function (receiver, handler) {
            event.addEventHandler(this, 'changed', receiver, handler);
        },
        removeChangedHandler: function (receiver, handler) {
            event.addEventHandler(this, 'changed', receiver, handler);
        }

    };

    module.define = function (calcFunction) {
        return new CalcProperty({
            calcFunction: calcFunction
        });
    }

    module.defineProperty = function (obj, propertyName, calcFunction) {
        var calcProperty = module.define(calcFunction);
        propertyLib.set(obj, propertyName, calcProperty.getValue());
        calcProperty.addChangedHandler({}, function (signal, value) {
            propertyLib.set(obj, propertyName, value)
        });
        return calcProperty;
    }

    return module;

});