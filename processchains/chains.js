/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var odb = window.pc.odb;
	var asynchron = window.pc.asynchron;
	var module = window.pc.chains = {};

	var db = new odb.DB();

	module.Step = asynchron.Deferred.derive({
		type: 'pc.chains.Step',
		init: function () {
			asynchron.Deferred.prototype.init.apply(this, arguments);
		},
		collectExecutableSteps: function (steps) {
			if (this.status === this.INITIAL) {
				steps.push(this);
			}
		}
	});

	module.PrintStep = module.Step.derive({
		type: 'pc.chains.PrintStep',
		init: function (message) {
			module.Step.prototype.init.apply(this, arguments);
			this.message = message;
		},
		execute: function () {
			this.notify();
			console.log(this.message);
			this.resolve();
		}
	});

	module.CreateStep = module.Step.derive({
		type: 'pc.chains.CreateStep',
		init: function (message) {
			module.Step.prototype.init.apply(this, arguments);
		},
		execute: function () {
			this.notify();
			var chain = new module.SerialStep({
				steps: [new module.PrintStep('sub 1'),
						new module.PrintStep('sub 2')]
			});
			chain.done(this, 'subChainDoneHandler');
			db.get('controller').addChain(chain);
			this.notify('waiting');
		},
		subChainDoneHandler: function () {
			this.resolve();
		}
	});

	module.SerialStep = module.Step.derive({
		type: 'pc.chains.SerialStep',
		init: function (options) {
			module.Step.prototype.init.apply(this, arguments);
			this.steps = options.steps || [];
			for (var i = 0; i < this.steps.length; ++i) {
				var step = this.steps[i];
				step.done(this, 'subStepDoneHandler');
				step.progress(this, 'subStepProgressHandler');
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

	module.Controller = core.defineClass({
		type: 'pc.chains.Controller',
		init: function (chains) {
			this.chains = chains || [];
			this.id = 'controller';
			db.put(this);
		},
		addChain: function (chain) {
			this.chains.push(chain);
		},
		run: function () {
			var deleteCheck = function (obj) {
				if (obj === db.get('controller')) {
					return false;
				}
				if (obj instanceof module.Step) {
					return obj.status === obj.RESOLVED;
				} else {
					return true;
				}
			};
			var steps = [];
			var chains = this.chains;
			for (var i = 0; i < chains.length; ++i) {
				var chain = chains[i];
				if (chain.status === module.Step.prototype.RESOLVED) {
					chains.splice(i, 1);
					i--;
					db.delete(chain, deleteCheck);
					continue;
				}
				chain.collectExecutableSteps(steps);
			}
			var step = steps[0];
			if (step) {
				step.done(this, 'handleStepDone');
				step.progress(this, 'handleStepProgress');
				step.execute();
			} else {
				db.put(db.get('controller'));
				db.debugGraph();
			}
		},
		handleStepProgress: function (msg) {
			if (msg === 'waiting') {
				this.rerun();
			}
		},
		handleStepDone: function () {
			this.rerun();
		},
		rerun: function () {
			db.put(db.get('controller'));
			db.debugGraph();
			db.debugReload();
			window.setTimeout(function () {
				db.get('controller').run();
			}, 0);
		}
	});

})();