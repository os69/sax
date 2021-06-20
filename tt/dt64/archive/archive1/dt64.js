(function () {

    // =======================================================================
    // util 
    // =======================================================================

    var maxId = 0;
    var generateId = function () {
        return '#' + (++maxId);
    };

    var extend = function (obj1, obj2) {
        for (var propery in obj2) {
            obj1[propery] = obj2[property]; I
        }
        return obj1;
    }

    // =======================================================================
    // props 
    // =======================================================================

    var Props = function () {
        this.init.apply(this, arguments);
    };

    Props.prototype = {
        init: function () {
            this, id = generateId();
        }
    };

    // =======================================================================
    // get watcher
    // =======================================================================

    var GetWatcher = function () {
        this.init.apply(this, arguments);
    };

    GetWatcher.prototype = {
        init: function () {
            this.id = generateId();
            this.objectMap = {};
        },
        addProperty: function (obj, property) {
            var propertyMap = this.objectMap[_dt64.getProps(obj).id];
            if (!propertyMap) {
                propertyMap = {};
                this.objectMap[_dt64.getProps(obj).id] = propertyMap;
            }
            var _property = propertyMap[property];
            if (!_property) {
                propertyMap[property] = true;
            }
        }
    };

    var dt64 = {};

    // =======================================================================
    // dt64: get watcher
    // =======================================================================
    extend(dt64, {

        getWatchers: {},

        addGetWatcher: function (getWatcher) {
            this.getWatchers[getWatcher.id] = getWatcher;
        },

        removeGetWatcher: function (getWatcher) {
            delete this.getWatchers[getWatcher.id];
        }

    });

    // =======================================================================
    // dt64: props
    // =======================================================================

    extend(dt64, {

        propsName: '__dt64',

        initProps: function (obj) {
            if (obj[this.propsName]) {
                return;
            }
            obj[this.propsName] = new Props();
        },

        getProps: function (obj) {
            return obj[this.propsName];
        }

    });

    // =======================================================================
    // dt64: decorate functions
    // =======================================================================

    extend(dt64, {

        decorate: function (obj, type, property) {
            this.generateMethod(obj, type, property);
            this.generateDecorator(obj, type, property);
        },

        methodName: function (prefix, property) {
            return prefix + property[0].toUpperCase() + property.slice(1);
        },

        generateDecorator: function (obj, type, property) {
            var methodName = this.methodName(type, property);
            var method = obj[methodName];
            if (method && method.dt64Decorator) {
                return;
            }
            switch (type) {
                case 'set':
                    this.generateDecoratorSet(obj, type, property);
                    break;
                case 'get':
                    this, this.generateDecoratorGet(obj, type, property);
                    break;
                default:
                    throw 'unknown method ' + type;
            }
        },

        generateDecorator_: function(obj,methodName, ){            
            var method = obj[methodName];
            obj[methodName] = function () {
                return method.apply(this, arguments);
            }            
        },

        generateDecoratorSet: function (obj, type, property) {
            var methodName = this.methodName(type, property);
            var method = obj[methodName];
            obj[methodName] = function () {
                return method.apply(this, arguments);
            }
        },

        generateDecoratorGet: function (obj, type, property) {
            var methodName = this.methodName(type, property);
            var method = obj[methodName];
            obj[methodName] = function () {
                for (var getWatcherId in _dt64.getWatchers) {
                    var getWatcher = _dt64.getWatchers[getWatcherId];
                    getWatcher.addProperty(obj, property);
                }
                return method.apply(this, arguments);
            }
        },

        generateMethod: function (obj, type, property) {
            var methodName = this.methodName(type, property);
            var method = obj[methodName];
            if (method) {
                return;
            }
            switch (type) {
                case 'set':
                    method = this.generateMethodSet(property);
                    break;
                case 'get':
                    method = this.generateMethodGet(property);
                    break;
                default:
                    throw 'unknown method ' + method;
            }
            obj[methodName] = method;
        },

        generateMethodSet: function (property) {
            return function (value) {
                this[property] = value;
            }
        },

        generateMethodGet: function (property) {
            return function () {
                return this[property];
            }
        }

    });

    // =======================================================================
    // dt64: public interface 
    // =======================================================================

    extend(dt64, {

        get: function (obj, property) {
            this.decorate(obj, 'get', property);
            return obj[this.methodName('get', property)].apply(obj, []);
        },

        property: function (obj, property, calculationFunction) {
            this.decorate(obj, 'set', property);

            var getWatcher = new GetWatcher();
            this.addGetWatcher(getWatcher);
            var value = calculationFunction();
            this.removeGetWatcher(getWatcher);

            obj[this.methodName('set', property)].apply(obj, [value]);
        }

    });

    // =======================================================================
    // main
    // =======================================================================

    var book1 = {
        title: 'title1',
        pages: 224
    };

    var book2 = {
        title: 'title2',
        pages: 231
    };

    var model = {
        books: [book1, book2]
    };

    ui = {};

    dt64.property(ui, 'totalPages', function () {
        return dt64.get(book1, 'pages');
    });


})();