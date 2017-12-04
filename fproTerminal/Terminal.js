define(['./core'], function (core) {

    return core.defineClass({
        _init: function (properties) {
            core.extend(this, properties);
            var history = new Josh.History({ key: 'history' });
            this.shell = Josh.Shell({
                history: history,
                shell_view_id: properties.shell_view_id,
                shell_panel_id: properties.shell_panel_id
            });
            this.shell.onNewPrompt(function (callback) {
                callback(properties.prompt);
            });
            this.shell.setCommandHandler("_default", {
                exec: function (cmd, callback) {
                    properties.execute.apply(this, [cmd]).then(function (result) {
                        callback(result);
                    });
                }.bind(this),
                completion: function (cmd, arg, line, callback) {
                    properties.completion.apply(this, [line]).then(function (result) {
                        callback(result);
                    });
                }.bind(this)
            });
            document.getElementById(properties.shell_panel_id).addEventListener('paste', function (event) {
                this.shell.addText(event.clipboardData.getData('text'));
            }.bind(this));
            this.shell.activate();
        }
    });


});

