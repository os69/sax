var Promise = require('bluebird');
var child_process = require('child_process');

var sync = function (options) {

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

        // pipe for response child -> client
        child.stdout.pipe(res);
        res.on('finish', function () {
            console.log('finished data transfer child->client');
        });

    };

}


module.exports = sync;
