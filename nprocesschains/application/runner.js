/* global module, require,  console, process */

// =========================================================================
// import other modules + define own module
// =========================================================================
var odb = require('../framework/odb');
var exports = module.exports = {};

// =========================================================================
// generate viz graph
// =========================================================================
var generateVizGraph = function () {
    var vizFilePath = db.get('vizFilePath');
    if (!vizFilePath) {
        vizFilePath = {
            path: 'dbgraph',
            counter: 0
        };
        db.put('vizFilePath', vizFilePath);
    } else {
        vizFilePath.counter++;
    }
    db.debugGraph(vizFilePath.path + vizFilePath.counter + '.dot');
};

// =========================================================================
// main
// =========================================================================
var db = new odb.DB();
db.load('../data/test.odb', function (db) {

    // start process step execution
    var controller = db.get('controller');
    controller.run(db);

    // generate vizgrpah
    //generateVizGraph(db);

    // save state	
    db.save('../data/test.odb', function () {
        if (controller.chains.length > 0) {
            process.exit(0);
        } else {
            db.debugStatistic();
            process.exit(1);
        }
    });

});