var Promise = require('bluebird');
var child_process = require('child_process');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var rimraf = Promise.promisify(require('rimraf'));
var util = require('../util/util');

var Job = function () {
    this.init.apply(this, arguments);
};

Job.prototype = {

    init: function () {
        this.guid = this.createGuid();
        this.jobDirPath = path.join('jobs', this.guid);
    },

    filePath: function (filePath) {
        return path.join(this.jobDirPath, filePath);
    },

    createGuid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    },

    setup: function () {
        var createJobsDir;
        if (!fs.existsSync('jobs')) {
            createJobsDir = fs.mkdirAsync('jobs');
        } else {
            createJobsDir = Promise.resolve();
        }
        return createJobsDir.then(function () {
            if (fs.existsSync(this.jobDirPath)) {
                return;
            } else {
                return fs.mkdirAsync(this.jobDirPath);
            }
        }.bind(this));
    },

    cleanup: function () {
        if (!fs.existsSync(this.jobDirPath)) {
            return Promise.resolve();
        }
        return rimraf(this.jobDirPath);
    },

    spawn: function (cmd, args) {
        return new Promise(function (resolve, reject) {
            var child = child_process.spawn(cmd, args);
            child.stderr.pipe(process.stderr, { end: false });
            child.on('exit', function (code) {
                if (code !== 0) {
                    reject('convert exited with ' + code);
                    return;
                }
                resolve();
            }.bind(this));
        }.bind(this));
    },

    stdinToFile: function (filePath) {
        return new Promise(function (resolve, reject) {
            var writeStream = fs.createWriteStream(filePath);
            process.stdin.pipe(writeStream);
            writeStream.on('finish', function () {
                resolve();
            }.bind(this));
        }.bind(this));
    },

    stdinToBuffer: function () {
        return util.streamToBuffer(process.stdin);
    },

    fileToStdout: function (filePath) {
        return new Promise(function (resolve, reject) {
            var result = fs.createReadStream(filePath);
            result.pipe(process.stdout);
            process.stdout.on('finish', function () {
                resolve();
            })
        }.bind(this));
    },

    bufferToStdout: function (buffer) {
        return new Promise(function (resolve, reject) {
            var stream = util.bufferToStream(buffer);
            stream.pipe(process.stdout);
            process.stdout.on('finish', function () {
                resolve();
            })
        });
    }

};

module.exports = Job;