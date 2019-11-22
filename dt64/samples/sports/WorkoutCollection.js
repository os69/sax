define(['../../src/index', './Workout'], function (tt, Workout) {

    var WorkoutCollection = tt.core.defineDerivedClass(Workout, {

        init: function (params) {
            Workout.prototype.init.apply(this, arguments);
            this.workouts = params.workouts || [];
        },

        createWorkoutCollection: function (params) {
            params.parent = this;
            var workout = new WorkoutCollection(params);
            this.workouts.push(workout);
        },

        createWorkoutBasic: function (params) {
            params.parent = this;
            var workout = new Workout(params);
            this.workouts.push(workout);
            return workout;
        }


    });

    return WorkoutCollection;

});