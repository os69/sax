define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        init: function () {
            Object.prototype.init.apply(this, arguments);
            this.itemUsageCounter = 0;
        },

        incItemUsageCounter: function () {
            this.itemUsageCounter++;
        },

        decItemUsageCounter: function () {
            this.itemUsageCounter--;
        },

        delete: function () {
            if (this.itemUsageCounter > 0) {
                return;
            }
            Object.prototype.delete.apply(this, arguments);
            tt.core.removeObject(this.parent.exercises, this);
        },

        insertBefore: function (exercise) {
            var oldParent = exercise.parent;
            tt.core.removeObject(oldParent.exercises, exercise);
            exercise.parent = this.parent;
            var index = this.parent.exercises.indexOf(this);
            this.parent.exercises.splice(index, 0, exercise);
        }

    });

});