define(['../core/eventing/event'], function (event) {

    var Value = function () {
        this.init.apply(this, arguments);
    }

    Value.prototype = {

        init: function (value) {
            this.value = value;
        },

        set: function (value) {
            this.value = value;
            event.raiseEvent(this, 'value-set', this);
        },

        get: function () {               
            event.raiseGlobalEvent('value-get', this);
            return this.value;
        }

    }

    return Value;

});