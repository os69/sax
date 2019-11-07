define(['../main', '../core/core', './Tester', '../core/eventing/event', '../main/util/ListFilter', '../dom/Node'], function (haun, core, Tester, event, ListFilter, Node) {

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

        ctx.assert(core.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(!core.isEmpty(a.__event__.receiversMap), 'a receivers not empty');
        ctx.assert(!core.isEmpty(b.__event__.sendersMap), 'b senders not empty');
        ctx.assert(core.isEmpty(b.__event__.receiversMap), 'b receivers empty');
        event.delete(a);
        ctx.assert(core.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(core.isEmpty(a.__event__.receiversMap), 'a receivers empty');
        ctx.assert(core.isEmpty(b.__event__.sendersMap), 'b senders empty');
        ctx.assert(core.isEmpty(b.__event__.receiversMap), 'b receivers empty');

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

        ctx.assert(core.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(!core.isEmpty(a.__event__.receiversMap), 'a receivers not empty');
        ctx.assert(!core.isEmpty(b.__event__.sendersMap), 'b senders not empty');
        ctx.assert(core.isEmpty(b.__event__.receiversMap), 'b receivers empty');
        event.delete(b);
        ctx.assert(core.isEmpty(a.__event__.sendersMap), 'a senders empty');
        ctx.assert(core.isEmpty(a.__event__.receiversMap), 'a receivers empty');
        ctx.assert(core.isEmpty(b.__event__.sendersMap), 'b senders empty');
        ctx.assert(core.isEmpty(b.__event__.receiversMap), 'b receivers empty');

    }

    // =======================================================================
    // property 1
    // =======================================================================

    testCases.property1 = function (ctx) {

        ctx.start('Property 1');

        var obj = {
            a: 1
        }

        haun.initProperty(obj, 'a');

        obj.setA(2);

    };

    // =======================================================================
    // calculated property 1
    // =======================================================================

    testCases.calculatedProperty1 = function (ctx) {

        ctx.start('Calculated Property 1');

        var obj1 = {
            a: 1
        };
        haun.initProperty(obj1, 'a');

        haun.createProperty(obj1, 'b', function () {
            return obj1.getA() + 10;
        });

        ctx.assertEquals(obj1.b, 11, 'b=11');

        obj1.setA(2);

        ctx.assertEquals(obj1.b, 12, 'b=12');

    }

    // =======================================================================
    // calculated object 1
    // =======================================================================

    testCases.calculatedObject1 = function (ctx) {

        ctx.start('Calculated Object 1');

        var obj1 = {
            a: 1
        };
        haun.initProperty(obj1, 'a');

        var obj2 = haun.createObject({
            b: function () { return obj1.getA() + 1; },
            c: function () { return obj1.getA() + 10; }
        });

        ctx.assertEquals(obj2.b, 2, 'obj2.b = 2');
        ctx.assertEquals(obj2.c, 11, 'obj2.c = 11');
        obj1.setA(10);
        ctx.assertEquals(obj2.b, 11, 'obj2.b = 11');
        ctx.assertEquals(obj2.c, 20, 'obj2.c = 20');

    };

    // =======================================================================
    // calculated property 2
    // =======================================================================

    testCases.calculatedProperty2 = function (ctx) {

        ctx.start('Calculated Property 2');


        var salesOrder1 = {
            label: 'Sales Order1',
            positions: [1, 2, 3]
        }

        var model = {
            salesOrder: salesOrder1
        };


        haun.initObject(model);
        haun.initObject(salesOrder1);

        var ui = haun.createObject({
            so: function () {
                var salesOrder = model.getSalesOrder();
                return haun.createObject({
                    text: function () {
                        return salesOrder.getLabel();
                    },
                    items: haun.createMappedList(salesOrder.getPositions(), function (position) {
                        return position;
                    })
                });
            }
        });

    };

    // =======================================================================
    // list filter 1
    // =======================================================================

    testCases.listFilter1 = function (ctx) {

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
            core.splice(list1, spliceArgs[0], spliceArgs[1], spliceArgs[2]);
            var visibility1 = visibility.slice();
            core.splice(visibility1, spliceArgs[0], spliceArgs[1], spliceArgs[3]);
            var listFilter1 = new ListFilter(list1, visibility1);

            // (1) create filtered list from input lists and (2) apply splice to filtered list
            var listFilter2 = new ListFilter(list, visibility);
            core.splice(list, spliceArgs[0], spliceArgs[1], spliceArgs[2]);
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

            console.log('--');
            console.log('list  :', str(copyList), str(copyVisibility));
            console.log('splice:', str(spliceArgs));
            console.log('result list        :', str(listFilter2.list));
            console.log('result adminList   :', str(listFilter2.adminList));
            console.log('result filteredList:', str(listFilter2.filteredList));

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

        ctx.start('Listfilter 1');

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
            console.log('tc', i);
            testList(list, visibility, [index, numDel, insertList, insertVisibility]);
        }
    };

    // =======================================================================
    // mapped list 1
    // =======================================================================

    testCases.mappedList1 = function (ctx) {

        ctx.start('Mapped List 1');

        var list1 = [1, 2, 3, 4];
        var list2 = haun.createMappedList(list1, function (x) {
            return x + 10;
        });

        var list3 = haun.createMappedList(list2, function (x) {
            return x + 100;
        });


        list1.push(5);
        var a = 1;

    };

    // =======================================================================
    // filtered list 1
    // =======================================================================

    testCases.filteredList1 = function (ctx) {

        ctx.start('Filtered List 1');

        var list1 = [1, 2, 3, 4];
        var filteredList = haun.createFilteredList(list1, function (x) {
            return x % 2 === 0;
        });

        list1.push(5);
        list1.push(6);

    };

    // =======================================================================
    // concatenated list 1
    // =======================================================================

    testCases.concatenatedList1 = function (ctx) {

        ctx.start('Concatenated List 1');

        var list1 = [1, 2, 3, 4];
        var list2 = [10, 20, 30, 40];

        var cList = haun.createConcatenatedList(list1, list2);

        ctx.assertEquals(cList.length, list1.length + list2.length, 'check clist length');

        list1.push(5, 6);
        ctx.assertEquals(cList.length, list1.length + list2.length, 'check clist length');

        list2.push(50, 60);
        ctx.assertEquals(cList.length, list1.length + list2.length, 'check clist length');

    };


    // =======================================================================
    // sales order
    // =======================================================================

    testCases.salesOrder = function (ctx) {

        ctx.start('Sales Order');

        var model = {
            searchTerm: 'S',
            salesOrders: [
                {
                    label: 'Sales Order 1',
                    items: [{
                        label: 'Pos 1-10'
                    }, {
                        label: 'Pos 1-20'
                    }]
                },
                {
                    label: 'Sales Order 2',
                    items: [{
                        label: 'Pos 2-10'
                    }, {
                        label: 'Pos 2-20'
                    }]
                },
            ]
        };

        model.filteredSalesOrders = haun.createFilteredList(model.salesOrders, function (salesOrder) {
            haun.initProperty(salesOrder, 'label');
            var label = salesOrder.getLabel();
            haun.initProperty(model, 'searchTerm');
            var searchTerm = model.getSearchTerm();
            return label.indexOf(searchTerm) >= 0;
        });

        var node = new Node({
            type: 'div',
            children: haun.createMappedList(model.filteredSalesOrders, function (salesOrder) {
                return new Node({
                    type: 'div',
                    children: [
                        new Node({
                            type: 'div',
                            text: function () {
                                return salesOrder.getLabel() + '!';
                            }
                        }),
                        new Node({
                            type: 'ul',
                            children: haun.createMappedList(salesOrder.items, function (item) {
                                return new Node({
                                    type: 'li',
                                    text: item.label,
                                    click: function () {
                                        core.removeObject(salesOrder.items, item);
                                    }
                                });
                            })
                        })
                    ],
                });
            })
        });
        document.body.appendChild(node.domNode);

        model.setSearchTerm('2');
        model.setSearchTerm('S');
        model.salesOrders[1].setLabel('Sales Order 2 mod');
    };

    // =======================================================================
    // dict 1
    // =======================================================================

    testCases.dict1 = function (ctx) {

        ctx.start('Dictionary 1');

        var dict1 = haun.createDict();

        haun.setProperty(dict1, 'a', 1);

        var obj = haun.createObject({
            a: function () {
                return haun.getProperty(dict1, 'a') + 10;
            }
        });

        ctx.assertEquals(obj.a, 11, 'a=11');
        haun.setProperty(dict1, 'a', 2);
        ctx.assertEquals(obj.a, 12, 'a=12');

    };

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



