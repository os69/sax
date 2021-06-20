define(['../../../../src/index', './workoutBrowser', './workoutRunner','../../model/Model'], function (tt, workoutBrowser, workoutRunner, Model) {

    var module = {

        createTtNode: tt.createTtNodeCreator({
            init: function (params) {
                this.model = params.model;
                this.mode = 'workout-browser';
                tt.initProperty(this, 'mode');
            },
            runWorkout: function (workout) {
                console.log('run', workout);
                this.workoutParameter = workout;
                this.setMode('workout-runner');
            },
            showWorkout: function (workout) {
                this.workoutParameter = workout;
                this.setMode('workout-browser');
            },
            render: function () {
                return tt.createTtNode({
                    type: 'div',
                    children: function () {
                        var root = this.model.getRoot();
                        this.setMode('workout-browser');
                        return [tt.createTtNode({
                            type: 'div',
                            children: function () {
                                var mode = this.getMode();
                                var children;
                                switch (mode) {
                                    case 'workout-browser':
                                        children = [workoutBrowser.createTtNode({ root: root, workout: this.workoutParameter, mobileUi: this })]
                                        break;
                                    case 'workout-runner':
                                        children = [workoutRunner.createTtNode({ workout: this.workoutParameter, mobileUi: this })];
                                        break;
                                }
                                this.workoutParameter = null;
                                return children;
                            }.bind(this)
                        })];
                    }.bind(this)
                });
            }
        }),

        start: function(){
            var model = new Model();
            document.getElementById('rootContainer').appendChild(this.createTtNode({ model: model }).getDomNode());
            model.load();        
        }
    };

    return module;

});
