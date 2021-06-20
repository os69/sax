define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/Workout', '../../model/WorkoutItem', '../../model/Exercise', '../../../../controls/util', '../common/time'], function (tt, WorkoutCollection, Workout, WorkoutItem, Exercise, controlsUtil, time) {

    var module = {};

    module.createWorkoutBasicTtNode = function (params) {
        return tt.createTtNode({
            type: 'div',
            children: [
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-header'],
                    children: [
                        tt.createTtNode({
                            type: 'i',
                            css: ['fas', 'fa-arrow-left'],
                            click: function () {
                                params.ui.setWorkout(params.workout.parent);
                            }.bind(this),
                        }),
                        tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-header-text'],
                            text: function () {
                                tt.initProperty(params.workout, 'name');
                                return params.workout.getName();
                            }
                        })]
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-toolbar'],
                    children: [
                        tt.createTtNode({
                            type: 'i',
                            css: ['fas', 'fa-play'],
                            click: function () {
                                params.mobileUi.runWorkout(params.workout);
                            }.bind(this)
                        }),
                        tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-toolbar-total-duration'],
                            text: function () {
                                return time.int2ext(params.workout.getTotalDuration());
                            }.bind(this)
                        })
                    ]
                }),
                tt.createTtNode({
                    type: 'div',
                    children: tt.createMappedList(params.workout.items, function (item) {
                        return tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-workout-item'],
                            children: [
                                tt.createTtNode({
                                    type: 'div',
                                    css: ['workout-browser-workout-item-line1'],
                                    children: [
                                        tt.createTtNode({
                                            type: 'div',
                                            css: ['workout-browser-workout-item-name'],
                                            text: function () {
                                                tt.initProperty(item, 'name');
                                                return item.getName();
                                            }.bind(this)
                                        }),
                                        tt.createTtNode({
                                            type: 'div',
                                            css: ['workout-browser-workout-item-exercise-name'],
                                            text: function () {
                                                tt.initProperty(item, 'exercise');
                                                return item.getExercise().getName();
                                            }.bind(this)
                                        })
                                    ]
                                }),
                                tt.createTtNode({
                                    type: 'div',
                                    css: ['workout-browser-workout-item-line2'],
                                    children: [tt.createTtNode({
                                        type: 'div',
                                        css: ['workout-browser-workout-item-count'],
                                        text: function () {
                                            tt.initProperty(item, 'count');
                                            return item.getCount()+'x';
                                        }.bind(this)
                                    }),
                                    tt.createTtNode({
                                        type: 'div',
                                        css: ['workout-browser-workout-item-duration'],
                                        text: function () {
                                            tt.initProperty(item, 'duration');
                                            return time.int2ext(item.getDuration());
                                        }.bind(this)
                                    }),
                                    tt.createTtNode({
                                        type: 'div',
                                        css: ['workout-browser-workout-item-total-duration'],
                                        text: function () {
                                            return '∑ '+time.int2ext(item.getTotalDuration());
                                        }.bind(this)
                                    })]
                                })
                            ]
                        })
                    }.bind(this))
                })
            ]
        });
    };

    module.createWorkoutCollectionTtNode = function (params) {
        return tt.createTtNode({
            type: 'div',
            children: [
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-header'],
                    children: [
                        tt.createTtNode({
                            type: 'i',
                            css: function () {
                                if (!params.workout.parent.isRoot()) {
                                    return ['fas', 'fa-arrow-left'];
                                } else {
                                    return [];
                                }
                            }.bind(this),
                            click: function () {
                                params.ui.setWorkout(params.workout.parent);
                            }.bind(this),
                        }),
                        tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-header-text'],
                            text: function () {
                                tt.initProperty(params.workout, 'name');
                                return params.workout.getName();
                            }
                        })]
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-workouts'],
                    children: tt.createMappedList(params.workout.workouts, function (workout) {
                        return tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-workout'],
                            click: function () {
                                params.ui.setWorkout(workout);
                            }.bind(this),
                            children: [
                                tt.createTtNode({
                                    type: 'div',
                                    css: ['workout-browser-workout-name'],
                                    text: function () {
                                        tt.initProperty(workout, 'name');
                                        return workout.getName();
                                    }
                                }),
                                tt.createTtNode({
                                    type: 'div',
                                    css: ['workout-browser-workout-total-duration'],
                                    text: function () {
                                        if (!workout.workouts) {
                                            return '∑ '+time.int2ext(workout.getTotalDuration());
                                        } else {
                                            return '';
                                        }
                                    }
                                }),
                                tt.createTtNode({
                                    type: 'i',
                                    css: function () {
                                        if (!workout.workouts) {
                                            return ['fas', 'fa-play', 'workout-browser-workout-run'];
                                        } else {
                                            return [];
                                        }
                                    }.bind(this),
                                    click: function (evt) {
                                        evt.stopPropagation();
                                        params.mobileUi.runWorkout(workout);
                                    }.bind(this)
                                })]
                        });
                    })
                })
            ]
        })
    };

    module.createTtNode = tt.createTtNodeCreator({
        init: function (params) {
            this.mobileUi = params.mobileUi;
            this.root = params.root;
            if (params.workout) {
                this.workout = params.workout;
            } else {
                this.workout = this.root.workout;
            }
            tt.initProperty(this, 'workout');
        },
        render: function () {
            return tt.createTtNode({
                type: 'div',
                children: function () {
                    var workout = this.getWorkout();
                    var children = [];
                    if (workout.workouts) {
                        children.push(module.createWorkoutCollectionTtNode({ mobileUi: this.mobileUi, ui: this, workout: workout }));
                    } else {
                        children.push(module.createWorkoutBasicTtNode({ mobileUi: this.mobileUi, ui: this, workout: workout }));
                    }
                    return children;
                }.bind(this)
            })
        }
    });

    return module;

});
