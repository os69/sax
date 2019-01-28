define(['../core/core', '../core/Odb', './State'], function (core, Odb, State) {

    var odb = new Odb();

    var module = {};

    module.createStateGraph = function (model) {
        var stateMap = {};

        var traverse = function (predecessorState, model) {

            var hash = model.hash();
            if (stateMap[hash]) {
                return;
            }

            stateMap[hash] = true;
            var state = new State({ hash: hash });
            if (predecessorState) {
                predecessorState.addSuccessorState(state);
            }

            var actions = model.getActions();
            for (var i = 0; i < actions.length; ++i) {
                var action = actions[i];
                var clonedModel = odb.clone(model);
                var clonedAction = clonedModel.getActions()[i];
                clonedAction.execute();
                traverse(state, clonedModel);
            }

            return state;
        }

        var rootState = traverse(null,model);

    }


    return module;



});