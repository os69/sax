define(['../../src/index'], function (tt) {

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

    var items = [{ label: 'Pos1', subItems: [{ label: '1-1' }, { label: '1-2' }] }, { label: 'Pos2', subItems: [{ label: '2-1' }, { label: '2-2' }] }];

    var SubItemNode = function (props) {
        return <li>{props.subItem.label}</li>;
    }

    var ItemNode = function (props) {
        return <li>
            <span>{props.item.label}</span>
            <ul>{tt.createMappedList(props.item.subItems, subItem => <SubItemNode subItem={subItem} />)}</ul>
        </li>;
    }

    var node =
        <ul>
            {tt.createMappedList(items, item => <ItemNode item={item} />)}
        </ul>;
    document.body.appendChild(node.getDomNode());

    items.push({ label: '3', subItems:[] });

});
