/* global window,  console */
(function () {

	// =========================================================================
	// import other modules + define own module
	// =========================================================================
	var core = window.pc.core;
	var asynchron = window.pc.asynchron;
	var odb = window.pc.odb;
	var graphs = window.pc.graphs;
	var chains = window.pc.chains;
	var module = window.pc.test1 = {};

	var controller = new chains.Controller();

	var chain = new chains.SerialStep({
		steps: [new chains.PrintStep('1.1'),
				new chains.CreateStep(),
			   new chains.PrintStep('1.2')]
	});


	controller.addChain(chain);
	controller.run();

})();