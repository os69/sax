define(['../src/index'], function (tt) {

    var testCases = {};

    // =======================================================================
    // events 1
    // =======================================================================

    testCases.events1 = {
        label: 'Events 1',
        execute: function (ctx) {

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

            var numberHandlers = tt.event.getNumberHandlers();

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

            ctx.assertEquals(tt.event.getNumberHandlers(), numberHandlers, 'handler exit count');

        }
    };

    // =======================================================================
    // events 2
    // =======================================================================

    testCases.events2 = {
        label: 'Events 2',
        execute: function (ctx) {

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
    };

    return testCases;
});




