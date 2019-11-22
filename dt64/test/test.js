define(['../src/index', './Tester'], function (tt, Tester) {

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

        tt.event.addEventHandler(a, 'hello', b, b.handler);
        ctx.assertEquals(count, 0, 'call check');
        tt.event.raiseEvent(a, 'hello', 13);
        ctx.assertEquals(count, 1, 'call check');

        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).sendersMap), 'a senders empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(a).receiversMap), 'a receivers not empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(a).receiverObjectManager.objMap), 'a receiver object manager is not empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).senderObjectManager.objMap), 'a sender object manager is empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(b).sendersMap), 'b senders not empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiversMap), 'b receivers empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiverObjectManager.objMap), 'b receiver object manager is empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(b).senderObjectManager.objMap), 'b sender object manager is not empty');

        tt.event.delete(a);

        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).sendersMap), 'a senders empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).receiversMap), 'a receivers empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).receiverObjectManager.objMap), 'a receiver object manager is empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).senderObjectManager.objMap), 'a sender object manager is empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).sendersMap), 'b senders empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiversMap), 'b receivers empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiverObjectManager.objMap), 'b receiver object manager is empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).senderObjectManager.objMap), 'b sender object manager is empty');

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

        tt.event.addEventHandler(a, 'hello', b, b.handler);
        ctx.assertEquals(count, 0, 'call check');
        tt.event.raiseEvent(a, 'hello', 13);
        ctx.assertEquals(count, 1, 'call check');

        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).sendersMap), 'a senders empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(a).receiversMap), 'a receivers not empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(a).receiverObjectManager.objMap), 'a receiver object manager is not empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).senderObjectManager.objMap), 'a sender object manager is empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(b).sendersMap), 'b senders not empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiversMap), 'b receivers empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiverObjectManager.objMap), 'b receiver object manager is empty');
        ctx.assert(!tt.core.isEmpty(tt.event.getEventData(b).senderObjectManager.objMap), 'b sender object manager is not empty');

        tt.event.delete(b);

        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).sendersMap), 'a senders empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).receiversMap), 'a receivers empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).receiverObjectManager.objMap), 'a receiver object manager is empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(a).senderObjectManager.objMap), 'a sender object manager is empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).sendersMap), 'b senders empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiversMap), 'b receivers empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).receiverObjectManager.objMap), 'b receiver object manager is empty');
        ctx.assert(tt.core.isEmpty(tt.event.getEventData(b).senderObjectManager.objMap), 'b sender object manager is empty');

    }

    // =======================================================================
    // property 1
    // =======================================================================

    testCases.property1 = function (ctx) {

        ctx.start('Property 1');

        var obj = {
            a: 1
        }

        tt.initProperty(obj, 'a');
        var oA = new tt.createPropertyObserver(obj, 'a');

        obj.setA(2);

        oA.delete();

    };

    // =======================================================================
    // calculated property 1
    // =======================================================================

    testCases.calculatedProperty1 = function (ctx) {

        ctx.start('Calculated Property 1');

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
        o1.setA(3);
        o3Observer = tt.createPropertyObserver(o3, 'c');
        console.log('hallo');

    }

    // =======================================================================
    // mapped list 1
    // =======================================================================

    testCases.mappedList1 = function (ctx) {

        ctx.start('Mapped List 1');

        var obj = {
            offset1: 10,
            offset2: 100
        };
        tt.initProperty(obj, 'offset1');
        tt.initProperty(obj, 'offset2');

        var list1 = [1, 2, 3, 4];
        var list2 = tt.createMappedList(list1, function (x) {
            console.log('list2', x);
            return x + obj.getOffset1();
        });

        //var l2o = tt.createListObserver(list2);

        var list3 = tt.createMappedList(list2, function (x) {
            console.log('list3', x);
            return x + obj.getOffset2();
        });

        var l3o = tt.createListObserver(list3);
        list1.push(5);
        obj.setOffset1(20);
        obj.setOffset2(200);
        l3o.delete();
        list1.push(6);
        l3o = tt.createListObserver(list3);

    };

    // =======================================================================
    // dom 1
    // =======================================================================

    testCases.dom1 = function (ctx) {

        ctx.start('Dom 1');

        var model = {
            label: '1',
            children: [
                { label: '1-1' },
                { label: '1-2' }
            ]
        };

        var createModelNode = function (model) {
            tt.initProperty(model, 'label');
            return tt.createTtNode({
                type: 'div',
                children: [
                    tt.createTtNode({
                        type: 'div',
                        text: function () { return model.getLabel(); }
                    }),
                    tt.createTtNode({
                        type: 'ul',
                        children: tt.createMappedList(model.children, function (child) {
                            tt.initProperty(child, 'label');
                            return tt.createTtNode({
                                type: 'li',
                                text: function () { return child.getLabel(); }
                            });
                        })
                    })
                ]
            })
        };

        var rootNode = createModelNode(model);
        document.body.appendChild(rootNode.getDomNode());

        model.children.push({ label: '1-3' });


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




