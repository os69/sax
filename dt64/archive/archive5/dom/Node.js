define(['../core/core', '../core/decorate', '../main/property'], function (core, decorate, property) {

    var Node = function () {
        this.init.apply(this, arguments);
    };

    Node.prototype = {
        init: function (params) {

            this.domNode = document.createElement(params.type);
            this.domNode.__ttNode = this;

            // text
            if (params.text) {
                if (core.isFunction(params.text)) {
                    property.createProperty(this, 'text', params.text);
                } else {
                    this.setText(params.text);
                }
            }

            // value
            if (params.value) {
                if (core.isFunction(params.value)) {
                    property.createProperty(this, 'value', params.value);
                } else {
                    this.setText(params.value);
                }
            }

            // click
            if (params.click) {
                this.domNode.addEventListener('click', params.click);
            }

            // change
            if (params.change) {
                this.domNode.addEventListener('change', params.change);
            }

            // children
            var i;
            this.children = params.children || [];
            for (i = 0; i < this.children.length; ++i) {
                var child = this.children[i];
                this.domNode.appendChild(child.domNode);
            }
            if (!decorate.isDecorated(this.children, 'splice', 'splice-dom')) {
                decorate.decorate(this.children, 'splice', 'splice-dom', null, function () {
                    this.spliceChildren.apply(this, arguments);
                }.bind(this));
            }

            // css
            this.css = params.css || [];
            this.internalCss = this.css.slice();
            for (i = 0; i < this.css.length; ++i) {
                var cssClass = this.css[i];
                this.domNode.classList.add(cssClass);
            }
            if (!decorate.isDecorated(this.css, 'splice', 'splice-dom')) {
                decorate.decorate(this.css, 'splice', 'splice-dom', null, function () {
                    this.spliceCss.apply(this, arguments);
                }.bind(this));
            }

        },
        
        getDomNode: function () {
            return this.domNode;
        },
        setValue: function (value) {
            this.domNode.value = value;
        },
        getValue: function () {
            return this.domNode.value;
        },
        setText: function (text) {
            this.domNode.innerText = text;
        },
        spliceChildren: function () {
            var args = core.argumentsToList(arguments);
            var index = args[0];
            var numDel = args[1];
            var insertNodes = args.slice(2);
            for (var i = 0; i < numDel; ++i) {
                var domChildNode = this.domNode.children[index];
                this.domNode.removeChild(domChildNode);
            }
            for (i = 0; i < insertNodes.length; ++i) {
                var insertNode = insertNodes[i];
                if (index < this.domNode.children.length) {
                    var refNode = this.domNode.children[index];
                    this.domNode.insertBefore(insertNode.domNode, refNode);
                } else {
                    this.domNode.appendChild(insertNode.domNode);
                }
                index += 1;
            }
        },
        spliceCss: function () {
            var args = core.argumentsToList(arguments);
            var index = args[0];
            var numDel = args[1];
            var insertCss = args.slice(2);

            var cssClass;
            for (var i = 0; i < numDel; ++i) {
                cssClass = this.internalCss[index + i];
                this.domNode.classList.remove(cssClass);
            }

            for (i = 0; i < insertCss.length; ++i) {
                cssClass = insertCss[i];
                this.domNode.add(cssClass);
            }

            core.splice(this.internalCss, index, numDel, insertCss);

        }
    }

    return Node;
});