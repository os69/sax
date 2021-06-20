import { ttdom as tt } from '../../src/dom/ttdom';
import { React } from '../../src/dom/react';

var node1 = tt.createTtNode({
    type: 'h1',
    text: 'Hello World!'
});

var Klapper = function (props) {
    var model = {
        style: '',
        toggle: function () {
            if (this.style === '') {
                this.setStyle('display:none');
            } else {
                this.setStyle('');
            }
        }
    };
    tt.initProperty(model, 'style');
    return <div>
        <span click={() => model.toggle()}>toggle</span>
        <div style={() => model.getStyle()}>
            {props.children}
        </div>
    </div>
}

var Title = function (props) {
    return { title: props.text };
}

var TreeUiNode = function (props) {
    return <div>
        <span>{props.treeNode.label}</span>
        <Klapper>
            {tt.createMappedList(props.treeNode.children, childTreeNode => <TreeUiNode treeNode={childTreeNode} />)}
        </Klapper>
    </div>;
}

var Tree = function (props) {
    var treeNode = props.children[0];
    return <TreeUiNode treeNode={treeNode} />;
}

var TreeNode = function (props) {
    return {
        label: props.label,
        children: props.children
    };
}

var test = <Title>Hi!</Title>;
console.log(test);

var node2 = <h1>Hello World JSX!</h1>;

document.body.appendChild(node1.getDomNode());
document.body.appendChild(node2.getDomNode());

var treeNode =
    <TreeNode label="1">
        <TreeNode label="1-1" />
        <TreeNode label="1-2" />
    </TreeNode>;

var tree = <Tree>{[treeNode]}</Tree>

document.body.appendChild(tree.getDomNode());
