define(['../../main'], function (tt) {

    var TreeNode = tt.core.defineClass({

        init: function (params) {
            this.label = params.label;
            this.parentNode = null;
            this.childNodes = [];
        },

        getLabel: function () {
            return this.label;
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
        }

    });

    return TreeNode;

});