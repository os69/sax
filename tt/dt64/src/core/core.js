
define([], function () {

    var maxId = 0;

    var module = {

        // =========================================================================   
        // define class
        // =========================================================================

        object: function (prototype) {
            return Object.create(prototype);
        },

        _generateConstructorFunction: function () {
            var ConstructorFunction = null;
            ConstructorFunction = function () {
                if (!(this instanceof ConstructorFunction)) {
                    return new ConstructorFunction("blub", arguments);
                }
                if (this.init) {
                    if (arguments.length == 2 && arguments[0] === "blub") {
                        this.init.apply(this, arguments[1]);
                    } else {
                        this.init.apply(this, arguments);
                    }
                }
            };
            ConstructorFunction.derive = function (prototype) {
                return module.defineDerivedClass(this, prototype);
            };
            return ConstructorFunction;
        },

        defineClass: function (prototype) {
            var Cls = module._generateConstructorFunction();
            Cls.prototype = prototype;
            Cls.prototype.constructor = Cls;
            return Cls;
        },

        defineDerivedClass: function (parentClass, prototype) {
            var Cls = module._generateConstructorFunction();
            Cls.prototype = module.extend(module.object(parentClass.prototype), prototype);
            Cls.prototype.constructor = Cls;
            return Cls;
        },

        // ===================================================================
        // type helpers
        // ===================================================================

        getType: function (obj) {
            if (typeof (obj) === 'function') return 'function';
            if (typeof (obj) === 'string') return 'simple';
            if (typeof (obj) === 'number') return 'simple';
            if (typeof (obj) === 'boolean') return 'simple';
            if (typeof (obj) === 'object') {
                if (Object.prototype.toString.call(obj) === '[object Array]') return 'list';
                return 'object';
            }
            throw "Not supported type:" + typeof (obj);
        },

        isList: function (obj) {
            return this.getType(obj) === 'list';
        },

        isObject: function (obj) {
            return this.getType(obj) === 'object';
        },

        isFunction: function (obj) {
            return this.getType(obj) === 'function';
        },

        isString: function (obj) {
            return typeof obj === 'string';
        },

        // ===================================================================
        // list helpers
        // ===================================================================

        hasObject: function (list, obj) {
            for (var i = 0; i < list.length; ++i) {
                var testObj = list[i];
                if (testObj === obj) {
                    return true;
                }
            }
            return false;
        },

        removeObject: function (list, obj) {
            var numDel = 0;
            for (var i = 0; i < list.length; ++i) {
                var testObj = list[i];
                if (testObj === obj) {
                    numDel++;
                    list.splice(i, 1);
                    i--;
                    continue;
                }
            }
            return numDel;
        },

        splice: function (list, index, numDel, inserts) {
            var args = [];
            args.push(index, numDel);
            if (inserts) {
                args.push.apply(args, inserts);
            }
            list.splice.apply(list, args);
        },

        removeAll: function (list) {
            module.splice(list, 0, list.length);
        },

        // ===================================================================
        // object helpers
        // ===================================================================

        extend: function (obj1, obj2) {
            for (var propertyName in obj2) {
                obj1[propertyName] = obj2[propertyName];
            }
            return obj1;
        },

        cloneExtend: function (obj1, obj2) {
            var clone = this.extend({}, obj1);
            return this.extend(clone, obj2);
        },

        isEmpty: function (obj) {
            for (var prop in obj) {
                return false;
            }
            return true;
        },

        get: function (obj, key, defaultGenerator) {
            var value = obj[key];
            if (value) {
                return value;
            }
            value = defaultGenerator();
            obj[key] = value;
            return value;
        },

        defaultList: function () {
            return [];
        },

        defaultObject: function () {
            return {};
        },

        // ===================================================================
        // id generation
        // ===================================================================

        generateId: function () {
            return '#' + (++maxId);
        },

        argumentsToList: function (args) {
            return Array.prototype.slice.call(args);
        },

        // ===================================================================
        // others
        // ===================================================================

        remToPixels: function (rem) {
            return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }
    };

    return module;

});


