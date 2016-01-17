/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var odb = window.pc.odb;
	var module = window.pc.odb.test = {};

	// =========================================================================
	// test
	// =========================================================================    

	module.A = core.defineClass({
		type: 'pc.odb.test.A',
		init: function (name, b) {
			this.name = name;
			this.b = b;
			this.b2 = {
				b: b
			};
			this.list = [b, 2, 3];
		}
	});

	module.B = core.defineClass({
		type: 'pc.odb.test.B',
		init: function (name) {
			this.name = name;
		}
	});

	var b = new module.B('b');
	var a = new module.A('a', b);
	a.id = 'hugo';

	var db = new odb.DB();
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

	db.debugGraph();

	var json1 = db.toJson();

	x3.q = x1;
	db.put(x1);
	var json2 = db.toJson();

	db = new odb.DB(json1);
	var new_x1 = db.get('x1');
	var new_x3 = db.get('x3');
	db.fromJson(json2);

	db.delete(new_x1);
	var xyz;

})();