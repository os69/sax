define(['./core'], function (core) {

    var Odb = core.defineClass({
        init: function () {
            this.clsMap = {};
            this.maxId = 0;
        },
        generateId: function () {
            return '#' + (++this.maxId)
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
        create: function (name) {
            if (!name) {
                obj = {}
            } else {
                cls = this.clsMap[name]
                obj = Object.create(cls.prototype)
            }
            this.getObjectAdminData(obj)
            return obj
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
            cloner = new Cloner(this)
            return cloner.clone(obj)
        }
    });


    var Cloner = core.defineClass({
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
            if (obj.meta && typeof obj.meta.clone !== 'undefined' && !obj.meta.clone) {
                return obj;
            }
            var admin = this.odb.getObjectAdminData(obj);
            var clonedObj = this.cloneMap[admin.id];
            if (clonedObj) {
                return clonedObj;
            }
            clonedObj = this.cloneMap[admin.id] = this.odb.create(admin.name)
            for (var key in obj) {
                var value = obj[key];
                if (!obj.hasOwnProperty(key)) {
                    continue;
                }
                if (key == '__admin__') {
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
            clonedList = [];
            admin = this.odb.getObjectAdminData(clonedList);
            this.cloneMap[admin.id] = clonedList;
            for (var i = 0; i < list.length; ++i) {
                var element = list[i];
                clonedList.push(this.clone(element))
            }
            return clonedList;
        }
    });

    return Odb;











})