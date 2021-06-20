import { React } from "../../src/dom/react";
import { tt } from "../../src/tt/tt";

export var TreeNodeLabel = function (props) {
    return props.children;
}

export var TreeNodeChildren = function (props) {
    return props.children;
}

export var TreeNode = function (props) {
    return { label: props.children[0], children: props.children[1], drop: props.drop };
}

var TreeViewerNode = function (props) {

    var dragstart = function (event) {
        event.stopPropagation();
        event.dataTransfer.effectAllowed = 'copyMove';
        event.dataTransfer.setData('text/plain', event.target.id);
    };

    var dragover = function (event) {
        event.preventDefault();
    };

    var dragenter = function (event) {
        return false;
    };

    var dragleave = function (event) {
        return false;
    };

    var drop = function (event) {
        event.preventDefault();
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        var sourceId = event.dataTransfer.getData('text/plain');
        var sourceNode = document.getElementById(sourceId);
        var sourceTreeNode = sourceNode.__ttNode.data;
        props.treeNode.drop && props.treeNode.drop(sourceTreeNode, event);
    };

    return <div draggable="true" data={props.treeNode} id={tt.core.generateId()} dragstart={dragstart} dragover={dragover} dragenter={dragenter} dragleave={dragleave} drop={drop}>
        <div>{props.treeNode.label}</div>
        <ul>
            {tt.createMappedList(props.treeNode.children, childTreeNode =>
                <li><TreeViewerNode treeNode={childTreeNode} /></li>)}
        </ul>
    </div>;

}

export var TreeView = function (props) {
    var treeNode = props.children[0];
    return <TreeViewerNode treeNode={treeNode}></TreeViewerNode>;
}
