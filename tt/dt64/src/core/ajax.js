define([], function () {

    var module = {};

    module.request = function (options) {
        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    resolve(xhttp.responseText);
                    return;
                }
                if (xhttp.readyState == 4) {
                    reject(xhttp);
                }
            };
            xhttp.open(options.method, options.url, true);
            options.headers = options.headers || {};
            for (var header in options.headers) {
                xhttp.setRequestHeader(header, options.headers[header]);
            }
            xhttp.send(options.body);
        });
    }

    module.get = function (url, headers) {
        return module.request({
            method: 'GET',
            url: url,
            headers: headers
        })
    };

    module.post = function (url, body, headers) {
        return module.request({
            method: 'POST',
            url: url,
            headers: headers,
            body: body
        })
    };

    module.getJson = function (url) {
        return module.get(url).then(result => JSON.parse(result));
    }

    module.postJson = function (url, json) {
        return module.post(url, JSON.stringify(json), { 'Content-Type': 'application/json' });
    }

    return module;

});