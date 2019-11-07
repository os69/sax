define(['./PropertyCollector', '../../core/eventing/event', './util'], function (PropertyCollector, event, util) {

    var AutoCalc = function () {
        this.init.apply(this, arguments);
    };

    AutoCalc.prototype = {
        init: function (params) {
            this.callback = params.callback;
            this.calc = params.calc;
            this.dependencies = [];
            if (params.start) {
                this.start();
            }
        },
        start: function () {
            this.calculate();
        },
        stop: function () {
            this.removeDependencyChangedEventHandlers();
        },
        calculate: function () {
            this.removeDependencyChangedEventHandlers();
            var propertyCollector = PropertyCollector.create();
            var value = this.calc();
            this.dependencies = propertyCollector.stop();
            this.addDependencyChangedEventHandlers();
            this.callback(value);
        },
        addDependencyChangedEventHandlers: function () {
            for (var i = 0; i < this.dependencies.length; ++i) {
                var dependency = this.dependencies[i];
                event.addEventHandler(dependency.obj, util.methodName('set', dependency.propertyName), this, this.calculate);
            }
        },
        removeDependencyChangedEventHandlers: function () {
            for (var i = 0; i < this.dependencies.length; ++i) {
                var dependency = this.dependencies[i];
                event.removeEventHandler(dependency.obj, util.methodName('set', dependency.propertyName), this, this.calculate);
            }
            this.dependencies = [];
        }
    };

    return AutoCalc;
});

