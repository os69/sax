
define([],function(){

    var React = {

        parseArgs: function (args) {
    
            var textChildren = [];
            var nodeChildren = [];
            for (var i = 2; i < args.length; ++i) {
                var arg = args[i];
                if (tt.core.isString(arg)) {
                    if (arg) {
                        textChildren.push(arg)
                    }
                } else {
                    nodeChildren.push(arg);
                }
            }
    
            var children;
            if (nodeChildren.length === 1 && tt.core.isList(nodeChildren[0])) {
                children = nodeChildren[0];
            } else {
                children = nodeChildren;
            }
    
            var props = {
                type: args[0],
                text: textChildren.join(' '),
                children: children
            }
    
            var attributes = args[1];
            if (attributes) {
                if (attributes.type) {
                    throw 'type not allowd in attributes ' + JSON.stringify(attributes)
                }
                if (attributes.text && props.text) {
                    throw 'text not allowed in attributes ' + JSON.stringify(attributes)
                }
                if (attributes.children && props.children) {
                    throw 'children not allowed in attributes ' + JSON.stringify(attributes)
                }
                props = tt.core.extend(props, attributes)
            }
    
            return props;
        },
    
        createElement: function () {
            var options = this.parseArgs(tt.core.argumentsToList(arguments));
            if (tt.core.isFunction(options.type)) {
                return options.type.apply(null, [options]);
            } else {
                return tt.createTtNode(options);
            }
        }
    }

    return React;
    
});
