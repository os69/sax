import { defineTest } from './runner/tester';
import { tt } from '../src/tt/tt';
import { ListFilter } from '../src/tt/list/listfilter';

export var tests = defineTest('List Filter', function (ctx) {

    var str = function (list) {
        return JSON.stringify(list);
    }

    var rnd = function (min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    var testList = function (list, visibility, spliceArgs) {

        var copyList = list.slice();
        var copyVisibility = visibility.slice();

        // (1) apply splice to input lists and  (2) create filtered list
        var list1 = list.slice();
        tt.core.splice(list1, spliceArgs[0], spliceArgs[1], spliceArgs[2]);
        var visibility1 = visibility.slice();
        tt.core.splice(visibility1, spliceArgs[0], spliceArgs[1], spliceArgs[3]);
        var listFilter1 = new ListFilter({ list: list1, visibility: visibility1 });

        // (1) create filtered list from input lists and (2) apply splice to filtered list
        var listFilter2 = new ListFilter({ list: list, visibility: visibility });
        tt.core.splice(list, spliceArgs[0], spliceArgs[1], spliceArgs[2]);
        listFilter2.splice.apply(listFilter2, spliceArgs);

        // check lists
        ctx.assertEquals(listFilter1.list.length, listFilter2.list.length);
        for (var i = 0; i < listFilter1.list.length; ++i) {
            ctx.assertEquals(listFilter1.list[i], listFilter2.list[i]);
        }

        // check filtered lists
        ctx.assertEquals(listFilter1.filteredList.length, listFilter2.filteredList.length);
        for (i = 0; i < listFilter1.filteredList.length; ++i) {
            ctx.assertEquals(listFilter1.filteredList[i], listFilter2.filteredList[i]);
        }

        // check admin lists
        ctx.assertEquals(listFilter1.adminList.length, listFilter2.adminList.length);
        for (i = 0; i < listFilter1.adminList.length; ++i) {
            var admin1 = listFilter1.adminList[i];
            var admin2 = listFilter2.adminList[i];
            ctx.assertEquals(admin1.index, admin2.index);
            ctx.assertEquals(admin1.visibility, admin2.visibility);
        }

        /*console.log('--');
        console.log('list  :', str(copyList), str(copyVisibility));
        console.log('splice:', str(spliceArgs));
        console.log('result list        :', str(listFilter2.list));
        console.log('result adminList   :', str(listFilter2.adminList));
        console.log('result filteredList:', str(listFilter2.filteredList));*/

    }

    var createRndVisibility = function (length) {
        var visibility = [];
        for (var j = 0; j < length; ++j) {
            if (rnd(0, 1) === 1) {
                visibility.push(true);
            } else {
                visibility.push(false);
            }
        }
        return visibility;
    }

    var createRndInsert = function () {
        var length = rnd(0, 4);
        var insert = ['A', 'B', 'C', 'D'].slice(0, length);
        return insert;
    }

    testList([1, 2, 3, 4], [true, true, true, true], [0, 1, ['A'], [true]]);
    testList([1, 2, 3, 4], [true, false, true, false], [0, 1, ['A'], [true]]);

    testList([1, 2, 3, 4], [true, true, true, true], [0, 0, ['A'], [true]]);
    testList([1, 2, 3, 4], [true, false, true, false], [0, 0, ['A'], [true]]);

    for (var i = 0; i < 10; ++i) {

        // list
        var list = [1, 2, 3, 4];

        // random visibility
        var visibility = createRndVisibility(list.length);

        // random index
        var index = rnd(0, list.length);

        // random deletes
        var numDel = rnd(0, list.length - index);

        // random insertion list
        var insertList = createRndInsert();
        var insertVisibility = createRndVisibility(insertList.length);

        // test                    
        testList(list, visibility, [index, numDel, insertList, insertVisibility]);
    }

});





