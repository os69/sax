define(['../../../../src/index', '../../model/Muscle', '../../../../controls/util'], function (tt, Muscle, controlsUtil) {

    var module = {};

    module.createMuscleBasicTreeNode = function (params) {
        tt.initProperty(params.muscle, 'name');
        return {
            muscle: params.muscle,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.muscle.getName(); },
                    change: function (event) {
                        params.muscle.setName(event.srcElement.value);
                    }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.muscle.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.muscle instanceof Muscle) {
                    params.muscle.insertBefore(droppedTreeNode.muscle);
                    return;
                }
            }
        };
    };

    module.createMuscleCollectionTreeNode = function (params) {
        tt.initProperty(params.muscle, 'name');
        return {
            muscle: params.muscle,
            labelTtNodes: [
                tt.createTtNode({
                    type: 'input',
                    css: ['name-input'],
                    value: function () { return params.muscle.getName(); },
                    change: function (event) {
                        params.muscle.setName(event.srcElement.value);
                    }
                }),
                tt.createTtNode({
                    type: 'span',
                    css: [],
                    text: function () { return params.muscle.getTotalMuscles(); }
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.muscle.createMuscleCollection({ name: 'New Collection' })
                    }.bind(this),
                    icon: ['fas', 'fa-folder-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.muscle.createMuscleBasic({ name: 'New Muscle' })
                    }.bind(this),
                    icon: ['fas', 'fa-plus']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        params.muscle.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })
            ],
            childNodes: tt.createMappedList(params.muscle.muscles, function (muscle) {
                return module.createMuscleTreeNode(tt.core.cloneExtend(params, { muscle: muscle }));
            }),
            drop: function (droppedTreeNode) {
                if (droppedTreeNode.workout instanceof Muscle) {
                    params.muscle.insertBefore(droppedTreeNode.muscle);
                    return;
                }
            }
        };
    };

    module.createMuscleTreeNode = function (params) {
        if (params.muscle.muscles) {
            return module.createMuscleCollectionTreeNode(params);
        } else {
            return module.createMuscleBasicTreeNode(params);
        }
    };

    return module;

});
