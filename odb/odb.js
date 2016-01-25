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

		init: function (options) {

			options = options || {};

			this.objectMap = {};
			this.serializedObjectMap = {};
			this.processingMap = {};
			this.maxId = 0;

			this.generatedIdPrefix = options.generatedIdPrefix || '__';
			this.adminProperty = options.adminProperty || '__odb';

			/*if (options.idProperty) {
				this.getId = function (obj) {
					return obj[options.idProperty];
				};
			}
			if (options.getId) {
				this.getId = function (obj) {
					return options.getId.apply(obj, []);
				};
			}*/

		},

		generateId: function () {
			return this.generatedIdPrefix + (++this.maxId);
		},

		isGeneratedId: function (id) {
			return id.slice(0, this.generatedIdPrefix.length) === this.generatedIdPrefix;
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

		getId: function (obj) {
			return obj[this.adminProperty].id;
		},

		fillAdminData: function (obj, id) {
			var adminData = obj[this.adminProperty];
			if (!adminData) {
				adminData = {};
				obj[this.adminProperty] = adminData;
			}
			if (!adminData.id) {
				adminData.id = id || this.generateId(); // TODO id from method
			}
			if (!adminData.type) {
				adminData.type = this.getType(obj); // TODO type from method
			}
		},

		put: function () {
			var obj, id;
			switch (arguments.length) {
			case 1:
				obj = arguments[0];
				this.fillAdminData(obj);
				break;
			case 2:
				id = arguments[0];
				obj = arguments[1];
				this.fillAdminData(obj, id);
				break;
			}
			this.objectMap[this.getId(obj)] = obj;
		},

		get: function (id) {
			return this.objectMap[id];
		},

		toJson: function () {
			this.serializedObjectMap = {};
			this.processingMap = {};
			for (var id in this.objectMap) {
				if (this.isGeneratedId(id)) {
					continue;
				}
				var obj = this.objectMap[id];
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

			// get id
			this.fillAdminData(obj);
			var id = this.getId(obj);

			// update processing map
			if (this.processingMap[id]) {
				return;
			}
			this.processingMap[id] = true;

			// update object map
			this.objectMap[id] = obj;

			// update serialized object map
			var serializedObject = {};
			serializedObject[this.adminProperty] = obj[this.adminProperty];
			this.serializedObjectMap[id] = serializedObject;

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
						serializedObject[property] = '#' + this.getId(value);
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
			var id = this.getId(serializedObject);
			if (this.processingMap[id]) {
				return this.objectMap[id];
			}
			this.processingMap[id] = true;

			// update max id
			if (this.isGeneratedId(id)) {
				var intId = parseInt(id.slice(this.generatedIdPrefix.length));
				this.maxId = Math.max(intId, this.maxId);
			}

			// create object if necessary
			var object = this.objectMap[id];
			if (!object) {
				switch (serializedObject[this.adminProperty].type) {
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
				object[this.adminProperty] = serializedObject[this.adminProperty];
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