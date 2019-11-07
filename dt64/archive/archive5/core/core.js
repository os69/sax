
define([], function () {

    var maxId = 0;

    module = {

        extend: function (obj1, obj2) {
            for (var propertyName in obj2) {
                obj1[propertyName] = obj2[propertyName];
            }
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
            for (var i = 0; i < list.length; ++i) {
                var testObj = list[i];
                if (testObj === obj) {
                    list.splice(i, 1);
                    i--;
                    continue;
                }
            }
        },

        splice: function (list, index, numDel, inserts) {
            var args = [];
            args.push(index, numDel);
            if (inserts) {
                args.push.apply(args, inserts);
            }
            list.splice.apply(list, args);
        },

        // ===================================================================
        // object/dictionary helpers
        // ===================================================================
        isEmpty: function (obj) {
            for (var prop in obj) {
                return false;
            }
            return true;
        },

        get: function (dict, key, defaultGenerator) {
            var value = dict[key];
            if (value) {
                return value;
            }
            value = defaultGenerator();
            dict[key] = value;
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
        }
    };


    return module;

});


