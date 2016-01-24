/* global window, require, console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.odb.core;
	var module = window.odb.odb = {};

	// =========================================================================
	// object database
	// =========================================================================    
	module.DB = core.defineClass({

		init: function (json) {
			this.objectMap = {};
			this.serializedObjectMap = {};
			this.processingMap = {};
			this.maxId = 0;
			if (json) {
				this.fromJson(json);
			}
			// obj
			// getId
			// ser obj
			// setId
		},

		generateId: function () {
			return '__' + (++this.maxId);
		},

		getType: function (obj) {
			if (obj === undefined) {
				return 'simple';
			}
			if (typeof (obj) === 'string') return 'simple';
			if (typeof (obj) === 'number') return 'simple';
			if (typeof (obj) === 'boolean') return 'simple';
			if (typeof (obj) === 'function') return 'function';
			if (typeof (obj) === 'object') {
				if (Object.prototype.toString.call(obj) === '[object Array]') return 'list';
				return 'object';
			}
			throw "Not supported type:" + typeof (obj);
		},

		put: function (id, obj) {
			obj.id = id;
			this.objectMap[obj.id] = obj;
		},

		get: function (id) {
			return this.objectMap[id];
		},

		clone: function (obj) {

		},

		toJson: function () {
			this.serializedObjectMap = {};
			this.processingMap = {};
			for (var id in this.objectMap) {
				var obj = this.objectMap[id];
				if (obj.id.slice(0, 2) === '__') {
					continue;
				}
				this.serializeObj(obj);
			}
			this.garbageCollection();
			return this.serializedObjectMap;
		},

		garbageCollection: function () {
			var id;
			var delIds = [];
			for (id in this.objectMap) {
				if (!this.processingMap[id]) {
					delIds.push(id);
				}
			}
			for (var i = 0; i < delIds.length; ++i) {
				id = delIds[i];
				delete this.objectMap[id];
			}
		},

		serializeObj: function (obj) {

			// generate id
			obj.id = obj.id || this.generateId();

			// update processing map
			if (this.processingMap[obj.id]) {
				return;
			}
			this.processingMap[obj.id] = true;

			// update object map
			this.objectMap[obj.id] = obj;

			// update serialized object map
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
					if (value !== null) {
						this.serializeObj(value);
						serializedObject[property] = '#' + value.id;
					} else {
						serializedObject[property] = null;
					}
					break;
				}
			}
			return serializedObject;
		},

		fromJson: function (json) {
			this.processingMap = {};
			this.serializedObjectMap = json;
			for (var id in this.serializedObjectMap) {
				var serializedObject = this.serializedObjectMap[id];
				this.deserializeObject(serializedObject);
			}
		},

		deserializeObject: function (serializedObject) {

			// already processed?
			var id = serializedObject.id;
			if (this.processingMap[id]) {
				return this.objectMap[id];
			}
			this.processingMap[id] = true;

			// update max id
			if (id.slice(0, 2) === '__') {
				var intId = parseInt(id.slice(2));
				this.maxId = Math.max(intId, this.maxId);
			}

			// create object if necessary
			var object = this.objectMap[id];
			if (!object) {
				switch (serializedObject.type) {
				case 'object':
					object = {};
					break;
				case 'list':
					object = [];
					break;
				default:
					var constructorFunction = this.getByPackagePath(serializedObject.type);
					object = Object.create(constructorFunction.prototype);
				}
				object.id = id;
				this.objectMap[id] = object;
			}

			// deserialize properties of object
			for (var property in serializedObject) {
				var value = serializedObject[property];
				if (value && value[0] === '#') {
					value = this.deserializeObject(this.serializedObjectMap[value.slice(1)]);
				}
				object[property] = value;
			}

			return object;
		},

		getByPackagePath: function (path) {
			var parts = path.split('.');
			var obj = window;
			for (var i = 0; i < parts.length; ++i) {
				var part = parts[i];
				obj = obj[part];
			}
			return obj;
		},

		debugReload: function () {
			var json = this.toJson();
			this.init.apply(this, [json]);
		},

		debugStatistic: function () {
			var statistic = {};
			var type;
			for (var id in this.serializedObjectMap) {
				var obj = this.serializedObjectMap[id];
				type = obj.type;
				var count = statistic[type];
				count = count !== undefined ? count + 1 : 1;
				statistic[type] = count;
			}
			console.log('--odb statistic begin');
			for (type in statistic) {
				console.log(type + ':' + statistic[type]);
			}
			console.log('--odb statistic end');
		}

	});

})();