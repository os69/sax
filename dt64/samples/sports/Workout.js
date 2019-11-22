define(['../../src/index', './WorkoutItem'], function (tt, WorkoutItem) {

    return tt.core.defineClass({

        init: function (params) {
            this.name = params.name;
            this.parent = params.parent;
            this.items = params.items || [];
        },

        getName: function () {
            return this.name;
        },

        createItem: function (params) {
            params.parent = this;
            var item = new WorkoutItem(params);
            this.items.push(item);
            return item;
        },

        delete: function () {
            tt.core.removeObject(this.parent.workouts, this);
        }

    });

});