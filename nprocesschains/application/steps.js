/* global module, require, console */

// =========================================================================
// import other modules + define own module
// =========================================================================
var core = require('../framework/core');
var processchains = require('../framework/processchains');
var exports = module.exports = {};

// =========================================================================
// a process step which prints a message
// =========================================================================
exports.PrintStep = processchains.Step.derive({
	type: 'application.steps.PrintStep',
	init: function (message) {
		processchains.Step.prototype.init.apply(this, arguments);
		this.message = message;
	},
	execute: function () {
		this.notify();
		console.log(this.message);
		this.resolve();
	}
});

// =========================================================================
// a process step which starts another process chain
// =========================================================================
exports.CreateStep = processchains.Step.derive({
	type: 'application.steps.CreateStep',
	init: function (message) {
		processchains.Step.prototype.init.apply(this, arguments);
	},
	execute: function () {
		this.notify();
		var chain = new processchains.SerialStep({
			steps: [new exports.PrintStep('sub 1'),
					new exports.PrintStep('sub 2')]
		});
		chain.done(this, 'subChainDoneHandler');
		this.controller.addChain(chain);
	},
	subChainDoneHandler: function () {
		this.resolve();
	}
});