var child_process = require('child_process');
var util = require('../util/util');
var MultiBuffer = require('../util/MultiBuffer');
var fs = require('fs');

var multiPartResponse = function (options) {

    return function (req, res) {

        // spawn child
        var child = child_process.spawn(options.command, options.args);
        child.on('error', function (err) {
            process.stderr.write(err.toString());
            res.status(500).send(err.toString());
        });
        child.on('exit', function (code) {
            if (code !== 0) {
                process.stderr.write('child exited with code ' + code);
            }
        });
        child.stderr.pipe(process.stderr, { end: false });

        // pipe for request client -> child
        req.pipe(child.stdin);
        child.stdin.on('finish', function () {
            console.log('finished data transfer client->child');
        });

        // return multipart response
        return util.streamToBuffer(child.stdout).then(function (outputBuffer) {
            var multiBuffer = new MultiBuffer(outputBuffer);
            multiBuffer.sendMultiPartResponse(res, options.fileNames);
        }.bind(this));

    };

}

module.exports = multiPartResponse;
