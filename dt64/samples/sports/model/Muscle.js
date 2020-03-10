define(['../../../src/index', './Object'], function (tt, Object) {

    return tt.core.defineDerivedClass(Object, {

        delete: function () {
            if (!Object.prototype.delete.apply(this, arguments)) {
                return false;
            }
            tt.core.removeObject(this.parent.muscles, this);
            return true;
        },

        insertBefore: function (muscle) {
            var oldParent = muscle.parent;
            tt.core.removeObject(oldParent.muscles, muscle);
            muscle.parent = this.parent;
            var index = this.parent.muscles.indexOf(this);
            this.parent.muscles.splice(index, 0, muscle);
        }

    });

});