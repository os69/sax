define(['../core/core', '../core/event', '../tt/property/index', '../tt/list/index', '../tt/util'], function (core, event, property, list, util) {

    var TtNode = function () {
        this.init.apply(this, arguments);
    };

    TtNode.prototype = {

        init: function (params) {

            // create dom node
            this.domNode = document.createElement(params.type);
            this.domNode.__ttNode = this;

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
                    case 'drag':
                    case 'dragstart':
                    case 'dragover':
                    case 'dragenter':
                    case 'dragleave':
                    case 'dragend':
                    case 'drop':
                    case 'input':
                    case 'blur':
                        this.setupEventHandler(propertyName, propertyValue);
                        break;
                    default:
                        this.setupAttribute(propertyName, propertyValue);
                }
            }

        },

        delete: function () {
            this.domNode.parentNode.removeChild(this.domNode);
            if (this.children) {
                for (var i = 0; i < this.children.length; ++i) {
                    var child = this.children[i];
                    child.delete();
                }
            }
            event.delete(this);
        },

        getDomNode: function () {
            return this.domNode;
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
                default:
                    // call setter
                    var methodName = util.methodName('set', name);
                    this[methodName].apply(this, [value]);
                    break;
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
                if (value != this.domNode.innerText) {
                    this.domNode.innerText = value;
                }
                return;
            }
            if (name === 'value' && this.domNode.tagName === 'INPUT') {
                if (this.domNode.value != value) {
                    this.domNode.value = value;
                }
                return;
            }
            if (name === '_type') {
                name = 'type';
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
            while (this.domNode.firstElementChild) {
                var domChildNode = this.domNode.firstElementChild;
                domChildNode.__ttNode.delete();
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

        spliceChildren: function (signal, spliceArgs) {
            if (this.initChildren) {
                return;
            }
            var index = spliceArgs[0];
            var numDel = spliceArgs[1];
            var insertNodes = spliceArgs.slice(2);
            for (var i = 0; i < numDel; ++i) {
                var domChildNode = this.domNode.children[index];
                domChildNode.__ttNode.delete();
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

    return TtNode;
});