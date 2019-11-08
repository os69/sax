define(['../core/core', '../core/event', '../tt/property/mainProperty', '../tt/list/mainList', '../tt/util', '../tt/property/PropertyCollector'], function (core, event, property, list, util, PropertyCollector) {

    var Node = function () {
        this.init.apply(this, arguments);
    };

    Node.prototype = {

        init: function (params) {

            // create dom node
            this.domNode = document.createElement(params.type);
            this.domNode.__node = this;

            // defaults
            params.css = params.css || [];
            params.children = params.children || [];

            // parse properties
            for (var propertyName in params) {
                var propertyValue = params[propertyName];
                switch (propertyName) {
                    case 'type':
                        break;
                    case 'data':
                        this.data = propertyValue;
                        break;
                    case 'click':
                    case 'change':
                    case 'dragstart':
                    case 'dragover':
                    case 'drop':
                        this.setupEventHandler(propertyName, propertyValue);
                        break;
                    default:
                        this.setupAttribute(propertyName, propertyValue);
                }
            }

        },

        delete: function () {
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i];
                child.delete();
            }
            event.delete(this);
        },

        setupAttribute: function (name, value) {

            if (!value) {
                return;
            }

            this.generateSetter(name);

            switch (core.getType(value)) {
                case 'function':
                    // generate setter
                    var calc = value;
                    // create calculated attribute
                    property.createCalculatedProperty(this, name, calc);
                    // subscribe
                    event.addEventHandler(this, util.methodName('set', name), this, this.dummy);
                    break;
                case 'simple':
                    // call setter
                    var methodName = util.methodName('set', name);
                    this[methodName].apply(this, [value]);
                    break;
                default:
                    throw 'illegal argument';
            }

        },

        generateSetter: function (name) {
            var methodName = util.methodName('set', name);
            if (this[methodName]) {
                return;
            }
            this[methodName] = function (value) {
                this.setDomAttribute(name, value);
            }
        },

        dummy: function () {

        },

        setDomAttribute: function (name, value) {
            if (name === 'text') {
                this.domNode.innerText = value;
                return;
            }
            this.domNode.setAttribute(name, value);
        },

        setupEventHandler: function (event, handler) {
            this.domNode.addEventListener(event, handler);
        },

        setChildren: function (children) {
            if (this.children) {
                event.removeEventHandler(this.children, 'splice', this, this.spliceChildren);
            }
            this.children = children;
            list.initList(this.children);
            this.initChildren = true;
            event.addEventHandler(this.children, 'splice', this, this.spliceChildren);
            this.initChildren = false;
            while (this.domNode.firstChild) {
                this.domNode.removeChild(this.domNode.firstChild);
            }
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i];
                this.domNode.appendChild(child.getDomNode());
            }
        },

        setCss: function (css) {
            if (this.css) {
                event.removeEventHandler(this.css, 'splice', this, this.spliceCss);
            }
            this.css = css;
            this.internalCss = this.css.slice();
            list.initList(this.css);
            this.initCss = true;
            event.addEventHandler(this.css, 'splice', this, this.spliceCss);
            this.initCss = false;
            this.domNode.className = '';
            for (i = 0; i < this.css.length; ++i) {
                var cssClass = this.css[i];
                this.domNode.classList.add(cssClass);
            }
        },

        getDomNode: function () {
            return this.domNode;
        },

        spliceChildren: function (signal, spliceArgs) {
            if (this.initChildren) {
                return;
            }
            var index = spliceArgs[0];
            var numDel = spliceArgs[1];
            var insertNodes = spliceArgs.slice(2);
            for (var i = 0; i < numDel; ++i) {
                var domChildNode = this.domNode.children[index];
                this.domNode.removeChild(domChildNode);
                domChildNode.__node.delete();
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

        spliceCss: function (signal, spliceArgs) {
            if (this.initCss) {
                return;
            }
            var index = spliceArgs[0];
            var numDel = spliceArgs[1]
            var insertCss = spliceArgs.slice(2);
            var cssClass;
            for (var i = 0; i < numDel; ++i) {
                cssClass = this.internalCss[index + i];
                this.domNode.classList.remove(cssClass);
            }

            for (i = 0; i < insertCss.length; ++i) {
                cssClass = insertCss[i];
                this.domNode.classList.add(cssClass);
            }
            core.splice(this.internalCss, index, numDel, insertCss);
        }
    }

    return Node;
});