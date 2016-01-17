/* global module, require,  console, process */

// =========================================================================
// import other modules + define own module
// =========================================================================
var odb = require('../framework/odb');
var exports = module.exports = {};

// =========================================================================
// main
// =========================================================================

var db = new odb.DB();
db.load('../data/test.odb', function (db) {

	// start process step execution
	var controller = db.get('controller');
	controller.run(db);

	// save state		
	db.save('../data/test.odb', function () {
		if (controller.chains.length > 0) {
			process.exit(0);
		} else {
			console.log('end');
			db.debugStatistic();
			process.exit(1);
		}
	});

});