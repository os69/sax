define(['../../../../src/index', './workoutBrowser', './workoutRunner', '../../model/Model'], function (tt, workoutBrowser, workoutRunner, Model) {

    var module = {

        createTtNode: tt.createTtNodeCreator({
            init: function (params) {
                this.model = params.model;
                this.mode = 'workout-browser';
                tt.initProperty(this, 'mode');
                this.focusObject = params.model.root.workout;
                tt.initProperty(this, 'focusObject');
            },
            render: function () {
                return tt.createTtNode({
                    type: 'div',
                    children: function () {
                        var root = this.model.getRoot();
                        this.setFocusObject(root.workout);
                        return [tt.createTtNode({
                            type: 'div',
                            children: function () {
                                switch (this.getMode()) {
                                    case 'workout-browser':
                                        return [workoutBrowser.createTtNode({ ui: this })];
                                    case 'workout-runner':
                                        return [workoutRunner.createTtNode({ ui: this })];
                                }
                            }.bind(this)
                        })];
                    }.bind(this)
                })
            }
        }),

        start: function () {
            var model = new Model();
            var ttNode = this.createTtNode({ model: model });
            document.getElementById('rootContainer').appendChild(ttNode.getDomNode());
            model.load().then(function () {
              // var workout = model.root.workout.workouts[0].workouts[0];
              //  ttNode.renderer.setFocusObject(workout);
            });
        }
    };

    return module;

});
