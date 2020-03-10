define(['../../src/index', '../util'], function (tt, util) {

    var TreeTtNodeRenderer = tt.core.defineClass({

        init: function (treeNode) {
            treeNode.childNodes = treeNode.childNodes || [];
            tt.initList(treeNode.childNodes);
            tt.initProperty(treeNode, 'label');
            this.treeNode = treeNode;
            this.wasExpanded = false;
            this.expanded = false;
            tt.initProperty(this, 'expanded');
            this.containerNode = tt.createTtNode({
                type: 'div',
                css: ['tree-node'],
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
                    var sourceTreeNode = sourceNode.__ttNode.data;
                    this.treeNode.drop && this.treeNode.drop(sourceTreeNode);
                }.bind(this),
                children: [this.createTitleNode()]
            });
        },

        createTitleNode: function () {
            return tt.createTtNode({
                type: 'div',
                css: ['tree-node-header'],
                children: [
                    util.createIconTtNode({
                        click: this.expand.bind(this),
                        icon: function () {
                            if (this.treeNode.childNodes.getLength() === 0) {
                                return ['fa', 'fa-circle', 'fa-xs'];
                            }
                            return this.getExpanded() ? ['fas', 'fa-minus-circle'] : ['fas', 'fa-plus-circle'];
                        }.bind(this)
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['tree-node-header-label'],
                        children: this.treeNode.labelTtNodes
                    })
                ]
            })
        },

        expand: function () {
            if (this.treeNode.childNodes.getLength() === 0) {
                return;
            }
            if (!this.wasExpanded) {
                this.handleFirstExpand();
                return;
            }
            if (this.getExpanded()) {
                this.childrenContainerNode.css.splice(0, 0, 'tree-display-none');
                this.setExpanded(false);
            } else {
                this.childrenContainerNode.css.splice(0, 1);
                this.setExpanded(true);
            }
        },

        handleFirstExpand: function () {
            this.childrenContainerNode = tt.createTtNode({
                type: 'div',
                css: ['tree-node-children'],
                children: tt.createMappedList(this.treeNode.childNodes, createTreeTtNode),
            });
            this.containerNode.children.splice(1, 0, this.childrenContainerNode);
            this.wasExpanded = true;
            this.setExpanded(true);
        },

        render: function () {
            return this.containerNode;
        }

    });

    var createTreeTtNode = tt.createTtNodeCreator(TreeTtNodeRenderer);

    TreeTtNodeRenderer.createTreeTtNode = createTreeTtNode;

    return TreeTtNodeRenderer;

});