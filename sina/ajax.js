/* global XMLHttpRequest */
(function (global) {

    "use strict";

    global.sina.ajax = {};
    var module = global.sina.ajax;

    module.get = function (url, cb) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                cb(null, xhttp.responseText);
                return;
            }
            if (xhttp.readyState == 4) {
                cb(xhttp);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };

})(this);