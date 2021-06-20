
import { React } from "../../src/dom/react";
import { TreeView, TreeNode, TreeNodeLabel, TreeNodeChildren } from "../tree/tree";
import { tt } from "../../src/tt/tt";

var node =
    <TreeView>
        <TreeNode>
            <TreeNodeLabel>
                <b>T</b>est
            </TreeNodeLabel>
            <TreeNodeChildren>
                <TreeNode>
                    <TreeNodeLabel>1</TreeNodeLabel>
                </TreeNode>
                <TreeNode drop={source => console.log(source)}>
                    <TreeNodeLabel>2</TreeNodeLabel>
                </TreeNode>
            </TreeNodeChildren>
        </TreeNode>
    </TreeView>;

document.body.appendChild(node.getDomNode());
