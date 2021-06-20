define(['../../../../src/index', '../../../../controls/util', '../../model/Movement','../../model/Muscle','../common/icons'], function (tt, controlsUtil, Movement, Muscle, icons) {

    var module = {};

    module.createMovementTreeNode = function (params) {
        if (params.movement.movements) {
            return module.createMovementCollectionTreeNode(params);
        } else {
            return module.createMovementBasicTreeNode(params);
        }
    };

    module.createMovementCollectionTreeNode = function (params) {
        tt.initProperty(params.movement, 'name');
        return {
            movement: params.movement,
            labelTtNodes: [
                controlsUtil.createIconTtNode({
                    icon: icons.MovementCollection
                }),
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.movement.getName(); },
                    change: function (event) {
                        params.movement.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.movement.createMovementCollection({ name: 'New Collection' })
                    }.bind(this),
                    icon: icons.createMovementCollection
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.movement.createMovementBasic({ name: 'New Movement' })
                    }.bind(this),
                    icon: icons.MovementBasic
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.movement.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.movement.movements, function (movement) {
                return module.createMovementTreeNode(tt.core.cloneExtend(params, { movement: movement }));
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.movement instanceof Movement) {
                    params.movement.insertBefore(droppedTreeNode.movement);
                    return;
                }
            }
        };

    };

    module.createMovementBasicTreeNode = function (params) {
        tt.initProperty(params.movement, 'name');
        return {
            movement: params.movement,
            labelTtNodes: [
                controlsUtil.createIconTtNode({
                    icon: icons.MovementBasic
                }),
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.movement.getName(); },
                    change: function (event) {
                        params.movement.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.movement.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.movement.muscles, function (muscle) {
                return module.createMovementMuscleUsageTreeNode({ movement: params.movement, muscle: muscle });
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.movement instanceof Movement) {
                    params.movement.insertBefore(droppedTreeNode.movement);
                    return;
                }
                if (droppedTreeNode.muscle instanceof Muscle) {
                    params.movement.addMuscle(droppedTreeNode.muscle);
                    return;
                }
            }
        };
    };

    module.createMovementMuscleUsageTreeNode = function (params) {
        tt.initProperty(params.muscle, 'name');
        return {
            movement: params.movement,
            muscle: params.muscle,
            labelTtNodes: [
                controlsUtil.createIconTtNode({
                    icon: icons.MuscleBasic
                }),
                tt.createTtNode({
                    type: 'span',
                    css: ['name-input'],
                    text: function () { return params.muscle.getName(); }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.movement.removeMuscle(params.muscle);
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: []
        };
    };

    return module;

});
