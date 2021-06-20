define(['../../../src/index', './Muscle'], function (tt, Muscle) {

    return tt.core.defineDerivedClass(Muscle, {

        init: function (params) {
            Muscle.prototype.init.apply(this, arguments);
        },

        getTotalMuscles: function () {
            return 1;
        }

    });

}); 