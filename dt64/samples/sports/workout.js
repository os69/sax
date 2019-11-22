define(['../../src/index', './Workout', './WorkoutItem', './WorkoutCollection', '../../controls/tree/tree', '../../controls/util'], function (tt, Workout, WorkoutItem, WorkoutCollection, tree, controlsUtil) {

    var module = {};

    module.createWorkoutItemTreeNode = function (workoutItem) {
        tt.initProperty(workoutItem, 'name');
        tt.initProperty(workoutItem, 'count');
        tt.initProperty(workoutItem, 'exercise');
        tt.initProperty(workoutItem.exercise, 'name');
        return {
            item: workoutItem,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['item-name-input'],
                    value: function () { return workoutItem.getName(); },
                    change: function (event) {
                        workoutItem.setName(event.srcElement.value);
                    }
                }),
                tt.createTtNode({
                    type: 'input',
                    css: ['item-count-input'],
                    value: function () { return workoutItem.getCount(); },
                    change: function (event) {
                        workoutItem.setCount(event.srcElement.value);
                    }
                }),
                tt.createTtNode({
                    type: 'span',
                    css: ['item-exercise-name'],
                    text: function () { return workoutItem.getExercise().getName(); }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        workoutItem.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: []
        };
    };

    module.createWorkoutBasicTreeNode = function (workout) {
        tt.initProperty(workout, 'name');
        return {
            workout: workout,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return workout.getName(); },
                    change: function (event) {
                        workout.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        workout.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(workout.items, module.createWorkoutItemTreeNode),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.exercise) {
                    workout.createItem({ name: droppedTreeNode.exercise.name, exercise: droppedTreeNode.exercise });
                }
            }
        };
    };

    module.createWorkoutCollectionTreeNode = function (workoutCollection) {
        tt.initProperty(workoutCollection, 'name');
        return {
            workout: WorkoutCollection,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return workoutCollection.getName(); },
                    change: function (event) {
                        workoutCollection.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        workoutCollection.createWorkoutCollection({ name: 'New Collection' })
                    }.bind(this),
                    icon: ['fas', 'fa-folder-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        workoutCollection.createWorkoutBasic({ name: 'New Exercise' })
                    }.bind(this),
                    icon: ['fas', 'fa-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        workoutCollection.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(workoutCollection.workouts, module.createWorkoutTreeNode)
        };
    };

    module.createWorkoutTreeNode = function (workout) {
        if (workout.workouts) {
            return module.createWorkoutCollectionTreeNode(workout);
        } else {
            return module.createWorkoutBasicTreeNode(workout);
        }
    };

    return module;

});
