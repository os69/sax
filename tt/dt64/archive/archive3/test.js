define(['./Tester', '../core/eventing/event', '../core/dict', '../value/Value', '../value/CalculatedValue'], function (Tester, event, dict, Value, CalculatedValue) {

    var testCases = {};

    // =======================================================================
    // events 1
    // =======================================================================

    testCases.events1 = function (ctx) {

        ctx.start('Events 1');

        var count = 0;
        var a = {
            name: 'a'
        };

        var b = {
            name: 'b',
            handler: function (signal, message) {
                count++;
            }
        };

        event.addEventHandler(a, 'hello', b, b.handler);
        ctx.assertEquals(count, 0, 'call check');
        event.raiseEvent(a, 'hello', 13);
        ctx.assertEquals(count, 1, 'call check');

        ctx.assert(dict.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(!dict.isEmpty(a.__event__.receiversMap), 'a receivers not empty');
        ctx.assert(!dict.isEmpty(b.__event__.sendersMap), 'b senders not empty');
        ctx.assert(dict.isEmpty(b.__event__.receiversMap), 'b receivers empty');
        event.delete(a);
        ctx.assert(dict.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(dict.isEmpty(a.__event__.receiversMap), 'a receivers empty');
        ctx.assert(dict.isEmpty(b.__event__.sendersMap), 'b senders empty');
        ctx.assert(dict.isEmpty(b.__event__.receiversMap), 'b receivers empty');

    }

    // =======================================================================
    // events 2
    // =======================================================================

    testCases.events2 = function (ctx) {

        ctx.start('Events 2');

        var count = 0;
        var a = {
            name: 'a'
        };

        var b = {
            name: 'b',
            handler: function (signal, message) {
                count++;
            }
        };

        event.addEventHandler(a, 'hello', b, b.handler);
        ctx.assertEquals(count, 0, 'call check');
        event.raiseEvent(a, 'hello', 13);
        ctx.assertEquals(count, 1, 'call check');

        ctx.assert(dict.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(!dict.isEmpty(a.__event__.receiversMap), 'a receivers not empty');
        ctx.assert(!dict.isEmpty(b.__event__.sendersMap), 'b senders not empty');
        ctx.assert(dict.isEmpty(b.__event__.receiversMap), 'b receivers empty');
        event.delete(b);
        ctx.assert(dict.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(dict.isEmpty(a.__event__.receiversMap), 'a receivers empty');
        ctx.assert(dict.isEmpty(b.__event__.sendersMap), 'b senders empty');
        ctx.assert(dict.isEmpty(b.__event__.receiversMap), 'b receivers empty');

    }

    // =======================================================================
    // value 1
    // =======================================================================

    testCases.value1 = function (ctx) {

        ctx.start('Value 1');
        var a = new Value(10);
        ctx.assertEquals(10, a.get(), 'a.get equals 10');

        a.set(20);
        ctx.assertEquals(20, a.get(), 'a.get equals 20');

        var watcher = {
            handleGet: function (signal, message) {
                this.message = message;
            },
            clear: function () {
                this.message = null;
            }
        }
        event.addGlobalEventHandler('value-get', watcher, watcher.handleGet);
        watcher.clear();
        a.get();
        ctx.assert(watcher.message !== null, ' message not null');
        event.removeGlobalEventHandler('value-get', watcher, watcher.handleGet);
        watcher.clear();
        a.get();
        ctx.assert(watcher.message === null, ' message is null');

        event.addEventHandler(a, 'value-set', watcher, watcher.handleGet);
        watcher.clear();
        a.set(30);
        ctx.assert(watcher.message !== null, 'message not null');
        event.removeEventHandler(a, 'value-set', watcher, watcher.handleGet);
        watcher.clear();
        a.set(40);
        ctx.assert(watcher.message === null, 'message is null');

    }

    // =======================================================================
    // calculated value  1
    // =======================================================================

    testCases.calculatedValue1 = function (ctx) {

        ctx.start('Calculated Value 1');

        var a = new Value(10);
        var b = new Value(20);
        var c = new CalculatedValue(function () {
            return a.get() + b.get();
        });
        ctx.assertEquals(30, c.get(), 'c equals 30');
        a.set(11);
        ctx.assertEquals(31, c.get(), 'c equals 31');
    }

    // =======================================================================
    // calculated value  2
    // =======================================================================

    testCases.calculatedValue2 = function (ctx) {

        ctx.start('Calculated Value 2');

        var a = new Value(10);
        var b = new Value(20);
        var c = new Value(30);
        var addCFlag = new Value(false);

        var result = new CalculatedValue(function () {
            if (addCFlag.get()) {
                return a.get() + b.get() + c.get();
            } else {
                return a.get() + b.get();
            }
        });

        ctx.assertEquals(30, result.get(), 'result equals 30');
        a.set(11);
        ctx.assertEquals(31, result.get(), 'result equals 31');
        addCFlag.set(true);
        ctx.assertEquals(61, result.get(), 'result equals 61');

    }

    // =======================================================================
    // calculated value  3
    // =======================================================================

    testCases.calculatedValue3 = function (ctx) {

        ctx.start('Calculated Value 3');

        var map = function (listValue, mapFunction) {
            return new CalculatedValue(function (controller) {
                var list1 = listValue.get();
                var list2 = [];
                for (var i = 0; i < list1.length; ++i) {
                    value = list1[i];
                    controller.watch(false);
                    list2.push(mapFunction(value));
                    controller.watch(true);
                }
                return list2;
            });
        };

        var print = function (listValue) {
            var parts = [];
            var list = listValue.get();
            for (var i = 0; i < list.length; ++i) {
                parts.push(list[i].get());
            }
            console.log(parts.join(','));
        };

        var list1 = new Value([new Value(10), new Value(20), new Value(30)]);
        var list2 = map(list1, function (x) {
            return new CalculatedValue(function () {
                return x.get() + 1
            });
        });
        print(list1);
        print(list2);
        list1.get()[1].set(21);
        print(list1);
        print(list2);


        var list3 = new Value([new Value([new Value(1), new Value(2), new Value(3)]), new Value([new Value(10), new Value(20), new Value(30)])]);
        var list4 = map(list3, function (listValue) {
            return map(listValue, function (value) {
                return new CalculatedValue(function () {
                    return value.get() + 1
                });
            });
        });
        print(list3);
        print(list4);

    }


    // [1,2,3] 
    // +1 ==> [2,3,4] 

    // [1,2,3] 
    // ==> [{a:1},{a:2},{a:3}] 

    // [{a:1},{a:2},{a:3}] 
    // ==> [{b:1},{b:2},{b:3}]
    

    


    // =======================================================================
    // main
    // =======================================================================

    var tester = new Tester();
    for (var testCaseName in testCases) {
        var testCaseMethod = testCases[testCaseName];
        tester.run(testCaseMethod);
    }
    tester.result();

});

