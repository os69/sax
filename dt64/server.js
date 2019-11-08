var express = require('express');
var path = require('path');

var app = express();
app.set('port', 3000);

app.use(express.static(path.join(__dirname, '.')));

var server = app.listen(app.get('port'), function () {
    console.log('tt server is running on http://localhost:' + app.get('port'));
});