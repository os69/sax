define(['../../../src/index', './Workout', './WorkoutItem'], function (tt, Workout, WorkoutItem) {

    return tt.core.defineDerivedClass(Workout, {

        init: function (params) {
            Workout.prototype.init.apply(this, arguments);
            this.items = params.items || [];
            this.postDeSerialize();
        },

        postDeSerialize: function () {
            tt.createReducedListProperty(this, 'totalDuration', this.items, function (accu, item) {
                return accu + item.getTotalDuration();
            }.bind(this), 0);
        },

        createItem: function (params) {
            params.parent = this;
            var item = new WorkoutItem(params);
            this.items.push(item);
            return item;
        }

    });

}); 