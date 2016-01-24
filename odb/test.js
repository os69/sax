/* global window, console */
(function () {

	var core = window.odb.core;
	var odb = window.odb.odb;

	var A = core.defineClass({
		init: function (p1) {
			this.p1 = p1;
		},
		log: function () {
			console.log(this.p1);
		}
	});


	var a = new A([{
		a: 1
	}, {
		a: 2
	}, {
		a: 3
	}]);
	a.log();

	var db = new odb.DB();
	db.put('a', a);
	db.debugReload();
	var aNew1 = db.get('a');
	aNew1.p1.splice(0, 1);
	db.debugReload();
	var aNew2 = db.get('a');

	// id and type better
	// pointer better
	// update db
	// clone
	// check constrctor pointer
	// hooks for get id, type, object creation

})();