var request = require('request');
var fs = require('fs');

var inputStream = fs.createReadStream('./sample/400px-Commodore64.jpg');

var httpStream = request({
    method: 'POST',
    url: 'http://localhost:50000/simple',
    headers: {
        'Content-Type': 'application/octet-stream'
    },
    encoding: null
});

inputStream.pipe(httpStream);

var outputStream = fs.createWriteStream('result.jpg');
httpStream.pipe(outputStream);
outputStream.on('finish', function () {
    console.log('download finished');
})

