import { ttdom as tt } from './ttdom';

export var React = {

    parseArgs: function (args) {

        //var textChildren = [];
        var nodeChildren = [];
        for (var i = 2; i < args.length; ++i) {
            var arg = args[i];
            /*if (tt.core.isString(arg)) {
                if (arg) {
                    textChildren.push(arg)
                }
            }*/
            nodeChildren.push(arg);
        }

        /*var children;
        if (nodeChildren.length === 1 && tt.core.isList(nodeChildren[0])) {
            children = nodeChildren[0];
        } else {
            children = nodeChildren;
        }*/
        var children = nodeChildren;

        var props = {
            type: args[0],
            children: children
        }

        var attributes = args[1];
        if (attributes) {
            if (attributes.type) {
                throw 'type not allowd in attributes ' + JSON.stringify(attributes)
            }
            /*if (attributes.text && props.text) {
                throw 'text not allowed in attributes ' + JSON.stringify(attributes)
            }*/
            if (attributes.children && props.children) {
                throw 'children not allowed in attributes ' + JSON.stringify(attributes)
            }
            props = tt.core.extend(props, attributes)
        }

        return props;
    },

    createTtNode: function (options) {
        var normalize = function (children) {
            for (var i = 0; i < children.length; ++i) {
                var child = children[i];
                if (tt.core.isString(child) || tt.core.isFunction(child)) {
                    var spanNode = tt.createTtNode({ type: 'span', text: child });
                    children.splice(i, 1, spanNode);
                }
            }
        }
        if (options.children && options.children.length === 2 && options.children[0] === '...') {
            options.children = options.children[1];
        } else {
            normalize(options.children);
        }
        return tt.createTtNode(options);
    },

    createElement: function () {
        var options = this.parseArgs(tt.core.argumentsToList(arguments));
        if (tt.core.isFunction(options.type)) {
            return options.type.apply(null, [options]);
        } else {
            return this.createTtNode(options);
        }
    }
}

export var printNode = function (node) {
    document.body.append(node.getDomNode());
    return node.getDomNode();
}
