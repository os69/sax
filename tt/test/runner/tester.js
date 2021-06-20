
var tests = [];

export function defineTest(label, execute) {
    var test = { label: label, execute: execute };
    tests.push(test);
    return test;
}

defineTest.skip = function (label, execute) {
    var test = defineTest(label, execute);
    test.skip = true;
    return test;
}

defineTest.only = function (label, execute) {
    var test = defineTest(label, execute);
    test.only = true;
    return test;
}

export function Tester() {
    this.init.apply(this, arguments);
};

Tester.prototype = {

    init: function (params) {
        params = params || {};
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
        console.log('summary:')
        if (this.fails > 0) {
            console.log('======> FAILED:' + this.fails);
        } else {
            console.log('======> OK');
        }
    },

    run: function (test) {
        if (test.skip) {
            return;
        }
        tests = [];
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
        this.runSubTests(tests);
    },

    runSubTests: function (tests) {
        if (tests.length === 0) {
            return;
        }
        var onlyTests = [];
        var i, test;
        for (i = 0; i < tests.length; ++i) {
            test = tests[i];
            if (test.only) {
                onlyTests.push(test);
            }
        }
        if (onlyTests.length === 0) {
            onlyTests = tests;
        }
        for (var i = 0; i < onlyTests.length; ++i) {
            test = onlyTests[i];
            this.run(test);
        }
    }

};



