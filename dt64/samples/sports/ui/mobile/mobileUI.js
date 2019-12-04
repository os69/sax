define(['../../../../src/index', './workoutBrowser'], function (tt, workoutBrowser) {

    var module = {

        _createTtNode: tt.createTtNodeCreator({
            init: function (params) {
                this.root = params.root;
                this.mode = 'workout-browser';
                tt.initProperty(this, 'mode');
            },
            render: function () {
                return tt.createTtNodeCreator({
                    type: 'div',
                    children: function () {
                        var mode = this.getMode();
                        switch (mode) {
                            case 'workout-browser':
                                return [workoutBrowser.createTtNode({ root: this.root })];
                            case 'workout-execution':
                                return [];
                        }
                    }
                });
            }
        }),

        createTtNode: tt.createTtNodeCreator({
            init: function (params) {
                this.model = params.model;
            },
            render: function () {
                return tt.createTtNode({
                    type: 'div',
                    children: function () {
                        var root = this.model.getRoot();
                        return [workoutBrowser.createTtNode({ root: this.root })];
                    }.bind(this)
                });
            }
        })

    };

    return module;

});
