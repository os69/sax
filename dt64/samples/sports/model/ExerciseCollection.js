define(['../../../src/index', './Exercise', './ExerciseBasic'], function (tt, Exercise, ExerciseBasic) {

    var ExerciseCollection = tt.core.defineDerivedClass(Exercise, {

        init: function (params) {
            Exercise.prototype.init.apply(this, arguments);
            this.exercises = params.exercises || [];
        },

        createExerciseBasic: function (params) {
            params.parent = this;
            var basicExercise = new ExerciseBasic(params);
            this.exercises.push(basicExercise);
            return basicExercise;
        },

        createExerciseCollection: function (params) {
            params.parent = this;
            var exerciseCollection = new ExerciseCollection(params);
            this.exercises.push(exerciseCollection);
            return exerciseCollection;
        }

    });

    return ExerciseCollection;

});