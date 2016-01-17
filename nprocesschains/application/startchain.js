/* global module, require,  console */

// =========================================================================
// import other modules + define own module
// =========================================================================
var odb = require('../framework/odb');
var processchains = require('../framework/processchains');
var steps = require('./steps');
var exports = module.exports = {};

// =========================================================================
// main
// =========================================================================

// create process chain
var chain = new processchains.SerialStep({
	steps: [new steps.PrintStep('1.1'),
			new steps.CreateStep(),
			new steps.PrintStep('1.2')]
});

// add chain to controller
var controller = new processchains.Controller();
controller.addChain(chain);

// save state
var db = new odb.DB();
db.put('controller', controller);
db.save('../data/test.odb');