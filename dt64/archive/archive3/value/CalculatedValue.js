define(['../core/eventing/event', '../core/list'], function (event, list) {

    var CalculatedValue = function () {
        this.init.apply(this, arguments);
    }

    CalculatedValue.prototype = {

        init: function (calcFunction) {
            this.value = null;
            this.calcFunction = calcFunction;
            this.dependendValues = [];
            this.watchActive = true;
            this.calculate();
        },

        calculate: function () {
            this.removeDependendChangedEventHandlers();
            event.addGlobalEventHandler('value-get', this, this.collector);
            this.value = this.calcFunction(this.createController());
            event.removeGlobalEventHandler('value-get', this, this.collector);
            this.addDependendChangedEventHandlers();
            event.raiseEvent(this, 'value-set', this);
        },

        createController: function () {
            return {
                watch: function (watchActive) {
                    this.watchActive = watchActive;
                }.bind(this)
            }
        },

        addDependendChangedEventHandlers: function () {
            for (var i = 0; i < this.dependendValues.length; ++i) {
                var dependendValue = this.dependendValues[i];
                event.addEventHandler(dependendValue, 'value-set', this, this.calculate);
            }
        },

        removeDependendChangedEventHandlers: function () {
            for (var i = 0; i < this.dependendValues.length; ++i) {
                var dependendValue = this.dependendValues[i];
                event.removeEventHandler(dependendValue, 'value-set', this, this.calculate);
            }
            this.dependendValues = [];
        },

        collector: function (signal, value) {
            if (!this.watchActive) {
                return;
            }
            if (!list.hasObject(this.dependendValues, value)) {
                this.dependendValues.push(value);
            }
        },

        get: function () {
            event.raiseGlobalEvent('value-get', { value: this });
            return this.value;
        }

    }

    return CalculatedValue;

});