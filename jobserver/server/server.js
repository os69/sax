var port = 50000;
var express = require('express');
var simple = require('./jobmiddleware/simple');
var multiPartResponse = require('./jobmiddleware/multiPartResponse');

var app = express();

app.get('/', function (req, res) {
    res.send('Job Server');
});

app.post('/simple', simple({
    command: 'node',
    args: ['jobworker/simpleWorker.js']
}));

app.post('/multipartresponse', multiPartResponse({
    command: 'node',
    args: ['jobworker/multiPartResponseWorker.js'],
    fileNames: ['test_g.jpg','test_i.jpg']
}));

app.listen(port, function () {
    console.log('job server listening on ' + port);
});

