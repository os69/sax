/* global module, require, console, setTimeout */


// =========================================================================
// import other modules + define own module
// =========================================================================
var core = require('./core');
var odb = require('./odb');
var asynchron = require('./asynchron');
var exports = module.exports = {};

// =========================================================================
// base class for all process steps
// =========================================================================
exports.Step = asynchron.Deferred.derive({
	type: 'framework.processchains.Step',
	init: function () {
		asynchron.Deferred.prototype.init.apply(this, arguments);
		this.parent = null;
	},
	collectExecutableSteps: function (steps) {
		if (this.status === this.INITIAL) {
			steps.push(this);
		}
	},
	getParent: function () {
		return this.parent;
	},
	getRoot: function () {
		if (!this.parent) {
			return this;
		}
		return this.parent.getRoot();
	},
	getData: function () {
		return this.getRoot().data;
	}
});

// =========================================================================
// serial step which execute sub steps sequentially
// =========================================================================
exports.SerialStep = exports.Step.derive({
	type: 'framework.processchains.SerialStep',
	init: function (options) {
		exports.Step.prototype.init.apply(this, arguments);
		this.steps = options.steps || [];
		for (var i = 0; i < this.steps.length; ++i) {
			var step = this.steps[i];
			step.done(this, 'subStepDoneHandler');
			step.progress(this, 'subStepProgressHandler');
			step.parent = this;
		}
	},
	subStepProgressHandler: function () {
		this.notify();
	},
	subStepDoneHandler: function () {
		var resolved = true;
		for (var i = 0; i < this.steps.length; ++i) {
			var step = this.steps[i];
			if (step.status !== this.RESOLVED) {
				resolved = false;
				break;
			}
		}
		if (resolved) {
			this.resolve();
		}
	},
	collectExecutableSteps: function (steps) {
		if (this.status === this.RESOLVED) {
			return;
		}
		for (var i = 0; i < this.steps.length; ++i) {
			var step = this.steps[i];
			if (step.status !== this.RESOLVED) {
				step.collectExecutableSteps(steps);
				break;
			}
		}
	}
});

// =========================================================================
// parallel step which execute sub steps in parallel
// =========================================================================
exports.ParallelStep = exports.Step.derive({
	type: 'framework.processchains.ParallelStep',
	init: function (options) {
		exports.Step.prototype.init.apply(this, arguments);
		this.steps = options.steps || [];
		for (var i = 0; i < this.steps.length; ++i) {
			var step = this.steps[i];
			step.done(this, 'subStepDoneHandler');
			step.progress(this, 'subStepProgressHandler');
			step.parent = this;
		}
	},
	subStepProgressHandler: function () {
		this.notify();
	},
	subStepDoneHandler: function () {
		var resolved = true;
		for (var i = 0; i < this.steps.length; ++i) {
			var step = this.steps[i];
			if (step.status !== this.RESOLVED) {
				resolved = false;
				break;
			}
		}
		if (resolved) {
			this.resolve();
		}
	},
	collectExecutableSteps: function (steps) {
		if (this.status === this.RESOLVED) {
			return;
		}
		for (var i = 0; i < this.steps.length; ++i) {
			var step = this.steps[i];
			if (step.status !== this.RESOLVED) {
				step.collectExecutableSteps(steps);
			}
		}
	}
});

// =========================================================================
// process chain 
// =========================================================================
exports.ProcessChain = exports.SerialStep.derive({
	type: 'framework.processchains.ProcessChain',
	init: function (options) {
		exports.SerialStep.prototype.init.apply(this, arguments);
		this.data = options.data || null;
	}
});

// =========================================================================
// controller for executing process steps
// =========================================================================
exports.Controller = core.defineClass({
	type: 'framework.processchains.Controller',
	init: function () {
		this.chains = [];
	},
	addChain: function (chain) {
		this.chains.push(chain);
	},
	run: function (db) {
		var self = this;
		var deleteCheck = function (obj) {
			if (obj === self) {
				return false;
			}
			if (obj instanceof exports.Step) {
				return obj.status === obj.RESOLVED;
			} else {
				return true;
			}
		};
		var steps = [];
		var chains = this.chains;
		for (var i = 0; i < chains.length; ++i) {
			var chain = chains[i];
			if (chain.status === exports.Step.prototype.RESOLVED) {
				chains.splice(i, 1);
				i--;
				db.delete(chain, deleteCheck);
				continue;
			}
			chain.collectExecutableSteps(steps);
		}
		var step = steps[0];
		if (step) {
			step.controller = this;
			step.execute();
		}
	}
});