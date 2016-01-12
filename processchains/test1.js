/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var module = window.pc.test1 = {};


	// definition of process chain: network approach

	var processChain = {
		steps: {
			convertToText: {
				type: 'ISYSConverter',
				outputFormat: 'text'
			},
			extractEntitites: {
				type: 'TASDK'
			}
		},
		links: [
			{
				from: 'convertToText',
				to: 'extractEntities'
			}
		]
	};

	// definition of process chain: parallel and sequential processing

	var processChain2 = {
		type: 'sequential',
		steps: [{
				type: 'window.steps.tasdkStep'
				},
			{
				type: 'parallel',
				steps: [{
					type: 'TASDK',
					ruleSet: 'A'
				}, {
					type: 'TASDK',
					ruleSet: 'B'
				}]
				}
			]
	};


	module.tasdkStep = module.defineProcessStep({
		process: function () {
			console.log('blablub');
			return true;
		}
	});

	module.fileInboundChain = module.defineProcessChain();
	processChain.addStep(module.tasdkStep);


	var processChain3 = {
		type: 'seq',
		steps: [{
			process: function () {
				console.log('a');
			}
			}, {
			process: function () {
				console.log('b');
			}
		}],
		process: function () {

		}
	};

	var Step = {
		process: function () {

		}
	};

	var SequenceStep = core.object(Step, {
		addStep: function () {}
	});

	var ParallelStep = core.object(Step, {
		addStep: function () {}
	});

	var TasdkStep = core.object(Step, {
		process: function () {
			console.log('tasdk');
		}
	});

	var myChain = core.object(SequenceStep).init({
		steps: [core.object(TasdkStep).init({
			mode: 'a'
		}), core.object(TasdkStep).init({
			mode: 'b'
		})]
	});

	myChain.clone();
	myChain.run();


})();