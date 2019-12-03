/* global console, require */
var fs = require('fs');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');


var app = express();
app.use(bodyParser.json());



/*app.get('/data/:file', function (req, res) {
	fs.readFile('data/' + req.params.file, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			res.status(500).end('' + err);
			return;
		}
		res.setHeader('Content-Type', 'application/json');
		res.status(200).end(data);
	});
});*/

app.post('/*', function (req, res) {

	var fullPath = path.join(process.cwd(), req.path);
	//console.log(req.params.file);	
	console.log('saving',fullPath);
	//console.log(req.body);

	fs.writeFile(fullPath, JSON.stringify(req.body), function (err) {
		if (err) {
			console.log(err);
			res.status(500).end('' + err);
			return;
		}
		res.status(200).end();
	});
});

app.use(express.static('.'));

app.listen(54000, function () {
	console.log('Example app listening on port 54000');
});