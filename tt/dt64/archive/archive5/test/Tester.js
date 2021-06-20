define([], function () {

    var Tester = function () {
        this.init.apply(this, arguments);
    }

    Tester.prototype = {

        init: function () {
            this.fails = 0;
        },

        start: function (title) {
            console.log('==', title, '==');
        },

        assert: function (condition, msg) {
            if (condition) {
                console.log('[ok  ]', msg);
            } else {
                console.log('[fail]', msg);
                this.fails++;
            }
        },

        assertEquals: function (real, expected, msg) {
            this.assert(real === expected, msg+' | real:'+real+' expected:'+expected);
        },

        result: function () {
            if (this.fails > 0) {
                console.log('==> FAILED');
            } else {
                console.log('==> OK');
            }
        },

        run: function (test) {
            test(this);
        }

    };

    return Tester;

});