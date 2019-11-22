define(['../../src/index', './ExerciseBasic', './ExerciseCollection', '../../controls/tree/tree', '../../controls/util'], function (tt, ExerciseBasic, ExerciseCollection, tree, controlsUtil) {

    var module = {};

    module.createExerciseTreeNode = function (exercise) {
        if (exercise.exercises) {
            return module.createExerciseCollectionTreeNode(exercise);
        } else {
            return module.createExerciseBasicTreeNode(exercise);
        }
    };

    module.createExerciseCollectionTreeNode = function (exerciseCollection) {
        tt.initProperty(exerciseCollection, 'name');
        return {
            exercise: exerciseCollection,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return exerciseCollection.getName(); },
                    change: function (event) {
                        exerciseCollection.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        exerciseCollection.createExerciseCollection({ name: 'New Collection' })
                    }.bind(this),
                    icon: ['fas', 'fa-folder-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        exerciseCollection.createExerciseBasic({ name: 'New Exercise' })
                    }.bind(this),
                    icon: ['fas', 'fa-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        exerciseCollection.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(exerciseCollection.exercises, module.createExerciseTreeNode),
            drop: function (droppedTreeNode) {
                exerciseCollection.addExercise(droppedTreeNode.exercise);
            }
        };

    };

    module.createExerciseBasicTreeNode = function (exercise) {
        tt.initProperty(exercise, 'name');
        return {
            exercise: exercise,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return exercise.getName(); },
                    change: function (event) {
                        exercise.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        exercise.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: []
        };
    };

    return module;

});
