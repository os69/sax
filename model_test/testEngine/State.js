define(['../core/core'], function (core) {

    return core.defineClass({
        init: function (properties) {
            this.hash =  properties.hash;
            this.successorStates = [];
        },
        addSuccessorState: function (state) {
            this.successorStates.push(state);
        }
    });

});