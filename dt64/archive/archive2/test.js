define(['./Tester', '../event', '../util/dict', '../property', '../util/decorate', '../calcProperty'], function (Tester, event, dict, property, decorate, calcProperty) {

    var simple1 = function (ctx) {

        ctx.start('Simple1');

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

    var simple2 = function (ctx) {

        ctx.start('Simple2');

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

    var property1 = function (ctx) {
        ctx.start('property1');
        var a = { name: 'a' };
        ctx.assert(!decorate.isDecorated(a, 'getName', 'raise-get-event'), 'check not decorated');
        property.init(a, 'name');
        ctx.assert(decorate.isDecorated(a, 'getName', 'raise-get-event'), 'check decorated');
        ctx.assertEquals(a.getName(), 'a', ' check value a');
    }

    var property2 = function (ctx) {
        ctx.start('property2');
        var called = false;
        var a = { name: 'a' };
        var b = {
            name: 'b', handler: function () {
                called = true;
            }
        }
        property.addChangedHandler(a, 'name', b, b.handler);
        ctx.assert(!called, 'not called');
        a.setName('aa');
        ctx.assert(called, 'called');
    }

    var calcProperty1 = function (ctx) {
        ctx.start('calcProperty1');

        var a = {
            c1: 10,
            c2: 20,
            c3: 100,
            result: 0
        };

        calcProperty.defineProperty(a, 'result', function () {
            var value = property.get(a, 'c1') + property.get(a, 'c2');
            if (value > 50) {
                value += property.get(a, 'c3');
            }
            return value;
        });

        ctx.assertEquals(a.result, 30, 'initial value');
        a.setC1(11);
        ctx.assertEquals(a.result, 31, 'changed value 1');
        a.setC1(12);
        ctx.assertEquals(a.result, 32, 'changed value 2');
        a.setC1(31);
        ctx.assertEquals(a.result, 151, 'changed value 3');
        a.setC3(1000);
        ctx.assertEquals(a.result, 1051, 'changed value 4');


    }

    var tester = new Tester();
    tester.run(simple1);
    tester.run(simple2);
    tester.run(property1);
    tester.run(property2);
    //tester.run(calcProperty1);
    tester.result();

});

