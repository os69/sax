
    // =======================================================================
    // odb
    // =======================================================================

    export function Odb() {
        this.init.apply(this, arguments);
    }

    Odb.prototype = {
        init: function () {
            this.clsMap = {};
            this.maxId = 0;
        },
        generateId: function () {
            return '#' + (++this.maxId)
        },
        isReference: function (value) {
            return value && value[0] === '#';
        },
        ignoreProperty: function (property) {
            return property === '__admin__' || property.slice(0, 2) === '__';
        },
        type: function (obj) {
            switch (typeof obj) {
                case 'string':
                case 'number':
                case 'boolean':
                    return 'simple';
                case 'function':
                    return 'function'
                case 'object':
                    if (Array.isArray(obj)) {
                        return 'list';
                    } else {
                        return 'object';
                    }
            }
        },
        create: function (type, name) {
            var obj;
            switch (type) {
                case 'object':
                    if (!name) {
                        obj = {}
                    } else {
                        cls = this.clsMap[name]
                        obj = Object.create(cls.prototype)
                    }
                    break;
                case 'list':
                    obj = [];
                    break;
                default:
                    throw 'illegal type';
            }
            this.getObjectAdminData(obj)
            return obj
        },
        registerClass: function (constructor) {
            this.clsMap[constructor.prototype.meta.name] = constructor;
        },
        getObjectAdminData: function (obj) {
            var name = obj.meta && obj.meta.name;
            if (name) {
                this.clsMap[name] = obj.constructor
            };
            if (!obj.__admin__) {
                obj.__admin__ = {
                    id: this.generateId(),
                    name: name
                };
            }
            return obj.__admin__
        },
        clone: function (obj) {
            var cloner = new Cloner(this)
            return cloner.clone(obj)
        },
        toJson: function (obj) {
            var serializer = new Serializer(this);
            return serializer.toJson(obj);
        },
        fromJson: function (json) {
            var deSerializer = new DeSerializer(this);
            return deSerializer.fromJson(json);
        }
    };

    // =======================================================================
    // de-serializer
    // =======================================================================

    var DeSerializer = function () {
        this.init.apply(this, arguments);
    }

    DeSerializer.prototype = {
        init: function (odb) {
            this.odb = odb;
        },
        processObjects: function (json) {
            var objects = {};
            for (var id in json.objects) {
                var jsonObj = json.objects[id];
                var object;
                switch (this.odb.type(jsonObj)) {
                    case 'object':
                        object = this.odb.create('object', jsonObj.__admin__.name);
                        for (var property in jsonObj) {
                            if (this.odb.ignoreProperty(property)) {
                                continue;
                            }
                            object[property] = jsonObj[property];
                        }
                        break;
                    case 'list':
                        object = this.odb.create('list');
                        for (var i = 0; i < jsonObj.length; ++i) {
                            var element = jsonObj[i];
                            object.push(element);
                        }
                        break;
                    default:
                        throw 'illegal type';
                }
                objects[id] = object;
            }
            return objects;
        },
        processRelations: function (json, objects) {
            for (var id in objects) {
                object = objects[id];
                var refObjId;
                switch (this.odb.type(object)) {
                    case 'object':
                        for (var property in object) {
                            if (this.odb.ignoreProperty(property)) {
                                continue;
                            }
                            refObjId = object[property];
                            if (this.odb.isReference(refObjId)) {
                                object[property] = objects[refObjId];
                            }
                        }
                        break;
                    case 'list':
                        for (i = 0; i < object.length; ++i) {
                            refObjId = object[i];
                            if (this.odb.isReference(refObjId)) {
                                object[i] = objects[refObjId];
                            }
                        }
                        break;
                    default:
                        throw 'illegal type';
                }
            }
        },
        postProcessObjects: function (objects) {
            for (var id in objects) {
                var object = objects[id];
                if (object.postDeSerialize) {
                    object.postDeSerialize();
                }
            }
        },
        fromJson: function (json) {
            // objects
            var objects = this.processObjects(json);
            // relations
            this.processRelations(json, objects);
            // post process objects
            this.postProcessObjects(objects);
            // return root object
            return objects[json.rootId];
        }
    };

    // =======================================================================
    // serializer
    // =======================================================================

    var ignore = {};

    var Serializer = function () {
        this.init.apply(this, arguments);
    }

    Serializer.prototype = {
        init: function (odb) {
            this.odb = odb;
            this.json = {
                rootId: null,
                objects: {}
            };
        },
        toJson: function (obj) {
            this._toJson(obj);
            return this.json;
        },
        _putJson: function (obj) {
            this.json.objects[obj.__admin__.id] = obj;
            if (!this.json.rootId) {
                this.json.rootId = obj.__admin__.id;
            }
        },
        _getJson: function (id) {
            return this.json.objects[id];
        },
        _toJson: function (obj) {
            switch (this.odb.type(obj)) {
                case 'simple':
                    return obj;
                case 'object':
                    return this._toJsonObject(obj);
                case 'list':
                    return this._toJsonList(obj);
                case 'function':
                    return ignore;
            }
        },
        _toJsonObject: function (obj) {
            if (obj === null) {
                return null;
            }
            if (obj.meta && obj.meta.serialize !== undefined && !obj.meta.serialize) {
                return ignore;
            }
            var admin = this.odb.getObjectAdminData(obj);
            var jsonObj = this._getJson(admin.id);
            if (jsonObj) {
                return jsonObj.__admin__.id;
            }
            var jsonObj = {};
            jsonObj.__admin__ = obj.__admin__;
            this._putJson(jsonObj);
            for (var key in obj) {
                var value = obj[key];
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (this.odb.ignoreProperty(key)) {
                    continue;
                }
                var referenceId = this._toJson(value);
                if (referenceId === ignore) {
                    continue;
                }
                jsonObj[key] = referenceId;
            }
            return jsonObj.__admin__.id;
        },
        _toJsonList: function (obj) {
            if (obj.meta && obj.meta.serialize !== undefined && !obj.meta.serialize) {
                return ignore;
            }
            var admin = this.odb.getObjectAdminData(obj);
            var jsonObj = this._getJson(admin.id);
            if (jsonObj) {
                return jsonObj.__admin__.id;
            }
            jsonObj = [];
            jsonObj.__admin__ = obj.__admin__;
            this._putJson(jsonObj);
            for (var i = 0; i < obj.length; ++i) {
                var value = obj[i];
                var referenceId = this._toJson(value);
                if (referenceId === ignore) {
                    continue;
                }
                jsonObj.push(referenceId);
            }
            return jsonObj.__admin__.id;
        }
    };

    // =======================================================================
    // cloner
    // =======================================================================

    var Cloner = function () {
        this.init.apply(this, arguments);
    }

    Cloner.prototype = {
        init: function (odb) {
            this.odb = odb
            this.cloneMap = {}
        },
        clone: function (obj) {
            switch (this.odb.type(obj)) {
                case 'simple':
                    return this.cloneSimple(obj);
                case 'object':
                    return this.cloneObject(obj)
                case 'list':
                    return this.cloneList(obj)
                case 'function':
                    return this.cloneFunction(obj)
            }
        },
        cloneFunction: function (func) { return func; },
        cloneSimple: function (obj) { return obj; },
        cloneObject: function (obj) {
            if (obj === null) {
                return null;
            }
            if (obj.meta && typeof obj.meta.clone !== 'undefined' && !obj.meta.clone) {
                return obj;
            }
            var admin = this.odb.getObjectAdminData(obj);
            var clonedObj = this.cloneMap[admin.id];
            if (clonedObj) {
                return clonedObj;
            }
            clonedObj = this.cloneMap[admin.id] = this.odb.create('object', admin.name)
            for (var key in obj) {
                var value = obj[key];
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (this.odb.ignoreProperty(key)) {
                    continue;
                }
                clonedObj[key] = this.clone(value)
            }
            return clonedObj;
        },
        cloneList: function (list) {
            var admin = this.odb.getObjectAdminData(list)
            var clonedList = this.cloneMap[admin.id];
            if (clonedList) {
                return clonedList;
            }
            clonedList = this.odb.create('list');
            this.cloneMap[admin.id] = clonedList;
            for (var i = 0; i < list.length; ++i) {
                var element = list[i];
                clonedList.push(this.clone(element))
            }
            return clonedList;
        }
    };

    // =======================================================================
    // test
    // =======================================================================

    var test = function () {

        class Label {
            constructor(label) {
                this.label = label
            }
            getLabelText() {
                return this.label;
            }
        }
        Label.prototype.meta = { name: 'Label' };

        var odb = new Odb();

        var obj = {
            items: [{
                label: new Label('a')
            }, {
                label: new Label('b')
            }]
        };
        obj.ref = obj.items[1];

        var json = odb.toJson(obj);
        console.log(json);
        var dObj = odb.fromJson(json);
        console.log(dObj);

    }

