define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        init: function (params) {
            Object.prototype.init.apply(this, arguments);
            this.exercise = params.exercise;
            this.exercise.parent = this;
            this.workout = params.workout;
            this.workout.parent = this;
            this.movement = params.movement;
            this.movement.parent = this;
            this.muscle = params.muscle;
            this.muscle.parent = this;
        },

        isRoot: function () {
            return true;
        }

    });

});