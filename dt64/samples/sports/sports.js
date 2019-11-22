define(['../../src/index', './ExerciseCollection', './WorkoutCollection', './exercise', './workout', '../../controls/tree/tree', '../../controls/util','./model/test'], function (tt, ExerciseCollection, WorkoutCollection, exerciseUi, workoutUi, tree, controlsUtil) {
//define(['../../src/core/core', './modelx/test'], function (tt, ExerciseCollection, WorkoutCollection, exerciseUi, workoutUi, tree, controlsUtil) {

   var createModel = function () {
        var model = {};

        // exercise
        model.exerciseCollection = new ExerciseCollection({ name: 'All Exercises' });
        var exercise1 = model.exerciseCollection.createExerciseBasic({ name: 'Liegestützen' });
        var exercise2 = model.exerciseCollection.createExerciseBasic({ name: 'Bankdrücken' });

        // workout
        model.workoutCollection = new WorkoutCollection({ name: 'All Workouts' });
        var workout = model.workoutCollection.createWorkoutBasic({ name: 'Basic' });
        workout.createItem({ name: 'Übung 1', exercise: exercise1, count: 10 });
        workout.createItem({ name: 'Übung 2', exercise: exercise2, count: 5 });
        workout = model.workoutCollection.createWorkoutBasic({ name: 'Hard' });
        workout.createItem({ name: 'Übung 1', exercise: exercise1, count: 20 });
        workout.createItem({ name: 'Übung 2', exercise: exercise2, count: 10 });

        return model;
    };


    var model = createModel();

    var rootContainer = document.getElementById('rootContainer');

    rootContainer.appendChild(controlsUtil.createWidgetTtNode({
        header: 'All',
        body: [tt.createTtNode({
            type: 'div',
            css: ['content'],
            children: [tree.createTreeTtNode({
                labelTtNodes: [controlsUtil.createLabelTtNode('root')],
                childNodes: [
                    exerciseUi.createExerciseTreeNode(model.exerciseCollection),
                    workoutUi.createWorkoutTreeNode(model.workoutCollection)]
            })]
        })]
    }).getDomNode());
});
