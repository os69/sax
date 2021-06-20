define(['../../../src/index', './Movement'], function (tt, Movement) {

    return tt.core.defineDerivedClass(Movement, {

        init: function () {
            Movement.prototype.init.apply(this, arguments);
            this.muscles = [];
        },

        addMuscle: function (muscle) {
            if (tt.core.hasObject(this.muscles, muscle)) {
                return;
            }
            this.muscles.push(muscle);
            muscle.incUsageCounter();
        },

        removeMuscle: function (muscle) {
            if (!tt.core.hasObject(this.muscles, muscle)) {
                return;
            }
            tt.core.removeObject(this.muscles, muscle);
            muscle.decUsageCounter();
        }

    });

});