/* global module, require,  console */


// =========================================================================
// import other modules + define own module
// =========================================================================
var core = require('../framework/core');
var odb = require('../framework/odb');
var exports = module.exports = {};

// =========================================================================
// test
// =========================================================================    

exports.A = core.defineClass({
	type: 'tests.odb_test.A',
	init: function (name, b) {
		this.name = name;
		this.b = b;
		this.b2 = {
			b: b
		};
		this.list = [b, 2, 3];
	}
});

exports.B = core.defineClass({
	type: 'tests.odb_test.B',
	init: function (name) {
		this.name = name;
	}
});

var test1 = function () {
	var b = new exports.B('b');
	var a = new exports.A('a', b);
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
};

var test2 = function () {

	var db = new odb.DB();

	var b = new exports.B('test');
	db.put(b);

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

	db.save('test.odb');
};

var test3 = function () {

	var db = new odb.DB();
	db.load('test.odb', function () {
		console.log(db.get('x1'));
		console.log(db.get('x2'));
		console.log(db.get('x3'));
	});

};


//test1();
test3();