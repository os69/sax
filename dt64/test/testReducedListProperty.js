define(['../src/index'], function (tt) {

    var testCases = {};

    testCases.reducedListProperty1 = {
        label: 'Reduced List Property 1',
        execute: function (ctx) {
            var list = [1, 2, 3];
            var obj = {};
            tt.createReducedListProperty(obj, 'sum', list, function (accu, element) {
                return accu + element;
            }, 0);
            var observer = tt.createPropertyObserver(obj, 'sum');
            ctx.assertEquals(obj.sum, 6, ' check sum');
            list.push(4);
            ctx.assertEquals(obj.sum, 10, ' check sum');
            observer.delete();

        }
    };

    return testCases;
});




