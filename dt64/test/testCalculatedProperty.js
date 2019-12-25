define(['../src/index'], function (tt) {

    var testCases = {};

    // =======================================================================
    // property 1
    // =======================================================================

    testCases.property1 = {
        label: 'Property 1',
        execute: function (ctx) {

            var obj = {
                a: 1
            }

            tt.initProperty(obj, 'a');
            var oA = new tt.createPropertyObserver(obj, 'a');

            obj.setA(2);

            oA.delete();

        }
    };

    // =======================================================================
    // calculated property 1
    // =======================================================================

    testCases.calculatedProperty1 = {
        label: 'Calculated Property 1',
        execute: function (ctx) {

            var o1 = { a: 1 };
            tt.initProperty(o1, 'a');

            var o2 = {};
            tt.createCalculatedProperty(o2, 'b', function () {
                return o1.getA() + 10;
            });

            var o3 = {};
            tt.createCalculatedProperty(o3, 'c', function () {
                return o2.getB() + 100;
            });

            var o3Observer = tt.createPropertyObserver(o3, 'c');
            ctx.assertEquals(o3.c, 111, 'c=111');
            o1.setA(2);
            ctx.assertEquals(o3.c, 112, 'c=112');
            o3Observer.delete();
            
        }
    };

    return testCases;
});




