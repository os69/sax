
var express = require('express');
const child_process = require('child_process');
var fs = require('fs');

var app = express();

/*let Duplex = require('stream').Duplex;

function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

function streamToBuffer(stream) {
    return new Promise(function (resolve, reject) {
        let buffers = [];
        stream.on('error', reject);
        stream.on('data', function (data) {
            buffers.push(data);
        });
        stream.on('end', function () {
            resolve(Buffer.concat(buffers));
        });
    });
}*/

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/upload', function (req, res) {
    var child = child_process.spawn('node', ['worker.js']);
    child.on('error', function (err) {
        console.log('child error', err);
    });
    child.on('exit', function (code) {
        console.log('exit', code);
    });
    child.stderr.pipe(process.stderr, { end: false });
    //child.stdout.pipe(process.stdout, { end: false });
    var writeStream = child.stdin;
    req.pipe(writeStream);
    writeStream.on('finish', function () {
        console.log('data transferred to child');    
    });

    child.stdout.pipe(res);

    res.on('finish',function(){
        console.log('result sent back');
    });

    //child.stdout.pipe(fs.createWriteStream('result.jpg'));

});

app.listen(50000, function () {
    console.log('Example app listening on port 50000!');
});

