/* global XMLHttpRequest, define, Promise */
define(['./core'], function (core) {

    var module = {};

    module.parseHeaders = function (header) {
        var headers = {};
        var lines = header.split('\n');
        for (var i = 0; i < lines.length; ++i) {
            var line = lines[i];
            var index = line.indexOf(':');
            if (index >= 0) {
                var name = line.slice(0, index).toLowerCase(); // headers are case insensitive -> normalize to lower case
                var value = line.slice(index + 1);
                headers[name] = value.trim();
            }
        }
        return headers;
    };

    module.encodeUrlParameters = function (parameters) {
        var result = [];
        for (var name in parameters) {
            var value = parameters[name];
            result.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
        }
        return result.join('&');
    };

    module.addEncodedUrlParameters = function (url, parameters) {
        if (!parameters) {
            return url;
        }
        var encodedParameters = module.encodeUrlParameters(parameters);
        if (encodedParameters.length > 0) {
            url += '?' + encodedParameters;
        }
        return url;
    };

    module.Exception = core.Exception.derive({
        _init: function (xhttp) {
            this.status = xhttp.status;
            this.statusText = xhttp.statusText;
            this.responseText = xhttp.responseText;
            this.headers = module.parseHeaders(xhttp.getAllResponseHeaders());
            core.Exception.prototype._init.apply(this, [{
                message: this.status + ': ' + this.statusText,
                description: this.responseText
            }]);
        }
    });

    var parseResult = function (properties, xhttp) {
        if (xhttp.status == 200 || xhttp.status == 201 || xhttp.status == 204) {
            return {
                data: properties.format === 'json' ? JSON.parse(xhttp.responseText) : xhttp.responseText,
                headers: module.parseHeaders(xhttp.getAllResponseHeaders())
            };
        }
        throw new module.Exception(xhttp);
    }

    var request = function (properties, callback) {

        // new http request
        var xhttp = new XMLHttpRequest();

        // callback handler
        if (callback) {
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4) {
                    callback(xhttp);
                }
            };
        }

        // add url parameters to url
        var url = module.addEncodedUrlParameters(properties.url, properties.parameters);

        // write headers to http request        
        xhttp.open(properties.method, url, properties.async);
        for (var headerName in properties.headers) {
            var headerValue = properties.headers[headerName];
            xhttp.setRequestHeader(headerName, headerValue);
        }

        // multipart
        var data = properties.data;
        if (properties.multipart) {
            var multipart = '';
            var boundary = Math.random().toString().substr(2);
            xhttp.setRequestHeader('content-type', "multipart/form-data; charset=utf-8; boundary=" + boundary);
            for (var i = 0; i < properties.data.length; ++i) {
                var part = properties.data[i];
                multipart += "--" + boundary
                    + "\r\nContent-Disposition: form-data; name=" + part.name + "; filename=" + part.filename
                    + "\r\nContent-type: text/xml"
                    + "\r\n\r\n" + part.data + "\r\n";
            }
            multipart += "--" + boundary + "--\r\n";
            data = multipart;
        }

        // send
        xhttp.send(data);

        return xhttp;
    };

    module.request = function (properties) {

        // set async flag
        properties.async = (typeof properties.async != 'undefined') ? properties.async : true;

        if (properties.async) {
            return new Promise(function (resolve, reject) {
                request(properties, function (xhttp) {
                    var result = parseResult(properties, xhttp);
                    resolve(result);
                });
            });
        } else {
            var xhttp = request(properties);
            return parseResult(properties, xhttp);
        }


    };

    return module;

});