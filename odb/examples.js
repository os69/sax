/* global window, console */
(function () {

	var odb = window.odb;

	var example1 = function () {

		// create empty database
		var db = new odb.DB();

		// store object with key 'notebook' in db
		// subobjects are added recursively to the DB
		db.put('notebook', {
			title: 'Notebook',
			price: 10,
			keywords: ['computer', 'mobile']
		});

		// serialize db to a json (save the json on disk or in real db)
		var json = JSON.stringify(db.toJson());

		// create a database and fill with the objects from json
		db = new odb.DB({
			json: JSON.parse(json)
		});

		// get an object from the database
		var notebook = db.get('notebook');

	};

	var example2 = function () {

		// create empty database
		var db = new odb.DB();

		// circular object references
		var o1 = {
			id: '1'
		};
		var o2 = {
			id: '2'
		};
		var o3 = {
			id: '3'
		};
		o1.p = o2;
		o2.p = o3;
		o3.p = o1;

		// store o1 (and via recursion o2 and o3) in the database
		db.put('o1', o1);

		db.debugReload();
		o1 = db.get('o1');
	};

	var example3 = function () {

		// create empty database
		// the id of an object is taken from the property 'id'
		var db = new odb.DB({
			idProperty: 'id'
		});

		// create an object
		var notebook = {
			id: '4711',
			price: 10
		};

		// store object in db
		db.put(notebook);

		// get object from db
		notebook = db.get('4711');
	};


	example1();
	example2();
	example3();

})();