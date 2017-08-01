/* global YAML, document*/
(function (global) {

    "use strict";

    // =========================================================================	
    // packages test2
    // =========================================================================

    global.sina.doc = {};
    var core = global.sina.core;
    var ajax = global.sina.ajax;
    var module = global.sina.doc;

    var Element = core.defineClass({
        init: function (options) {
            this.name = options.name;
            this.root = options.root;
            this.root.put(this);
        },
        createElement: function (type, classes, text) {
            var divNode = document.createElement(type);
            if (classes) {
                for (var i = 0; i < classes.length; ++i) {
                    var clazz = classes[i];
                    divNode.classList.add(clazz);
                }
            }
            if (text) {
                var textNode = document.createTextNode(text);
                divNode.appendChild(textNode);
            }
            return divNode;
        },
        parse: function (node) {
            this.name = node.name;
            if (!this.meta.children) {
                return;
            }
            for (var i = 0; i < this.meta.children.length; ++i) {
                var childProperty = this.meta.children[i];
                this.parseChildProperty(node, childProperty);
            }
        },
        parseChildProperty: function (node, childProperty) {
            var tagName, childNode, child;
            if (childProperty.multiple) {
                tagName = childProperty.tagPlural || childProperty.type.prototype.meta.tagPlural;
                var childNodes = node[tagName];
                this[childProperty.property] = [];
                if (!childNodes) {
                    return;
                }
                for (var i = 0; i < childNodes.length; ++i) {
                    childNode = childNodes[i];
                    child = new childProperty.type({
                        root: this.root,
                        name: childNode.name
                    });
                    child.parse(childNode);
                    this[childProperty.property].push(child);
                }
            } else {
                tagName = childProperty.tag || childProperty.type.prototype.meta.tag;
                childNode = node[tagName];
                if (!childNode) {
                    return;
                }
                child = new childProperty.type({
                    root: this.root,
                    name: childNode.name
                });
                child.parse(childNode);
                this[childProperty.property] = child;
            }
        }
    });

    var Parameter = Element.derive({
        meta: {
            tag: 'parameter',
            tagPlural: 'params',
            children: [{
                type: Class,
                property: 'type',
                tag: 'type'
            }]
        },
        render: function (parentNode) {

            var containerNode = this.createElement('div', ['parameter']);
            parentNode.appendChild(containerNode);

            var headerNode = this.createElement('div', ['parameter-header'], 'Parameter ' + this.name);
            containerNode.appendChild(headerNode);

        }
    });

    var Method = Element.derive({
        meta: {
            tag: 'method',
            tagPlural: 'methods',
            children: [{
                type: Parameter,
                property: 'parameters',
                multiple: true
            }]
        },
        render: function (parentNode) {

            var containerNode = this.createElement('div', ['method']);
            parentNode.appendChild(containerNode);

            var headerNode = this.createElement('div', ['method-header'], 'Method ' + this.name);
            containerNode.appendChild(headerNode);

            for (var i = 0; i < this.parameters.length; ++i) {
                var parameter = this.parameters[i];
                parameter.render(containerNode);
            }

        }
    });

    var Class = Element.derive({
        meta: {
            tag: 'class',
            tagPlural: 'classes',
            children: [{
                type: Method,
                property: 'methods',
                multiple: true
            }]
        },
        render: function (parentNode) {

            var containerNode = this.createElement('div', ['class']);
            parentNode.appendChild(containerNode);

            var headerNode = this.createElement('div', ['class-header'], 'Class ' + this.name);
            containerNode.appendChild(headerNode);

            for (var i = 0; i < this.methods.length; ++i) {
                var method = this.methods[i];
                method.render(containerNode);
            }
        }
    });

    Parameter.prototype.meta.children[0].type = Class;

    var Documentation = Element.derive({
        meta: {
            children: [{
                type: Class,
                property: 'classes',
                multiple: true
            }]
        },
        init: function () {
            this.map = {};
            this.name = 'root';
            Element.prototype.init.apply(this, [{
                root: this,
                name: this.name
            }]);
        },
        put: function (obj) {
            if (this.map[obj.name]) {
                throw 'duplicate key' + obj.name;
            }
            this.map[obj.name] = obj;
        },
        get: function (name) {
            return this.map[name];
        },
        render: function (parentNode) {
            for (var i = 0; i < this.classes.length; ++i) {
                var clazz = this.classes[i];
                clazz.render(parentNode);
            }
        }
    });

    ajax.get('spec/sina.yaml', function (err, data) {
        var node = YAML.parse(data);
        var documentation = new Documentation();
        documentation.parse(node);
        documentation.render(document.body);
    });


})(this);