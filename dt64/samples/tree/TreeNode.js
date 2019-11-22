define(['../../src/index', '../../controls/util'], function (tt, controlsUtil) {

    var TreeNode = tt.core.defineClass({

        init: function (params) {
            this.label = params.label;
            this.parentNode = null;
            this.childNodes = [];
            this.labelTtNode = null;
            this.createLabelTtNodes();
        },

        createLabelTtNodes: function () {
            this.labelTtNodes = [
                tt.createTtNode({
                    type: 'input',
                    value: function () { return this.getLabel(); }.bind(this),
                    css: ['sample-tree-node-input'],
                    change: function (event) {
                        this.setLabel(event.srcElement.value);
                    }.bind(this)
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        this.createChildNode({ label: 'new' })

                    }.bind(this),
                    icon: ['fas', 'fa-plus-square']
                }),
                controlsUtil.createIconTtNode({
                    click: function () {
                        this.delete();
                    }.bind(this),
                    icon: ['fas', 'fa-trash-alt']
                })];
        },

        getLabel: function () {
            return this.label;
        },

        setLabel: function (label) {
            this.label = label;
        },

        createChildNode: function (params) {
            var childNode = new TreeNode(params);
            childNode.parentNode = this;
            this.childNodes.push(childNode);
            return childNode;
        },

        appendChildNode: function (node) {
            var oldParentNode = node.parentNode;
            tt.core.removeObject(oldParentNode.childNodes, node);
            this.childNodes.push(node);
            node.parentNode = this;
        },

        delete: function () {
            tt.core.removeObject(this.parentNode.childNodes, this);
        },

        drop: function(droppedTreeNode){
            this.appendChildNode(droppedTreeNode);
        }

    });

    return TreeNode;

});