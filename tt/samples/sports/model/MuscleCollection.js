define(['../../../src/index', './Muscle', './MuscleBasic'], function (tt, Muscle, MuscleBasic) {

    var MuscleCollection = tt.core.defineDerivedClass(Muscle, {

        init: function (params) {
            Muscle.prototype.init.apply(this, arguments);
            this.muscles = params.muscles || [];
            this.postDeSerialize();
        },

        postDeSerialize: function () {
            tt.createReducedListProperty(this, 'totalMuscles', this.muscles, function (accu, muscle) {
                return accu+muscle.getTotalMuscles();
            }.bind(this), 0);
        },

        createMuscleCollection: function (params) {
            params.parent = this;
            var muscle = new MuscleCollection(params);
            this.muscles.push(muscle);
            return muscle;
        },

        createMuscleBasic: function (params) {
            params.parent = this;
            var muscle = new MuscleBasic(params);
            this.muscles.push(muscle);
            return muscle;
        }

    });

    return MuscleCollection;

});