/* global module, require, console */

// =========================================================================
// import other modules + define own module
// =========================================================================
var core = require('../framework/core');
var processchains = require('../framework/processchains');
var exports = module.exports = {};

// =========================================================================
// a process step which prints the process chain data to the console
// =========================================================================
exports.PrintStep = processchains.Step.derive({
	type: 'application.steps.PrintStep',
	execute: function () {
		this.notify();
		console.log('--> process data container:', this.getData());
		this.resolve();
	}
});

// =========================================================================
// add step
// =========================================================================
exports.AddStep = processchains.Step.derive({
	type: 'application.steps.AddStep',
	init: function (delta) {
		processchains.Step.prototype.init.apply(this, arguments);
		this.delta = delta;
	},
	execute: function () {
		this.notify();
		var data = this.getData();
		console.log(data.number + ' add ' + this.delta);
		data.number += this.delta;
		this.resolve();
	}
});

// =========================================================================
// a process step which starts a sub process chain
// step is continued after sub process is finished
// =========================================================================
exports.SubChainStep = processchains.Step.derive({
	type: 'application.steps.SubChainStep',
	execute: function () {
		this.notify();
		var chain = new processchains.ProcessChain({
			steps: [new exports.AddStep(100),
					new exports.AddStep(100)],
			data: this.getData()
		});
		chain.done(this, 'subChainDoneHandler');
		this.controller.addChain(chain);
	},
	subChainDoneHandler: function () {
		this.resolve();
	}
});

// =========================================================================
// a process step which generates many sub process chains
// =========================================================================
exports.WorkloadStep = processchains.Step.derive({
	type: 'application.steps.WorkloadStep',
	execute: function () {
		this.notify();
		var workload = this.getData().workload;
		for (var i = 0; i < workload.length; ++i) {
			var data = workload[i];
			var chain = this.createProcessChain(data);
			this.controller.addChain(chain);
		}
		this.resolve();
	},
	createProcessChain: function (data) {
		return new processchains.ProcessChain({
			steps: [new exports.AddStep(100),
					new exports.AddStep(100),
				    new exports.PrintStep()],
			data: data
		});
	}
});