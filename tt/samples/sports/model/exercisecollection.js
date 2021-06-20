import { tt } from '../../../src/tt/tt';
import { Exercise } from './exercise';
import { ExerciseBasic } from './exercisebasic';

export var ExerciseCollection = tt.core.defineDerivedClass(Exercise, {

    initProps: function (params) {
        Exercise.prototype.initProps.apply(this, arguments);
        this.exercises = params.exercises || [];
    },

    initTt: function () {
        Exercise.prototype.initTt.apply(this, arguments);
        tt.initProperty(this, 'exercises');
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

