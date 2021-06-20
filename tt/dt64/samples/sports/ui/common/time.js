define([], function () {

    return {
        pad: function (num, size) {
            var s = "000000000" + num;
            return s.substr(s.length - size);
        },
        int2ext: function (intSecs) {
            var min = Math.floor(intSecs / 60);
            var sec = intSecs - 60 * min;
            return this.pad(min, 2) + ':' + this.pad(sec, 2);
        },
        _parseNumber: function (numberString) {
            return parseInt(numberString);
        },
        ext2int: function (timeString) {
            var parts = timeString.split(':');
            return this._parseNumber(parts[0]) * 60 + this._parseNumber(parts[1]);
        }
    };

});