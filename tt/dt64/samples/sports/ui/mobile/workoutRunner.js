define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/WorkoutBasic', '../../model/WorkoutItemCollection', '../../model/WorkoutItem', '../../model/Root', '../common/time', './stopWatch'], function (tt, WorkoutCollection, WorkoutBasic, WorkoutItemCollection, WorkoutItem, Root, time, stopWatch) {

    var ce = tt.core.cloneExtend.bind(tt.core);

    return {

        createTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                children: function () {
                    var focusObject = params.ui.getFocusObject();
                    if (focusObject instanceof WorkoutCollection) {
                        return [this.createWorkoutCollectionTtNode(ce(params, { workoutCollection: focusObject }))];
                    }
                    if (focusObject instanceof WorkoutBasic) {
                        return [this.createWorkoutBasicTtNode(ce(params, { workoutBasic: focusObject }))];
                    }
                    if (focusObject instanceof WorkoutItemCollection) {
                        return [this.createWorkoutItemCollectionTtNode(ce(params, { workoutItemCollection: focusObject }))];
                    }
                    if (focusObject instanceof WorkoutItem) {
                        return [this.createWorkoutItemTtNode(ce(params, { workoutItem: focusObject }))];
                    }
                }.bind(this)
            });
        },

        createHeaderTtNode: function (params) {
            var children = [];
            if (params.parent) {
                children.push(tt.createTtNode({
                    type: 'i',
                    css: ['fas', 'fa-arrow-left', 'field-2'],
                    click: function () {
                        params.ui.setFocusObject(params.parent);
                    }
                }));
            }
            children.push.apply(children, params.children);
            return tt.createTtNode({
                type: 'div',
                css: ['workout-runner-header'],
                children: children
            });
        },

        createStatisticTtNodes: function (item) {
            return [
                tt.createTtNode({
                    type: 'div',
                    css: ['field-2'],
                    text: function () {
                        var totalDuration = item.getTotalDuration();
                        if (totalDuration !== 0) {
                            var progress = Math.trunc(item.getElapsed() / totalDuration * 100);
                            return progress + '%';
                        } else {
                            return '100%';
                        }
                    }
                }), tt.createTtNode({
                    type: 'div',
                    css: ['field-2'],
                    text: function () {
                        return time.int2ext(item.getTotalDuration() - item.getElapsed());
                    }
                })];
        },

        // ===================================================================
        // workout basic
        // ===================================================================

        createWorkoutBasicTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                children: [
                    this.createHeaderTtNode({
                        children: [
                            tt.createTtNode({
                                type: 'div',
                                css: ['field-grow'],
                                text: function () { return params.workoutBasic.getName(); },
                            })
                        ]
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-toolbar'],
                        children: this.createStatisticTtNodes(params.workoutBasic)
                    }),
                    tt.createTtNode({
                        type: 'div',
                        children: tt.createMappedList(params.workoutBasic.items, function (item) {
                            if (item instanceof WorkoutItem) {
                                return this.createWorkoutItemChildTtNode(ce(params, { workoutItem: item }));
                            }
                            if (item instanceof WorkoutItemCollection) {
                                return this.createWorkoutItemCollectionChildTtNode(ce(params, { workoutItemCollection: item }));
                            }
                        }.bind(this))
                    })
                ]
            })
        },

        createWorkoutItemChildTtNode: function (params) {

            tt.initProperty(params.workoutItem, 'exercise');
            tt.initProperty(params.workoutItem.exercise, 'helpUrl');

            var line1 = [];
            var helpUrl = params.workoutItem.getExercise().getHelpUrl();
            if (helpUrl) {
                line1.push(tt.createTtNode({
                    type: 'a',
                    css: ['field-grow'],
                    text: function () { return params.workoutItem.getExercise().getName(); },
                    href: function () { return helpUrl },
                    target: '_blank'
                }));
            } else {
                line1.push(tt.createTtNode({
                    type: 'div',
                    css: ['field-grow'],
                    text: function () { return params.workoutItem.getExercise().getName(); }
                }));
            }
            line1.push(tt.createTtNode({
                type: 'div',
                css: ['field-5'],
                text: function () { return params.workoutItem.getName(); }
            }));

            var line2 = [];
            if (params.workoutItem.getCount() > 1) {
                line2.push(tt.createTtNode({
                    type: 'div',
                    css: ['field-grow'],
                    text: function () { return 'x' + params.workoutItem.getCount(); }
                }));
                line2.push(tt.createTtNode({
                    type: 'div',
                    css: ['field-5'],
                    text: function () { return time.int2ext(params.workoutItem.getDuration()); }
                }));
            } else {
                line2.push(stopWatch.createTtNode({
                    seconds: params.workoutItem.getDuration(),
                    finished: function () {
                        navigator && navigator.notification && navigator.notification.beep(1);
                    }
                }));
            }


            return tt.createTtNode({
                type: 'div',
                css: function () {
                    if (!params.workoutItem.getChecked()) {
                        return ['workout-runner-item'];
                    } else {
                        return ['workout-runner-item', 'workout-runner-item-checked'];
                    }
                },
                children: [
                    tt.createTtNode({
                        type: 'i',
                        css: function () {
                            if (params.workoutItem.getChecked()) {
                                return ['workout-runner-item-checkbox', 'fa', 'fa-check-square'];
                            } else {
                                return ['workout-runner-item-checkbox', 'fa', 'fa-square'];
                            }
                        },
                        click: function () {
                            params.workoutItem.setChecked(!params.workoutItem.getChecked());
                        }
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-item-lines'],
                        children: [
                            // line 1
                            tt.createTtNode({
                                type: 'div',
                                css: ['workout-runner-item-line1'],
                                children: line1
                            }),
                            // line 2
                            tt.createTtNode({
                                type: 'div',
                                css: ['workout-runner-item-line2'],
                                children: line2
                            })
                        ]
                    })
                ]
            })
        },

        createWorkoutItemCollectionChildTtNode: function (params) {
            var statisticTtNodes = this.createStatisticTtNodes(params.workoutItemCollection);
            return tt.createTtNode({
                type: 'div',
                css: function () {
                    if (!params.workoutItemCollection.getChecked()) {
                        return ['workout-runner-item'];
                    } else {
                        return ['workout-runner-item', 'workout-runner-item-checked'];
                    }
                },
                children: [
                    tt.createTtNode({
                        type: 'i',
                        css: function () {
                            if (params.workoutItemCollection.getChecked()) {
                                return ['workout-runner-item-checkbox', 'fa', 'fa-check-square', 'field-2'];
                            } else {
                                return ['workout-runner-item-checkbox', 'fa', 'fa-square', 'field-2'];
                            }
                        }
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-grow'],
                        text: function () { return params.workoutItemCollection.getName(); }
                    }),
                    statisticTtNodes[0],
                    statisticTtNodes[1]],
                click: function () {
                    params.ui.setFocusObject(params.workoutItemCollection);
                }.bind(this)
            });
        },

        // ===================================================================
        // workout item collection
        // ===================================================================

        createWorkoutItemCollectionTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                children: [
                    this.createHeaderTtNode({
                        parent: params.workoutItemCollection.parent,
                        ui: params.ui,
                        children: [
                            tt.createTtNode({
                                type: 'div',
                                css: ['field-grow'],
                                text: function () { return params.workoutItemCollection.getName(); },
                            })
                        ]
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-runner-toolbar'],
                        children: this.createStatisticTtNodes(params.workoutItemCollection)
                    }),
                    tt.createTtNode({
                        type: 'div',
                        children: tt.createMappedList(params.workoutItemCollection.items, function (item) {
                            if (item instanceof WorkoutItem) {
                                return this.createWorkoutItemChildTtNode(ce(params, { workoutItem: item }));
                            }
                            if (item instanceof WorkoutItemCollection) {
                                return this.createWorkoutItemCollectionChildTtNode(ce(params, { workoutItemCollection: item }));
                            }
                        }.bind(this))
                    })
                ]
            })
        }

    }

});
