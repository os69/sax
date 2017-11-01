var MultiBuffer = function () {
    this.init.apply(this, arguments);
}

MultiBuffer.prototype = {
    init: function (input) {
        if (input) {
            if (Array.isArray(input)) {
                this.buffers = input;
                return;
            }
            this.splitMergedBuffer(input);
            return;
        }
        this.buffers = [];
    },
    boundary: '--boundary--',
    multiPartBoundary: '---------------7534875894758947823',
    add: function (buffer) {
        this.buffers.push(buffer);
    },
    get: function (i) {
        return this.buffers[i];
    },
    getNumberBuffers: function () {
        return this.buffers.length;
    },
    getMergedBuffer: function () {
        var admin = { bufferLengths: [] };
        for (var i = 0; i < this.buffers.length; ++i) {
            var buffer = this.buffers[i];
            admin.bufferLengths.push(buffer.length)
        }
        var adminBuffer = new Buffer(JSON.stringify(admin) + this.boundary);
        var buffers = [];
        buffers.push(adminBuffer);
        buffers.push.apply(buffers, this.buffers);
        return Buffer.concat(buffers);
    },
    splitMergedBuffer: function (mergedBuffer) {
        var index = mergedBuffer.indexOf(this.boundary);
        var admin = JSON.parse(mergedBuffer.slice(0, index).toString());     
        this.buffers = [];
        var start = index + this.boundary.length;
        for (var i = 0; i < admin.bufferLengths.length; ++i) {
            var bufferLength = admin.bufferLengths[i];
            var buffer = mergedBuffer.slice(start, start + bufferLength);
            this.buffers.push(buffer);
            start += bufferLength
        }
    },
    sendMultiPartResponse: function (res, fieldNames) {
        res.setHeader('Content-Type', 'multipart/form-data; boundary=' + this.multiPartBoundary);
        for (var i = 0; i < this.buffers.length; ++i) {
            var buffer = this.buffers[i];
            if (i > 0) {
                res.write('\r\n');
            }
            res.write('--' + this.multiPartBoundary + '\r\n');
            res.write('Content-Disposition: form-data; name="' + fieldNames[i] + '"; filename="'+fieldNames[i]+'"\r\n');           
            res.write('Content-Type: application/octet-stream\r\n');
            res.write('content-transfer-encoding: 8bit\r\n')
            res.write('\r\n');
            res.write(buffer);
        }
        res.write('\r\n--' + this.multiPartBoundary + '--\r\n');
        res.send();
    }
}

var test = function () {
    var buffer1 = new Buffer('Hello');
    var buffer2 = new Buffer('World');
    var multiBuffer = new MultiBuffer([buffer1, buffer2]);
    var mergedBuffer = multiBuffer.getMergedBuffer();
    multiBuffer = new MultiBuffer(mergedBuffer);

    for (var i = 0; i < multiBuffer.getNumberBuffers(); ++i) {
        var buffer = multiBuffer.get(i);
        console.log(buffer.toString());
    }
}

module.exports = MultiBuffer;