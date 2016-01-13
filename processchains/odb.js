/* global window,  console */
(function() {

    // =========================================================================
    // import other modules + define own module
    // =========================================================================
    var core = window.pc.core;
    var module = window.pc.odb = {};

    // =========================================================================
    // object database
    // =========================================================================    
    module.ODB = core.defineClass({

        init: function(json) {
            this.objectMap = {};
            this.serializedObjectMap = {};
            this.maxId = 0;
            if (json) {
                this.fromJson(json);
            }
        },

        generateId: function() {
            return ++this.maxId;
        },

        getType: function(obj) {
            if (typeof(obj) === 'string') return 'simple';
            if (typeof(obj) === 'number') return 'simple';
            if (typeof(obj) === 'boolean') return 'simple';
            if (typeof(obj) === 'object') {
                if (Object.prototype.toString.call(obj) === '[object Array]') return 'list';
                return 'object';
            }
            throw "Not supported type:" + typeof(obj);
        },

        put: function(obj, processingMap) {

            // already processed?
            obj.id = obj.id || this.generateId();
            processingMap = processingMap || {};
            if (processingMap[obj.id]) {
                return;
            }
            processingMap[obj.id] = true;

            // update object in maps
            this.objectMap[obj.id] = obj;
            var serializedObject = {
                type: obj.type || this.getType(obj)
            };
            this.serializedObjectMap[obj.id] = serializedObject;

            // process properties of object
            for (var property in obj) {
                if (!obj.hasOwnProperty(property)) {
                    continue;
                }
                var value = obj[property];
                switch (this.getType(value)) {
                    case 'simple':
                        serializedObject[property] = value;
                        break;
                    case 'object':
                    case 'list':
                        this.put(value, processingMap);
                        serializedObject[property] = '#' + value.id;
                        break;
                }
            }
        },

        get: function(id) {
            return this.objectMap[id];
        },

        toJson: function() {
            return this.serializedObjectMap;
        },

        fromJson: function(json) {
            this.serializedObjectMap = json;
            for (var id in this.serializedObjectMap) {
                var serializedObject = this.serializedObjectMap[id];
                this.deserializeObject(serializedObject);
            }
            return this;
        },

        deserializeObject: function(serializedObject) {

            // already deserialized?
            var id = serializedObject.id;
            var object = this.objectMap[id];
            if (object) {
                return object;
            }

            // update max id
            var intId = parseInt(id);
            if (!isNaN(intId)) {
                this.maxId = Math.max(intId, this.maxId);
            }

            // create object
            switch (serializedObject.type) {
                case 'object':
                    object = {
                        id: id
                    };
                    break;
                case 'list':
                    object = [];
                    object.id = id;
                    break;
                default:
                    object = Object.create(module[serializedObject.type].prototype);
            }
            this.objectMap[id] = object;

            // deserialize properties of object
            for (var property in serializedObject) {
                var value = serializedObject[property];
                if (value[0] === '#') {
                    object[property] = this.deserializeObject(this.serializedObjectMap[value.slice(1)]);
                } else {
                    object[property] = value;
                }
            }

            return object;
        }

    });

    // =========================================================================
    // test
    // =========================================================================    

    module.Step = core.defineClass({
        init: function() {}
    });


    module.PrintStep = module.Step.derive({
        type: 'PrintStep',
        init: function(message) {
            module.Step.prototype.init.apply(this, arguments);
            this.message = message;
        },
        execute: function() {
            console.log(this.message);
        }
    });

    module.SerialStep = module.Step.derive({
        type: 'SerialStep',
        init: function(options) {
            module.Step.prototype.init.apply(this, arguments);
            this.steps = options.steps || [];
        },
        execute: function() {
            for (var i = 0; i < this.steps.length; ++i) {
                var step = this.steps[i];
                step.execute();
            }
        }
    });


    var chain = new module.SerialStep({
        steps: [new module.PrintStep('A'), new module.PrintStep('B')]
    });
    chain.execute();


    module.A = core.defineClass({
        type: 'A',
        init: function(name, b) {
            this.name = name;
            this.b = b;
            this.b2 = {
                b: b
            };
            this.list = [b, 2, 3];
        }
    });

    module.B = core.defineClass({
        type: 'B',
        init: function(name) {
            this.name = name;
        }
    });

    var b = new module.B('b');
    var a = new module.A('a', b);
    a.id = 'hugo';

    var db = new module.ODB();
    db.put(a);


    var x1 = {
        id: 'x1'
    };
    var x2 = {
        id: 'x2'
    };
    var x3 = {
        id: 'x3'
    };
    x1.p = x2;
    x2.p = x3;
    x3.p = x1;
    db.put(x1);

    var json = db.toJson();
    db = new module.ODB(json);
    var new_x1 = db.get('x1');


})();