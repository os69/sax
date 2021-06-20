define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/WorkoutBasic', '../../model/WorkoutItemCollection', '../../model/WorkoutItem', '../../model/Root', '../common/time'], function (tt, WorkoutCollection, WorkoutBasic, WorkoutItemCollection, WorkoutItem, Root, time) {

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
                css: ['workout-browser-header'],
                children: children
            });
        },

        // ===================================================================
        // workout collection
        // ===================================================================

        createWorkoutCollectionTtNode: function (params) {
            var parent = null;
            if (!(params.workoutCollection.parent instanceof Root)) {
                parent = params.workoutCollection.parent;
            }
            return tt.createTtNode({
                type: 'div',
                children: [
                    this.createHeaderTtNode({
                        parent: parent,
                        ui: params.ui,
                        children: [
                            tt.createTtNode({
                                type: 'div',
                                css: ['field-grow'],
                                text: function () { return params.workoutCollection.getName(); },
                            })
                        ]
                    }),
                    tt.createTtNode({
                        type: 'div',
                        children: tt.createMappedList(params.workoutCollection.workouts, function (workout) {
                            if (workout instanceof WorkoutCollection) {
                                return this.createWorkoutCollectionChildTtNode(ce(params, { workoutCollection: workout }));
                            }
                            if (workout instanceof WorkoutBasic) {
                                return this.createWorkoutBasicChildTtNode(ce(params, { workoutBasic: workout }));
                            }
                        }.bind(this))
                    })
                ]
            })
        },

        createWorkoutCollectionChildTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                text: function () { return params.workoutCollection.getName(); },
                css: ['workout-browser-item'],
                click: function () {
                    params.ui.setFocusObject(params.workoutCollection);
                }.bind(this)
            })
        },

        createWorkoutBasicChildTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                css: ['workout-browser-item'],
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-grow'],
                        text: function () { return params.workoutBasic.getName(); },
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-5'],
                        text: function () { return time.int2ext(params.workoutBasic.getTotalDuration()); }
                    }),
                    tt.createTtNode({
                        type: 'i',
                        css: ['fas', 'fa-play', 'workout-browser-item-field-2'],
                        click: function (event) {
                            event.stopPropagation();
                            params.ui.setFocusObject(params.workoutBasic);
                            params.ui.setMode('workout-runner');
                        }
                    })
                ],
                click: function () {
                    params.ui.setFocusObject(params.workoutBasic);
                }.bind(this)
            })
        },

        // ===================================================================
        // workout basic
        // ===================================================================

        createWorkoutBasicTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                children: [
                    this.createHeaderTtNode({
                        parent: params.workoutBasic.parent,
                        ui: params.ui,
                        children: [
                            tt.createTtNode({
                                type: 'div',
                                css: ['field-grow'],
                                text: function () { return params.workoutBasic.getName(); },
                            }),
                            tt.createTtNode({
                                type: 'div',
                                css: ['field-5'],
                                text: function () { return time.int2ext(params.workoutBasic.getTotalDuration()); },
                            })
                        ]
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-browser-toolbar'],
                        children: [
                            tt.createTtNode({
                                type: 'i',
                                css: ['fas', 'fa-play'],
                                click: function () {
                                    params.ui.setMode('workout-runner');
                                }.bind(this)
                            })
                        ]
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
            return tt.createTtNode({
                type: 'div',
                css: ['workout-browser-item'],
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-grow'],                    
                        text: function () { return params.workoutItem.getExercise().getName(); }
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-5'],
                        text: function () { return params.workoutItem.getName(); }
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-2'],
                        text: function () { return 'x' + params.workoutItem.getCount(); }
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-2'],
                        text: function () { return time.int2ext(params.workoutItem.getDuration()); }
                    })
                ]
            })
        },

        createWorkoutItemCollectionChildTtNode: function (params) {
            return tt.createTtNode({
                type: 'div',
                css: ['workout-browser-item'],
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-grow'],
                        text: function () { return params.workoutItemCollection.getName(); },
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['field-5'],
                        text: function () { return time.int2ext(params.workoutItemCollection.getTotalDuration()); }
                    })
                ],
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
                            }),
                            tt.createTtNode({
                                type: 'div',
                                css: ['field-5'],
                                text: function () { return time.int2ext(params.workoutItemCollection.getTotalDuration()) },
                            })
                        ]
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


// workoutCollection
// workoutBasic
// itemCollection
// itemBasic

/*
workoutCollection: workoutCollection, workoutBasic
workoutBasic: itemCollection, itemBasic

itemCollection: itemCollection, itemBasic
itemBasic: -

*/


