define(['../../../../src/index', '../../model/Workout', '../../model/WorkoutItem', '../../model/WorkoutItemCollection', '../../model/ExerciseBasic', '../../../../controls/util', '../common/time', '../common/icons'], function (tt, Workout, WorkoutItem, WorkoutItemCollection, ExerciseBasic, controlsUtil, time, icons) {

    var module = {};

    module.createWorkoutItemDetailTtNode = function (params) {
        tt.initProperty(params.item, 'count');
        tt.initProperty(params.item, 'duration');
        return tt.createTtNode({
            type: 'div',
            children: [
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
                controlsUtil.createInputTtNode({
                    label: 'name (description)',
                    value: function () {
                        return params.item.getName();
                    },
                    change: function (event) {
                        params.item.setName(event.srcElement.value);
                    }
                })
            ]
        });
    };

    module.createWorkoutItemCollectionDetailTtNode = function (params) {
        return tt.createTtNode({
            type: 'div',
            children: [
                controlsUtil.createInputTtNode({
                    label: 'name',
                    value: function () {
                        return params.itemCollection.getName();
                    },
                    change: function (event) {
                        params.item.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createInputTtNode({
                    label: 'total',
                    value: function () {
                        return '' + time.int2ext(params.itemCollection.getTotalDuration());
                    },
                    disabled: true
                })
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
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.ui.setDetail(params.item);
                    },
                    icon: icons.WorkoutItem
                }),
                tt.createTtNode({
                    type: 'span',
                    css: ['item-exercise-name'],
                    text: function () { return params.item.getExercise().getName(); }
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['item-count-input'],
                    contenteditable: true,
                    click: function () {
                        params.ui.setDetail(params.item);
                    },
                    text: function () { return '' + params.item.getCount(); },
                    blur: function (event) {
                        params.item.setCount(parseInt(event.srcElement.innerText));
                    }
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['item-duration-input'],
                    contenteditable: true,
                    click: function () {
                        params.ui.setDetail(params.item);
                    },
                    text: function () { return '' + time.int2ext(params.item.getDuration()); },
                    blur: function (event) {
                        params.item.setDuration(time.ext2int(event.srcElement.innerText));
                    }
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['item-name-input'],
                    contenteditable: true,
                    click: function () {
                        params.ui.setDetail(params.item);
                    },
                    text: function () { return params.item.getName(); },
                    blur: function (event) {
                        params.item.setName(event.srcElement.innerText);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.item.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: [],
            drop: function (droppedTreeNode, event) {
                if (droppedTreeNode.item instanceof WorkoutItem || droppedTreeNode.item instanceof WorkoutItemCollection) {
                    if (!event.shiftKey) {
                        params.item.insertBefore(droppedTreeNode.item);
                    } else {
                        params.item.insertCloneBefore(droppedTreeNode.item);
                    }
                    return;
                }
                if (droppedTreeNode.exercise instanceof ExerciseBasic) {
                    params.item.createItemBefore({ exercise: droppedTreeNode.exercise });
                    return;
                }
            }
        };
    };

    module.createWorkoutItemCollectionTreeNode = function (params) {
        tt.initProperty(params.itemCollection, 'name');
        return {
            item: params.itemCollection,
            labelTtNodes: [
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.ui.setDetail(params.itemCollection);
                    },
                    icon: icons.WorkoutItemCollection
                }),
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.itemCollection.getName(); },
                    change: function (event) {
                        params.itemCollection.setName(event.srcElement.value);
                    },
                    click: function () {
                        params.ui.setDetail(params.itemCollection);
                    },
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.itemCollection.createItemCollection({ name: 'New Item Collection' });
                    }.bind(this),
                    icon: icons.createWorkoutItemCollection
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.itemCollection.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.itemCollection.items, function (item) {
                if (item instanceof WorkoutItem) {
                    return module.createWorkoutItemTreeNode(tt.core.cloneExtend(params, { item: item }));
                }
                if (item instanceof WorkoutItemCollection) {
                    return module.createWorkoutItemCollectionTreeNode(tt.core.cloneExtend(params, { itemCollection: item }));
                }
            }),
            drop: function (droppedTreeNode, event) {
                if (droppedTreeNode.item instanceof WorkoutItem || droppedTreeNode.item instanceof WorkoutItemCollection) {
                    if (!event.shiftKey) {
                        params.itemCollection.insertBefore(droppedTreeNode.item);
                    } else {
                        params.itemCollection.insertCloneBefore(droppedTreeNode.item);
                    }
                    return;
                }
                if (droppedTreeNode.exercise instanceof ExerciseBasic) {
                    params.itemCollection.createItem({ exercise: droppedTreeNode.exercise });
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
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.ui.setDetail(params.workout);
                    },
                    icon: icons.WorkoutBasic
                }),
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
                        params.workout.createItemCollection({ name: 'New Item Collection' });
                    }.bind(this),
                    icon: icons.createWorkoutItemCollection
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.workout.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.workout.items, function (item) {
                if (item instanceof WorkoutItem) {
                    return module.createWorkoutItemTreeNode(tt.core.cloneExtend(params, { item: item }));
                }
                if (item instanceof WorkoutItemCollection) {
                    return module.createWorkoutItemCollectionTreeNode(tt.core.cloneExtend(params, { itemCollection: item }));
                }
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
                controlsUtil.createIconTtNode({
                    icon: icons.WorkoutCollection
                }),
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
                    icon: icons.createWorkoutCollection
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.workout.createWorkoutBasic({ name: 'New Workout' })
                    }.bind(this),
                    icon: icons.WorkoutBasic
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
