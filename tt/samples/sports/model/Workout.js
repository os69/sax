define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        delete: function () {
            if (!Object.prototype.delete.apply(this, arguments)) {
                return false;
            }
            tt.core.removeObject(this.parent.workouts, this);
            return true;
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