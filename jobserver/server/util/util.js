var Duplex = require('stream').Duplex;

module.exports = {

    extend: function (o1, o2) {
        for (var property in o2) {
            o1[property] = o2[property];
        }
        return o1;
    },

    streamToBuffer: function (stream) {
        return new Promise(function (resolve, reject) {
            var buffers = [];
            stream.on('error', reject);
            stream.on('data', function (data) {
                buffers.push(data);
            })
            stream.on('end', function () {
                resolve(Buffer.concat(buffers));
            })
        });
    },

    bufferToStream: function (buffer) {
        var stream = new Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
}