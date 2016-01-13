/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var module = window.pc.odb = {};

	module.db = {};

	module.getType = function (obj) {
		if (typeof (obj) === 'string') return 'simple';
		if (typeof (obj) === 'number') return 'simple';
		if (typeof (obj) === 'boolean') return 'simple';
		if (typeof (obj) === 'object') {
			if (Object.prototype.toString.call(obj) === '[object Array]') return 'list';
			return 'object';
		}
		throw "Not supported type:" + typeof (obj);
	};

	module.ODB = core.defineClass({

		init: function () {
			this.objectMap = {};
			this.serializedObjectMap = {};
		},

		add: function (obj) {
			obj.id = obj.id || core.generateId();
			if (this.objectMap[obj.id]) {
				return;
			}
			this.objectMap[obj.id] = obj;
			var serializedObject = {
				type: obj.type || module.getType(obj)
			};
			this.serializedObjectMap[obj.id] = serializedObject;
			for (var property in obj) {
				if (!obj.hasOwnProperty(property)) {
					continue;
				}
				var value = obj[property];
				switch (module.getType(value)) {
				case 'simple':
					serializedObject[property] = value;
					break;
				case 'object':
				case 'list':
					this.add(value);
					serializedObject[property] = value.id;
					break;
				}
			}
		},

		get: function (id) {
			return this.objectMap[id];
		},

		toJson: function () {
			return this.serializedObjectMap;
		},

		fromJson: function (json) {
			this.serializedObjectMap = json;
			for (var id in this.serializedObjectMap) {
				var serializedObject = this.serializedObjectMap[id];
				this.deserialize(serializedObject);
			}
			return this;
		},

		deserialize: function (serializedObject) {

			var id = serializedObject.id;
			var object = this.objectMap[id];
			if (object) {
				return object;
			}

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

			for (var property in serializedObject) {
				var value = serializedObject[property];
				if (value[0] === '#') {
					object[property] = this.deserialize(this.serializedObjectMap[value]);
				} else {
					object[property] = value;
				}
			}

			return object;
		}

	});



	module.DbObject = core.defineClass({
		init: function () {}
	});

	module.Step = module.DbObject.derive({
		init: function () {
			module.DbObject.prototype.init.apply(this, arguments);
		}
	});


	module.PrintStep = module.Step.derive({
		type: 'PrintStep',
		init: function (message) {
			module.Step.prototype.init.apply(this, arguments);
			this.message = message;
		},
		execute: function () {
			console.log(this.message);
		}
	});

	module.SerialStep = module.Step.derive({
		type: 'SerialStep',
		init: function (options) {
			module.Step.prototype.init.apply(this, arguments);
			this.steps = options.steps || [];
		},
		execute: function () {
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


	module.A = module.DbObject.derive({
		type: 'A',
		init: function (name, b) {
			this.name = name;
			this.b = b;
			this.b2 = {
				b: b
			};
			this.list = [b, 2, 3];
		}
	});

	module.B = module.DbObject.derive({
		type: 'B',
		init: function (name) {
			this.name = name;
		}
	});

	var b = new module.B('b');
	var a = new module.A('a', b);
	a.id = 'hugo';


	var db = new module.ODB();
	db.add(a);

	var json = db.toJson();
	var newA = (new module.ODB()).fromJson(json).get('hugo');


})();