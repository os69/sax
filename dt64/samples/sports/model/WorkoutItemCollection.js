define(['../../../src/index', './Object', './WorkoutItem'], function (tt, Object, WorkoutItem) {

    var WorkoutItemCollection = tt.core.defineDerivedClass(Object, {

        init: function (params) {
            params.name = params.name || '';
            Object.prototype.init.apply(this, arguments);
            this.items = params.items || [];
            this.postDeSerialize();
        },

        postDeSerialize: function () {
            tt.createReducedListProperty(this, 'checked', this.items, function (accu, item) {
                if (!accu || !item.getChecked()) {
                    return false;
                } else {
                    return true;
                }
            }.bind(this), true);
            tt.createReducedListProperty(this, 'totalDuration', this.items, function (accu, item) {
                return accu + item.getTotalDuration();
            }.bind(this), 0);
            tt.createReducedListProperty(this, 'elapsed', this.items, function (accu, item) {
                return accu + item.getElapsed();
            }.bind(this), 0);
        },

        delete: function () {
            if (!Object.prototype.delete.apply(this, arguments)) {
                return false;
            }
            for (var i = 0; i < this.items.length; ++i) {
                var item = this.items[i];
                item.delete();
            }
            tt.core.removeObject(this.parent.items, this);
            return true;
        },

        deepClone: function () {
            var clonedItemCollection = new WorkoutItemCollection({
                name: this.name
            });
            for (var i = 0; i < this.items.length; ++i) {
                var item = this.items[i];
                var clonedItem = item.deepClone();
                clonedItem.parent = clonedItemCollection;
                clonedItemCollection.items.push(clonedItem);
            }
            return clonedItemCollection;
        },

        createItem: function (params) {
            params.parent = this;
            var item = new WorkoutItem(params);
            this.items.push(item);
            return item;
        },

        createItemCollection: function (params) {
            params.parent = this;
            var itemCollection = new WorkoutItemCollection(params);
            this.items.push(itemCollection);
            return itemCollection;
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
        }

    });

    return WorkoutItemCollection;

});