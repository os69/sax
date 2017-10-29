var request = require('request');
var fs = require('fs');

var readStream = fs.createReadStream('./sample/400px-Commodore64.jpg');

var writeStream = request({
    method: 'POST',
    url: 'http://localhost:50000/upload',
    headers: {
        'Content-Type': 'application/octet-stream'
    },
    encoding: null
});

readStream.pipe(writeStream);

writeStream.on('finish', function () {
    console.log('upload finished');
});

writeStream.on('error', function () {
    console.log('error');
});

writeStream.pipe(fs.createWriteStream('result.jpg'));
