/* global module, require, console */


// =========================================================================
// import other modules + define own module
// =========================================================================
var core = require('./core');
var fs = require('fs');
var exports = module.exports = {};

// =========================================================================
// object database
// =========================================================================    
exports.DB = core.defineClass({

	init: function (json) {
		this.objectMap = {};
		this.serializedObjectMap = {};
		this.maxId = 0;
		if (json) {
			this.fromJson(json);
		}
	},

	generateId: function () {
		return ++this.maxId;
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

	put: function () {

		// parse arguments
		var obj, processingMap, id;
		if (typeof (arguments[0]) === 'string') {
			id = arguments[0];
			obj = arguments[1];
			processingMap = arguments[2];
			obj.id = id;
		} else {
			obj = arguments[0];
			processingMap = arguments[1];
		}

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
				if (value !== null) {
					this.put(value, processingMap);
					serializedObject[property] = '#' + value.id;
				} else {
					serializedObject[property] = null;
				}
				break;
			}
		}

		return this;
	},

	get: function (id) {
		return this.objectMap[id];
	},

	delete: function (obj, check) {

		if (!obj) {
			return;
		}

		var serializedObj = this.serializedObjectMap[obj.id];
		delete this.objectMap[obj.id];
		delete this.serializedObjectMap[obj.id];
		for (var property in serializedObj) {
			var value = serializedObj[property];
			if (value && value[0] === '#') {
				var id = value.slice(1);
				if (check && !check(this.objectMap[id])) {
					continue;
				}
				this.delete(this.objectMap[id], check);
			}
		}
	},

	toJson: function () {
		var processingMap = {};
		for (var id in this.objectMap) {
			var obj = this.objectMap[id];
			this.put(obj, processingMap);
		}
		return JSON.parse(JSON.stringify(this.serializedObjectMap));
	},

	fromJson: function (json) {
		var processingMap = {};
		this.serializedObjectMap = json;
		for (var id in this.serializedObjectMap) {
			var serializedObject = this.serializedObjectMap[id];
			this.deserializeObject(serializedObject, processingMap);
		}
		return this;
	},

	save: function (path, cb) {
		fs.writeFile(path, JSON.stringify(this.toJson()), cb);
	},

	load: function (path, cb) {
		var self = this;
		fs.readFile(path, 'utf8', function (err, data) {
			if (err) {
				cb(err);
				return;
			}
			self.fromJson(JSON.parse(data));
			cb(self);
		});
	},

	deserializeObject: function (serializedObject, processingMap) {

		// already processed?
		var id = serializedObject.id;
		if (processingMap[id]) {
			return this.objectMap[id];
		}
		processingMap[id] = true;

		// update max id
		var intId = parseInt(id);
		if (!isNaN(intId)) {
			this.maxId = Math.max(intId, this.maxId);
		}

		// create object if necessary
		var object = this.objectMap[id];
		if (!object) {
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
				var constructorFunction = this.getByPackagePath(serializedObject.type);
				object = Object.create(constructorFunction.prototype);
			}
			this.objectMap[id] = object;
		}

		// deserialize properties of object
		for (var property in serializedObject) {
			var value = serializedObject[property];
			if (value && value[0] === '#') {
				value = this.deserializeObject(this.serializedObjectMap[value.slice(1)], processingMap);
			}
			object[property] = value;
		}

		return object;
	},

	getByPackagePath: function (path) {
		var parts = path.split('.');
		var directory = '../' + parts.slice(0, -1).join('/');
		//console.log('load', directory);
		var module = require(directory);
		return module[parts[parts.length - 1]];
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
		console.log('--');
		for (type in statistic) {
			console.log(type + ':' + statistic[type]);
		}
		console.log('--');
	}

});