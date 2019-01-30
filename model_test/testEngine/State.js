define(['../core/core'], function (core) {

    return core.defineClass({
        init: function (properties) {
            this.id = properties.id;
            this.hash = properties.hash;
            this.actions = [];
        },
        addAction: function (properties) {
            this.actions.push({
                id: properties.id,
                description: properties.description,
                targetState: properties.targetState
            });
        }
    });

});