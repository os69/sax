define(['../../../src/index', './Object'], function (tt, Object) {

    var WorkoutItem = tt.core.defineDerivedClass(Object, {

        init: function (params) {
            params.name = params.name || '';
            Object.prototype.init.apply(this, arguments);
            this.count = params.count || 1;
            this.duration = params.duration || 0;
            this.exercise = params.exercise;
            this.exercise.incItemUsageCounter();
            this.checked = false;
            this.postDeSerialize();
        },

        postDeSerialize: function () {
            tt.initProperty(this, 'checked');
            tt.initProperty(this, 'count');
            tt.initProperty(this, 'duration');
            tt.createCalculatedProperty(this, 'totalDuration', function () {
                return this.getDuration() * this.getCount();
            }.bind(this));
            tt.createCalculatedProperty(this, 'elapsed', function () {
                return this.getChecked() ? this.getDuration() * this.getCount() : 0;
            }.bind(this));
        },

        delete: function () {
            if (!Object.prototype.delete.apply(this, arguments)) {
                return false;
            }
            this.exercise.decItemUsageCounter();
            tt.core.removeObject(this.parent.items, this);
            return true;
        },

        deepClone: function () {
            return new WorkoutItem({
                name: this.name,
                count: this.count,
                duration: this.duration,
                exercise: this.exercise
            });
        },

        insertBefore: function (item) {
            if (item === this) {
                return;
            }
            var oldParent = item.parent;
            tt.core.removeObject(oldParent.items, item);
            item.parent = this.parent;
            var index = this.parent.items.indexOf(this);
            this.parent.items.splice(index, 0, item);
        },

        insertCloneBefore: function (item) {
            var clonedWorkoutItem = item.deepClone();
            clonedWorkoutItem.parent = this.parent;
            var index = this.parent.items.indexOf(this);
            this.parent.items.splice(index, 0, clonedWorkoutItem);
        },

        createItemBefore: function (params) {
            params.parent = this.parent;
            var item = new WorkoutItem(params);
            var index = this.parent.items.indexOf(this);
            this.parent.items.splice(index, 0, item);
        }

    });

    return WorkoutItem;

});