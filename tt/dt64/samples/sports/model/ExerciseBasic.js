define(['../../../src/index', './Exercise'], function (tt, Exercise) {

    return tt.core.defineDerivedClass(Exercise, {

        init: function (params) {
            Exercise.prototype.init.apply(this, arguments);
            this.movements = params.movements || [];
            this.helpUrl = params.helpUrl;
        },

        addMovement: function (movement) {
            if (tt.core.hasObject(this.movements, movement)) {
                return;
            }
            this.movements.push(movement);
            movement.incUsageCounter();
        },

        removeMovement: function (movement) {
            if (!tt.core.hasObject(this.movements, movement)) {
                return;
            }
            tt.core.removeObject(this.movements, movement);
            movement.decUsageCounter();
        }

    });

});