define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/Workout', '../../model/WorkoutItem', '../../model/Exercise', '../../../../controls/util'], function (tt, WorkoutCollection, Workout, WorkoutItem, Exercise, controlsUtil) {

    var module = {};

    module.createWorkoutItemTtNode = function (params) {
    };

    module.createWorkoutBasicTtNode = function (params) {
        return tt.createTtNode({
            type: 'div',
            children: [
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-workout'],
                    children: [
                        tt.createTtNode({
                            type: 'span',
                            text: function () {
                                tt.initProperty(params.workout, 'name');
                                return params.workout.getName();
                            }
                        }),
                        tt.createTtNode({
                            type: 'button',
                            text: 'Run',
                            css: ['workout-run-button'],
                            click: function () {
                                params.mobileUi.runWorkout(params.workout);
                            }.bind(this)
                        })
                    ]
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-workout'],
                    text: '..',
                    click: function () {
                        params.ui.setWorkout(params.workout.parent);
                    }.bind(this)
                }),
                tt.createTtNode({
                    type: 'div',
                    children: tt.createMappedList(params.workout.items, function (item) {
                        return tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-workout'],
                            text: function () {
                                tt.initProperty(item, 'name');
                                return item.getName();
                            }.bind(this)
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
                    css: ['workout-browser-workout'],
                    text: function () {
                        tt.initProperty(params.workout, 'name');
                        return params.workout.getName();
                    }
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['workout-browser-workout'],
                    text: '..',
                    click: function () {
                        params.ui.setWorkout(params.workout.parent);
                    }.bind(this)
                }),
                tt.createTtNode({
                    type: 'div',
                    children: tt.createMappedList(params.workout.workouts, function (workout) {
                        return tt.createTtNode({
                            type: 'div',
                            css: ['workout-browser-workout'],
                            text: function () {
                                tt.initProperty(workout, 'name');
                                return workout.getName();
                            },
                            click: function () {
                                params.ui.setWorkout(workout);
                            }.bind(this)
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
