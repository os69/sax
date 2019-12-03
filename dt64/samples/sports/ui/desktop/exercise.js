define(['../../../../src/index', '../../../../controls/util', '../../model/Exercise', '../../model/Movement'], function (tt, controlsUtil, Exercise, Movement) {

    var module = {};

    module.createExerciseTreeNode = function (params) {
        if (params.exercise.exercises) {
            return module.createExerciseCollectionTreeNode(params);
        } else {
            return module.createExerciseBasicTreeNode(params);
        }
    };

    module.createExerciseCollectionTreeNode = function (params) {
        tt.initProperty(params.exercise, 'name');
        return {
            exercise: params.exercise,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.exercise.getName(); },
                    change: function (event) {
                        params.exercise.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.exercise.createExerciseCollection({ name: 'New Collection' })
                    }.bind(this),
                    icon: ['fas', 'fa-folder-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.exercise.createExerciseBasic({ name: 'New Exercise' })
                    }.bind(this),
                    icon: ['fas', 'fa-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.exercise.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.exercise.exercises, function (exercise) {
                return module.createExerciseTreeNode(tt.core.cloneExtend(params, { exercise: exercise }));
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.exercise instanceof Exercise) {
                    params.exercise.insertBefore(droppedTreeNode.exercise);
                    return;
                }
            }
        };

    };

    module.createExerciseBasicTreeNode = function (params) {
        tt.initProperty(params.exercise, 'name');
        return {
            exercise: params.exercise,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.exercise.getName(); },
                    change: function (event) {
                        params.exercise.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.exercise.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.exercise.movements, function (movement) {
                return module.createExerciseMovementUsageTreeNode(tt.core.cloneExtend(params, { movement: movement }));
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.exercise instanceof Exercise) {
                    params.exercise.insertBefore(droppedTreeNode.exercise);
                    return;
                }
                if (droppedTreeNode.movement instanceof Movement) {
                    params.exercise.addMovement(droppedTreeNode.movement);
                    return;
                }
            }
        };
    };

    module.createExerciseMovementUsageTreeNode = function (params) {
        tt.initProperty(params.movement, 'name');
        return {
            exercise: params.exercise,
            movement: params.movement,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'span',
                    css: ['name-input'],
                    text: function () { return params.movement.getName(); }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.exercise.removeMovement(params.movement);
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: []
        };
    };

    return module;

});
