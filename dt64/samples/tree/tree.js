define(['../../main', './TreeNode'], function (tt, TreeNode) {


    var render = function (rendererCls) {
        return function (params) {
            var renderer = new rendererCls(params);
            return renderer.render();
        }
    };

    var TreeNodeRenderer = tt.core.defineClass({

        init: function (treeNode) {
            tt.initList(treeNode.childNodes);
            this.treeNode = treeNode;
            this.wasExpanded = false;
            this.expanded = false;
            this.containerNode = tt.createNode({
                type: 'li',
                data: treeNode,
                draggable: 'true',
                id: tt.core.generateId(),
                dragstart: function (event) {
                    event.dataTransfer.effectAllowed = 'copyMove';
                    event.dataTransfer.setData('text/plain', event.target.id);
                },
                dragover: function (event) {
                    event.preventDefault();
                },
                drop: function (event) {
                    event.preventDefault();
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    var sourceId = event.dataTransfer.getData('text/plain');
                    var sourceNode = document.getElementById(sourceId);
                    var sourceTreeNode = sourceNode.__node.data;
                    treeNode.appendChildNode(sourceTreeNode);
                },
                children: [this.createTitleNode()]
            });
        },

        createTitleNode: function () {
            return tt.createNode({
                type: 'span',
                children: [
                    tt.createNode({
                        type: 'span',
                        text: { obj: this.treeNode, propertyName: 'label' },
                        click: this.expand.bind(this)
                    }),
                    tt.createNode({
                        type: 'span',
                        text: ':'
                    }),
                    tt.createNode({
                        type: 'span',
                        text: { obj: this.treeNode.childNodes, propertyName: 'length' }
                    })]
            })
        },

        expand: function () {
            if (!this.wasExpanded) {
                this.handleFirstExpand();
                return;
            }
            if (this.expanded) {
                this.childrenContainerNode.css.splice(0, 0, 'displayNone');
                this.expanded = false;
            } else {
                this.childrenContainerNode.css.splice(0, 1);
                this.expanded = true;
            }
        },

        handleFirstExpand: function () {
            this.childrenContainerNode = tt.createNode({
                type: 'ul',
                children: tt.createMappedList(this.treeNode.childNodes, render(TreeNodeRenderer))
            });
            this.containerNode.children.splice(1, 0, this.childrenContainerNode);
            this.wasExpanded = true;
            this.expanded = true;
        },

        render: function () {
            return this.containerNode;
        }

    });


    var rootTreeNode = new TreeNode({ label: '1' });
    var treeNode11 = rootTreeNode.createChildNode({ label: '1-1' });
    treeNode11.createChildNode({ label: '1-1-1' });
    treeNode11.createChildNode({ label: '1-1-2' });
    var treeNode12 = rootTreeNode.createChildNode({ label: '1-2' });
    treeNode12.createChildNode({ label: '1-2-1' });
    treeNode12.createChildNode({ label: '1-2-2' });

    document.body.appendChild(render(TreeNodeRenderer)(rootTreeNode).getDomNode());
    document.body.appendChild(render(TreeNodeRenderer)(rootTreeNode).getDomNode());

});