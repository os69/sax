define(['../../../../src/index', '../../model/WorkoutItem', '../../model/WorkoutBasic', './exercise', './workout', './movement', './muscle', '../../../../controls/tree/tree', '../../../../controls/util'],
    function (tt, WorkoutItem, WorkoutBasic, exerciseUi, workoutUi, movementUi, musclesUi, tree, controlsUtil) {

        var DesktopUITtNodeRenderer = tt.core.defineClass({

            init: function (model) {
                this.model = model;
                tt.initProperty(this, 'detail');
            },

            render: function () {
                return tt.createTtNode({
                    type: 'div',
                    children: [
                        this.createToolbarTtNode(),
                        this.createTreeAndDetailTtNode()
                    ]
                });
            },

            createToolbarTtNode: function () {
                return tt.createTtNode({
                    type: 'div',
                    css: ['buttons'],
                    children: [
                        tt.createTtNode({
                            type: 'button',
                            css: ['button'],
                            text: 'Load',
                            click: function () {
                                this.model.load();
                            }.bind(this)
                        }),
                        tt.createTtNode({
                            type: 'button',
                            css: ['button'],
                            text: 'Save',
                            click: function () {
                                this.model.save();
                            }.bind(this)
                        })
                    ]
                });
            },

            createTreeAndDetailTtNode: function (model) {
                return tt.createTtNode({
                    type: 'div',
                    css: ['columns'],
                    children: [
                        tt.createTtNode({
                            type: 'div',
                            css: ['column', 'is-three-quarters'],
                            children: [this.createTreeTtNode()]
                        }),
                        tt.createTtNode({
                            type: 'div',
                            css: ['column'],
                            children: [this.createDetailTtNode()]
                        })
                    ]
                });
            },

            createTreeTtNode: function () {

                var rootChildNodes = tt.createMappedList([0, 1, 2, 3], function (index) {
                    var root = this.model.getRoot();
                    switch (index) {
                        case 0:
                            return exerciseUi.createExerciseTreeNode({ exercise: root.exercise, ui: this });
                        case 1:
                            return workoutUi.createWorkoutTreeNode({ workout: root.workout, ui: this });
                        case 2:
                            return movementUi.createMovementTreeNode({ movement: root.movement, ui: this });
                        case 3:
                            return musclesUi.createMuscleTreeNode({ muscle: root.muscle, ui: this });
                    }
                }.bind(this));

                return controlsUtil.createWidgetTtNode({
                    header: 'All',
                    body: [tt.createTtNode({
                        type: 'div',
                        css: ['content'],
                        children: [tree.createTreeTtNode({
                            labelTtNodes: [controlsUtil.createLabelTtNode('root')],
                            childNodes: rootChildNodes
                        })]
                    })]
                });

            },

            createDetailTtNode: function () {
                return controlsUtil.createWidgetTtNode({
                    header: 'Detail',
                    body: function () {
                        var body = [];
                        var detail = this.getDetail();
                        if (!detail) {
                            return body;
                        }
                        tt.initProperty(detail, 'deleted');
                        var deleted = detail.getDeleted();
                        if (deleted) {
                            return body;
                        }
                        if (detail instanceof WorkoutItem) {
                            body.push(workoutUi.createWorkoutItemDetailTtNode({ item: detail }));
                        }
                        if (detail instanceof WorkoutBasic) {
                            body.push(workoutUi.createWorkoutBasicDetailTtNode({ workout: detail }));
                        }
                        return body;
                    }.bind(this)
                })
            }

        });

        return {
            createTtNode: tt.createTtNodeCreator(DesktopUITtNodeRenderer)
        };


    });
