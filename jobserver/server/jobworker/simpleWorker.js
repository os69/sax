var Promise = require('bluebird');
var JobBase = require('../jobmiddleware/Job');
var util = require('../util/util');

var Job = function () {
    this.init.apply(this, arguments);
}

Job.prototype = util.extend(Object.create(JobBase.prototype), {

    saveWorkload: function () {
        return this.stdinToFile(this.filePath('test.jpg'));
    },

    convert1: function () {
        return this.spawn('convert', ['-type', 'Grayscale', job.filePath('test.jpg'), job.filePath('test_g.jpg')]);
    },

    convert2: function () {
        return this.spawn('convert', [job.filePath('test.jpg'), '-negate', job.filePath('test_i.jpg')]);
    },

    returnResult: function () {
        return this.fileToStdout(this.filePath('test_g.jpg'));
    },

    execute: function () {
        job.setup()
            .then(this.saveWorkload.bind(this))
            .then(this.convert1.bind(this))
            .then(this.convert2.bind(this))
            .then(this.returnResult.bind(this))
            .catch(function (err) {
                process.stderr.write(err.toString());
                process.exit(1);
            }.bind(this));
    }
});

var job = new Job();
job.execute();
