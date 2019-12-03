define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/Workout', '../../model/WorkoutItem', '../../model/Exercise', '../../../../controls/util'], function (tt, WorkoutCollection, Workout, WorkoutItem, Exercise, controlsUtil) {

    var module = {};

    module.createWorkoutItemDetailNode = function (item) {
        tt.initProperty(item, 'name');
        return tt.createTtNode({
            type: 'span',
            text: function (item) { item.getName(); }
        });
    };

    module.createWorkoutItemTreeNode = function (params) {
        tt.initProperty(params.item, 'name');
        tt.initProperty(params.item, 'count');
        tt.initProperty(params.item, 'exercise');
        tt.initProperty(params.item.exercise, 'name');
        return {
            item: params.item,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['item-name-input'],
                    value: function () { return params.item.getName(); },
                    change: function (event) {
                        params.item.setName(event.srcElement.value);
                    },
                    click: function () {
                        params.ui.setDetail(params.item);
                    }
                }),
                tt.createTtNode({
                    type: 'input',
                    css: ['item-count-input'],
                    value: function () { return params.item.getCount(); },
                    change: function (event) {
                        params.item.setCount(event.srcElement.value);
                    }
                }),
                tt.createTtNode({
                    type: 'span',
                    css: ['item-exercise-name'],
                    text: function () { return params.item.getExercise().getName(); }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.item.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: [],
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.item instanceof WorkoutItem) {
                    params.item.insertBefore(droppedTreeNode.item);
                    return;
                }
                if (droppedTreeNode.exercise instanceof Exercise) {
                    params.item.createItemBefore({ exercise: droppedTreeNode.exercise });
                    return;
                }
            }
        };
    };

    module.createWorkoutBasicTreeNode = function (params) {
        tt.initProperty(params.workout, 'name');
        return {
            workout: params.workout,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.workout.getName(); },
                    change: function (event) {
                        params.workout.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.workout.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.workout.items, function (item) {
                return module.createWorkoutItemTreeNode(tt.core.cloneExtend(params, { item: item }));
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.exercise instanceof Exercise) {
                    params.workout.createItem({ exercise: droppedTreeNode.exercise });
                    return;
                }
                if (droppedTreeNode.workout instanceof Workout) {
                    params.workout.insertBefore(droppedTreeNode.workout);
                    return;
                }
            }
        };
    };

    module.createWorkoutCollectionTreeNode = function (params) {
        tt.initProperty(params.workout, 'name');
        return {
            workout: WorkoutCollection,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.workout.getName(); },
                    change: function (event) {
                        params.workout.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.workout.createWorkoutCollection({ name: 'New Collection' })
                    }.bind(this),
                    icon: ['fas', 'fa-folder-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.workout.createWorkoutBasic({ name: 'New Exercise' })
                    }.bind(this),
                    icon: ['fas', 'fa-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.workout.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.workout.workouts, function (workout) {
                return module.createWorkoutTreeNode(tt.core.cloneExtend(params, { workout: workout, }));
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.workout instanceof Workout) {
                    params.workout.insertBefore(droppedTreeNode.workout);
                    return;
                }
            }
        };
    };

    module.createWorkoutTreeNode = function (params) {
        if (params.workout.workouts) {
            return module.createWorkoutCollectionTreeNode(params);
        } else {
            return module.createWorkoutBasicTreeNode(params);
        }
    };

    return module;

});
