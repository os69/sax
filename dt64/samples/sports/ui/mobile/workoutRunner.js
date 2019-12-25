define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/Workout', '../../model/WorkoutItem', '../../model/Exercise', '../../../../controls/util', './stopWatch'], function (tt, WorkoutCollection, Workout, WorkoutItem, Exercise, controlsUtil, stopWatch) {

    var module = {};

    module.createWorkoutItemTtNode = tt.createTtNodeCreator({
        init: function (params) {
            this.item = params.item;
        },
        render: function () {
            return tt.createTtNode({
                type: 'div',
                css: ['workout-browser-workout'],
                children: [
                    tt.createTtNode({
                        type: 'input',
                        _type: 'checkbox',
                        value: false
                    }),
                    tt.createTtNode({
                        type: 'div',
                        text: function () {
                            return this.item.getName();
                        }.bind(this)
                    }),
                    stopWatch.createTtNode({ minutes: 0, seconds: 10 })
                ]
            })
        }
    });

    module.createTtNode = tt.createTtNodeCreator({
        init: function (params) {
            this.mobileUi = params.mobileUi;
            this.workout = params.workout;
        },
        render: function () {
            return tt.createTtNode({
                type: 'div',
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['workout-browser-workout'],
                        click: function(){
                            this.mobileUi.showWorkout(this.workout);
                        }.bind(this),
                        text: 'test'
                    }),
                    tt.createTtNode({
                        type: 'div',
                        children: tt.createMappedList(this.workout.items, function (item) {
                            return module.createWorkoutItemTtNode({ item: item });
                        })
                    })
                ]
            })
        }
    });

    return module;

});
