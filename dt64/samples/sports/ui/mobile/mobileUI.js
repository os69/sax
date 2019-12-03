define(['../../../../src/index', './workout'], function (tt, workoutUI) {

    var MobileUITtNodeRenderer = tt.core.defineClass({

        init: function (model) {
            this.model = model;
            tt.initProperty(this, 'workout');
        },

        render: function () {
            return tt.createTtNode({
                type: 'div',
                children: function () {
                    var root = this.model.getRoot();
                    var workout = this.getWorkout();
                    if (!workout) {
                        workout = root.workout;
                    }
                    return [
                        tt.createTtNode({
                            type: 'button',
                            text: 'up',
                            click: function () {
                                var workout = this.getWorkout();
                                this.setWorkout(workout.parent);
                            }.bind(this)
                        }),
                        workoutUI.createWorkoutTtNode({ workout: workout, ui: this })]
                }.bind(this)
            });
        },

    });

    return {
        createTtNode: tt.createTtNodeCreator(MobileUITtNodeRenderer)
    };

});
