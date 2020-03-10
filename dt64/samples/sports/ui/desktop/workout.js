define(['../../../../src/index', '../../model/Workout', '../../model/WorkoutItem', '../../model/ExerciseBasic', '../../../../controls/util', '../time'], function (tt, Workout, WorkoutItem, ExerciseBasic, controlsUtil, time) {

    var module = {};

    module.createWorkoutItemDetailTtNode = function (params) {
        tt.initProperty(params.item, 'count');
        tt.initProperty(params.item, 'duration');
        return tt.createTtNode({
            type: 'div',
            children: [
                controlsUtil.createInputTtNode({
                    label: 'name',
                    value: function () {
                        return params.item.getName();
                    },
                    change: function (event) {
                        params.item.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createInputTtNode({
                    label: 'count',
                    value: function () {
                        return '' + params.item.getCount();
                    },
                    change: function (event) {
                        params.item.setCount(parseInt(event.srcElement.value));
                    }
                }),
                controlsUtil.createInputTtNode({
                    label: 'duration',
                    value: function () {
                        return '' + time.int2ext(params.item.getDuration());
                    },
                    change: function (event) {
                        params.item.setDuration(time.ext2int(event.srcElement.value));
                    }
                }),
                controlsUtil.createInputTtNode({
                    label: 'total',
                    value: function () {
                        return '' + time.int2ext(params.item.getTotalDuration());
                    },
                    disabled: true
                }),
            ]
        });
    };

    module.createWorkoutBasicDetailTtNode = function (params) {
        return tt.createTtNode({
            type: 'div',
            children: [
                controlsUtil.createInputTtNode({
                    label: 'name',
                    value: function () {
                        return params.workout.getName();
                    },
                    change: function (event) {
                        params.workout.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createInputTtNode({
                    label: 'total',
                    value: function () {
                        return '' + time.int2ext(params.workout.getTotalDuration());
                    },
                    disabled: true
                })
            ]
        });
    };

    module.createWorkoutItemTreeNode = function (params) {
        tt.initProperty(params.item, 'name');
        tt.initProperty(params.item, 'count');
        tt.initProperty(params.item, 'duration');
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
                    value: function () { return '' + params.item.getCount(); },
                    change: function (event) {
                        params.item.setCount(parseInt(event.srcElement.value));
                    }
                }),
                tt.createTtNode({
                    type: 'input',
                    css: ['item-duration-input'],
                    value: function () { return '' + time.int2ext(params.item.getDuration()); },
                    change: function (event) {
                        params.item.setDuration(time.ext2int(event.srcElement.value));
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
                if (droppedTreeNode.exercise instanceof ExerciseBasic) {
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
                    },
                    click: function () {
                        params.ui.setDetail(params.workout);
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
                if (droppedTreeNode.exercise instanceof ExerciseBasic) {
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
            workout: params.workouts,
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