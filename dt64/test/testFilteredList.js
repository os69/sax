define(['../src/index'], function (tt) {

    var testCases = {};

    testCases.listFilter1 = {
        label: 'Filtered List 1',
        execute:
            function (ctx) {
                var list = [1, 2, 3, 4];
                var filteredList = tt.createFilteredList(list, function (element) {
                    return element % 2 === 0;
                });
                var o = tt.createListObserver(filteredList);
                list.push(5);
                ctx.assertEquals(filteredList.length, 2, 'filter list length');
                list.push(6);
                ctx.assertEquals(filteredList.length, 3, 'filter list length');
                o.delete();
            }
    };

    return testCases;
});




