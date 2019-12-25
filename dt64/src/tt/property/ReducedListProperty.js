define(['../../core/core', '../../core/event', './Property', './CalculatedProperty'], function (core, event, Property, CalculatedProperty) {

    return core.defineDerivedClass(Property, {
        init: function (params) {
            Property.prototype.init.apply(this, [params]);
            this.list = params.list;
            this.reducer = params.reducer;
            this.startValue = params.startValue;
            this.callback = params.callback;
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
            event.removeEventHandler(this.list, 'splice', this, this.spliceHandler);
            event.removeEventHandler(this.list, 'push', this, this.pushHandler);
            this.calculatedProperty.stop();
            this.active = false;
        },
        calculate: function () {
            event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
            event.addEventHandler(this.list, 'push', this, this.pushHandler);
            this._calculate();
        },
        _calculate: function () {
            if (this.calculatedProperty) {
                this.calculatedProperty.stop();
            }
            this.calculatedProperty = new CalculatedProperty({
                start: true,
                calc: function () {
                    var reducedValue = this.startValue;
                    for (var i = 0; i < this.list.length; ++i) {
                        var element = this.list[i];
                        reducedValue = this.reducer(reducedValue, element);
                    }
                    return reducedValue;
                }.bind(this),
                callback: function (reducedValue) {
                    this.callback(reducedValue);
                }.bind(this)
            });
        },
        spliceHandler: function (signal, spliceArgs) {
            this._calculate();
        },
        pushHandler: function (signal, pushArgs) {
            this._calculate();
        }
    });

});

