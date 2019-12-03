define(['../../../../src/index', '../../../../controls/util', '../../model/Movement'], function (tt, controlsUtil, Movement) {

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
                    icon: ['fas', 'fa-folder-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.movement.createMovementBasic({ name: 'New Movement' })
                    }.bind(this),
                    icon: ['fas', 'fa-plus']
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
            childNodes: [],
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.movement instanceof Movement) {
                    params.movement.insertBefore(droppedTreeNode.movement);
                    return;
                }
            }
        };
    };

    return module;

});
