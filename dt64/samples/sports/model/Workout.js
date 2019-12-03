define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        delete: function () {
            Object.prototype.delete.apply(this, arguments);
            tt.core.removeObject(this.parent.workouts, this);
        },

        insertBefore: function (workout) {
            var oldParent = workout.parent;
            tt.core.removeObject(oldParent.workouts, workout);
            workout.parent = this.parent;
            var index = this.parent.workouts.indexOf(this);
            this.parent.workouts.splice(index, 0, workout);
        }

    });

});