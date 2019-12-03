define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        init: function () {
            Object.prototype.init.apply(this, arguments);
            this.usageCounter = 0;
        },

        incUsageCounter: function () {
            this.usageCounter++;
        },

        decUsageCounter: function () {
            this.usageCounter--;
        },

        delete: function () {
            if (this.usageCounter > 0) {
                return;
            }
            Object.prototype.delete.apply(this, arguments);
            tt.core.removeObject(this.parent.movements, this);
        },

        insertBefore: function (movement) {
            var oldParent = movement.parent;
            tt.core.removeObject(oldParent.movements, movement);
            movement.parent = this.parent;
            var index = this.parent.movements.indexOf(this);
            this.parent.movemenets.splice(index, 0, movement);
        }

    });

});