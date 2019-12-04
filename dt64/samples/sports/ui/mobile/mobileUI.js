define(['../../../../src/index', './workoutBrowser'], function (tt, workoutBrowser) {

    return {
        createTtNode: tt.createTtNodeCreator({
            init: function (model) {
                this.model = model;
                this.mode = 'workout-browser';
                tt.initProperty(this,'mode');
            },
            render: function () {
                return tt.createTtNode({
                    type: 'div',
                    children: function () {
                        var root = this.model.getRoot();
                        var mode = this.getMode();
                        return [workoutBrowser.createTtNode({ root: root, ui: this })];
                    }.bind(this)
                });
            }
        })
    };

});
