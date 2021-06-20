define(['../src/index'], function (tt) {

    var testCases = {};

    testCases.mappedList1 = {
        label: 'Mapped List 1',
        skip: false,
        execute: function (ctx) {

            var obj = {
                offset1: 10,
                offset2: 100
            };
            tt.initProperty(obj, 'offset1');
            tt.initProperty(obj, 'offset2');

            var list1 = [1, 2, 3, 4];
            var list2 = tt.createMappedList(list1, function (x) {
                return x + obj.getOffset1();
            });

            ctx.assertEqualsList(list2, []);
            var observer = tt.createListObserver(list2);
            ctx.assertEqualsList(list2, [11, 12, 13, 14]);
            observer.delete();

        }
    };

    testCases.mappedList2 = {
        label: 'Mapped List 2',
        execute: function (ctx) {

            var obj = {
                offset1: 10,
                offset2: 100
            };
            tt.initProperty(obj, 'offset1');
            tt.initProperty(obj, 'offset2');

            var list1 = [1, 2, 3, 4];
            var list2 = tt.createMappedList(list1, function (x) {
                return x + obj.getOffset1();
            });
            var list3 = tt.createMappedList(list2, function (x) {
                return x + obj.getOffset2();
            });
            ctx.assertEqualsList(list2, []);
            ctx.assertEqualsList(list3, []);
            var observer = tt.createListObserver(list3);
            ctx.assertEqualsList(list2, [11, 12, 13, 14]);
            ctx.assertEqualsList(list3, [111, 112, 113, 114]);


            list1.push(5);
            ctx.assertEqualsList(list2, [11, 12, 13, 14, 15]);
            ctx.assertEqualsList(list3, [111, 112, 113, 114, 115]);


            obj.setOffset1(20);
            ctx.assertEqualsList(list2, [21, 22, 23, 24, 25]);
            ctx.assertEqualsList(list3, [121, 122, 123, 124, 125]);

            obj.setOffset2(200);
            ctx.assertEqualsList(list2, [21, 22, 23, 24, 25]);
            ctx.assertEqualsList(list3, [221, 222, 223, 224, 225]);

            observer.delete();

        }
    };


    return testCases;
});




