/* global console, require */
var express = require('express');

var app = express();
app.use(express.static('sampleapp'));
app.listen(54000, function () {
	console.log('Example app listening on port 54000');
});