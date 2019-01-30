define(['../core/core', '../core/Odb', '../core/graph', './StateFactory'], function (core, Odb, graph, StateFactory) {

    var stateId = 0;
    var odb = new Odb();

    var module = {};

    module.createStateGraph = function (model) {

        var stateFactory = new StateFactory();
        var stateMap = {};

        var createState = function (properties) {

            var hash = properties.model.hash();
            var state = stateMap[hash];
            var exists = !!state;
            if (!state) {
                state = stateFactory.create({ hash: hash });
                stateMap[hash] = state;
            }

            if (properties.predecessorState) {
                properties.predecessorState.addAction({
                    id: properties.actionId,
                    description: properties.actionDescription,
                    targetState: state
                });
            }

            if (exists) {
                return state;
            }

            var actions = properties.model.getActions();
            for (var i = 0; i < actions.length; ++i) {
                var action = actions[i];
                var clonedModel = odb.clone(properties.model);
                var clonedAction = clonedModel.getActions()[i];
                clonedAction.execute();
                createState({
                    predecessorState: state,
                    actionId: i,
                    actionDescription: action.title,
                    model: clonedModel
                });
            }

            return state;
        }

        var rootState = createState({ model: model });
        module.showStates(rootState);

    };

    module.showStates = function (rootState) {

        var nodeMap = {};

        var createNode = function (predecessorNode, linkDescription, state) {

            var node = nodeMap[state.id];
            var exists = !!node;
            if (!node) {
                var node = stateGraph.createNode(state.id, state.hash);
                nodeMap[node.id] = node;
            }
            if (predecessorNode) {
                stateGraph.createLink(predecessorNode, node, linkDescription);
            }
            if (exists) {
                return node;
            }
            for (var i = 0; i < state.actions.length; ++i) {
                var action = state.actions[i];
                createNode(node, action.description, action.targetState);
            }
            return node;
        };

        var stateGraph = new graph.Graph();
        createNode(null, null, rootState);

        var domNode = document.createElement('div');
        document.body.appendChild(domNode);
        new graph.VizGraphViewer(stateGraph, domNode);
    };

    return module;



});