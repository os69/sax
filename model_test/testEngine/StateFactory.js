define(['../core/core', './State'], function (core, State) {

    return core.defineClass({
        init: function () {
            this.maxId = 0;
        },
        create: function (properties) {
            properties.id = 's' + (++this.maxId);
            return new State(properties);
        }
    });

});