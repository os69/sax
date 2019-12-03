define(['../../../src/index', './Object'], function (tt, Object) {

    var WorkoutItem = tt.core.defineDerivedClass(Object, {

        init: function (params) {
            params.name = params.name || params.exercise.name;
            Object.prototype.init.apply(this, arguments);
            this.count = params.count || '1';
            this.exercise = params.exercise;            
            this.exercise.incItemUsageCounter();
        },

        delete: function () {
            this.exercise.decItemUsageCounter();
            Object.prototype.delete.apply(this, arguments);
            tt.core.removeObject(this.parent.items, this);
        },

        insertBefore: function (item) {
            var oldParent = item.parent;
            tt.core.removeObject(oldParent.items, item);
            item.parent = this.parent;
            var index = this.parent.items.indexOf(this);
            this.parent.items.splice(index, 0, item);
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