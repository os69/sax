define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        delete: function () {
            if (!Object.prototype.delete.apply(this, arguments)) {
                return false;
            }
            tt.core.removeObject(this.parent.movements, this);
            return true;
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