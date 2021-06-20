define([], function () {

    var Tester = function () {
        this.init.apply(this, arguments);
    }

    Tester.prototype = {

        init: function (params) {
            this.fails = 0;
            this.preTestTasks = params.preTestTasks || [];
            this.postTestTasks = params.postTestTasks || [];
        },

        heading: function (title) {
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
            msg = msg || '';
            this.assert(real === expected, msg + ' -> real:' + real + ' expected:' + expected);
        },

        assertEqualsList: function (real, expected, msg) {
            msg = msg || '';
            if (real.length !== expected.length) {
                this.assert(false, msg + '-> lengths not equals real:' + JSON.stringify(real) + ' real-length:' + real.length + ' expected:' + JSON.stringify(expected) + ' expexcted-length:' + expected.length);
                return;
            }
            for (var i = 0; i < real.length; ++i) {
                var r = real[i];
                var e = expected[i];
                if (r !== e) {
                    this.assert(false, msg + ' -> elements with index ' + i + ' differ real:' + JSON.stringify(real) + ' real-element:' + r + ' expected:' + JSON.stringify(expected) + ' expected-element:' + e);
                    return;
                }
            }
            return this.assert(true, msg);
        },

        result: function () {
            if (this.fails > 0) {
                console.log('==> FAILED:' + this.fails);
            } else {
                console.log('==> OK');
            }
        },

        registerPreTestTask: function (task) {
            this.preTestTasks.push(task);
        },

        registerPostTestTask: function (task) {
            this.postTestTasks.push(task);
        },

        run: function (test) {
            if (test.skip) {
                return;
            }
            this.heading(test.label);
            for (var i = 0; i < this.preTestTasks.length; ++i) {
                var preTestTask = this.preTestTasks[i];
                preTestTask();
            }
            test.execute(this);
            for (var j = 0; j < this.postTestTasks.length; ++j) {
                var postTestTask = this.postTestTasks[j];
                postTestTask();
            }
        },

        runTestCases: function (testCases) {
            for (var testCaseName in testCases) {
                var testCase = testCases[testCaseName];
                this.run(testCase);
            }
        }

    };

    return Tester;

});