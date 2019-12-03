define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/Workout', '../../model/WorkoutItem', '../../model/Exercise', '../../../../controls/util'], function (tt, WorkoutCollection, Workout, WorkoutItem, Exercise, controlsUtil) {

    var module = {};

    module.createWorkoutItemTtNode = function (params) {
    };

    module.createWorkoutBasicTtNode = function (params) {
        return tt.createTtNode({
            type: 'div',
            children: [
                tt.createTtNode({
                    type: 'span',
                    text: function () {
                        tt.initProperty(params.workout, 'name');
                        return params.workout.getName();
                    }
                }),
                tt.createTtNode({
                    type: 'ul',
                    children: tt.createMappedList(params.workout.items, function (item) {
                        return tt.createTtNode({
                            type: 'li',
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
                    type: 'span',
                    text: function () {
                        tt.initProperty(params.workout, 'name');
                        return params.workout.getName();
                    }
                }),
                tt.createTtNode({
                    type: 'ul',
                    children: tt.createMappedList(params.workout.workouts, function (workout) {
                        return tt.createTtNode({
                            type: 'li',
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

    module.createWorkoutTtNode = function (params) {
        if (params.workout.workouts) {
            return module.createWorkoutCollectionTtNode(params);
        } else {
            return module.createWorkoutBasicTtNode(params);
        }
    };

    return module;

});
