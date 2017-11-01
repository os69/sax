var http = require('http');
var fs = require('fs');
var multiparty = require('multiparty');

function post(data) {

    // An object of options to indicate where to post to
    var post_options = {
        host: 'localhost',
        port: '50000',
        path: '/multipartresponse',
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function (res) {

        var form = new multiparty.Form({
            encoding: 'binary',
            uploadDir: '.'
        });

        form.parse(res, function (err, fields, files) {
            if (err) {
                console.log(err);
                return;
            }
            for (var field in fields) {
                console.log(field);
                fs.writeFile(field, fields[field]);
            }
        });
    });

    // post the data
    post_req.write(data);
    post_req.end();

}

fs.readFile('./sample/400px-Commodore64.jpg', function (err, data) {
    if (err) {
        console.log("FATAL An error occurred trying to read in the file: " + err);
        process.exit(-2);
    }
    post(data);
});