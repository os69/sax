define(['../../src/index', './TreeNode', '../../controls/tree/tree','../../controls/util'], function (tt, TreeNode, tree, controlsUtil) {

    // create sample tree
    var rootTreeNode = new TreeNode({ label: '1' });
    var treeNode11 = rootTreeNode.createChildNode({ label: '1-1' });
    treeNode11.createChildNode({ label: '1-1-1' });
    treeNode11.createChildNode({ label: '1-1-2' });
    var treeNode12 = rootTreeNode.createChildNode({ label: '1-2' });
    treeNode12.createChildNode({ label: '1-2-1' });
    treeNode12.createChildNode({ label: '1-2-2' });

    var rootContainer = document.getElementById('rootContainer');

    rootContainer.appendChild(controlsUtil.createWidgetTtNode({
        header: 'Tree',
        body: [tt.createTtNode({
            type: 'div',
            css: ['content'],
            children: [tree.createTreeTtNode(rootTreeNode)]
        })]
    }).getDomNode());


});