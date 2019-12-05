define(['../../../../src/index', './workoutBrowser'], function (tt, workoutBrowser) {

    var module = {

        createTtNode: tt.createTtNodeCreator({
            init: function (params) {
                this.model = params.model;
                this.mode = 'workout-browser';
                tt.initProperty(this, 'mode');
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
                                switch (mode) {
                                    case 'workout-browser':
                                        return [workoutBrowser.createTtNode({ root: root, ui: this })]
                                    case 'workout-execution':
                                        break;
                                }
                            }.bind(this)
                        })];
                    }.bind(this)
                });
            }
        })
    };

    return module;

});
