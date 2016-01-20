/* global module, require,  console */

// =========================================================================
// import other modules + define own module
// =========================================================================
var odb = require('../framework/odb');
var processchains = require('../framework/processchains');
var steps = require('./steps');
var exports = module.exports = {};

// =========================================================================
// main controller
// =========================================================================
var controller = new processchains.Controller();

// =========================================================================
// example process chain with
// 1) sequential processing
// 2) parallel processing
// 3) start a sub process chain (main chain is continued after sub process is
//    finished)
// =========================================================================
var chain = new processchains.ProcessChain({
    steps: [
		new processchains.ParallelStep({
            steps: [new steps.AddStep(1),
					new steps.AddStep(10)]
        }),
		new processchains.SerialStep({
            steps: [new steps.AddStep(1),
					new steps.AddStep(10)]
        }),
		new steps.SubChainStep(),
		new steps.PrintStep()],
    data: {
        number: 1
    }
});
controller.addChain(chain);

// =========================================================================
// a process chain which takes a workload and generates a new process
// chain for each workload item
// =========================================================================
var chain = new processchains.ProcessChain({
    steps: [new steps.ProcessChainGeneratorStep()],
    data: {
        workload: [{
            number: 1
		}, {
            number: 2
		}]
    }
});
controller.addChain(chain);

// =========================================================================
// save state
// =========================================================================
var db = new odb.DB();
db.put('controller', controller);
db.save('../data/test.odb');