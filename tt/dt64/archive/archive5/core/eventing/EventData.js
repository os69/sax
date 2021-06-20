define(['../core', './ObjectManager'], function (core, ObjectManager) {

    var objectManager = new ObjectManager();

    var EventData = function () {
        this.init.apply(this, arguments);
    }

    EventData.prototype = {

        init: function (obj) {
            this.receiversMap = {}; // { signal : { receiverId : [handler]}}
            this.sendersMap = {}; // { signal : { senderId:  [handler]}}
            this.id = core.generateId();
            this.obj = obj;
            objectManager.registerObject(this.id, this.obj);
        },

        addEventReceiver: function (sender, signal, receiver, handler) {
            var receivers = core.get(this.receiversMap, signal, core.defaultObject);
            var handlers = core.get(receivers, EventData.getEventData(receiver).id, core.defaultList);
            if (core.hasObject(handlers, handler)) {
                return;
            }
            handlers.push(handler);
        },

        removeEventReceiver: function (sender, signal, receiver, handler) {
            var receivers = core.get(this.receiversMap, signal, core.defaultObject);
            var handlers = core.get(receivers, EventData.getEventData(receiver).id, core.defaultList);
            core.removeObject(handlers, handler);
            if (handlers.length === 0) {
                delete receivers[EventData.getEventData(receiver).id];
            }
            if (core.isEmpty(receivers)) {
                delete this.receiversMap[signal];
            }
            if(core.isEmpty(this.receiversMap)){
                this.delete(this.obj);
            }
        },

        addEventSender: function (sender, signal, receiver, handler) {
            var senders = core.get(this.sendersMap, signal, core.defaultObject);
            var handlers = core.get(senders, EventData.getEventData(sender).id, core.defaultList);
            if (core.hasObject(handlers, handler)) {
                return;
            }
            handlers.push(handler);
        },

        removeEventSender: function (sender, signal, receiver, handler) {
            var senders = core.get(this.sendersMap, signal, core.defaultObject);
            var handlers = core.get(senders, EventData.getEventData(sender).id, core.defaultList);
            core.removeObject(handlers, handler);
            if (handlers.length === 0) {
                delete senders[EventData.getEventData(sender).id];
            }
            if (core.isEmpty(senders)) {
                delete this.sendersMap[signal];
            }
        },

        delete: function (obj) {
            var signal, receivers, receiverId, handlers, senders, senderId, i, handler;
            for (signal in this.receiversMap) {
                receivers = this.receiversMap[signal];
                for (receiverId in receivers) {
                    handlers = receivers[receiverId];
                    for (i = 0; i < handlers.length; ++i) {
                        handler = handlers[i];
                        EventData.event.removeEventHandler(this.obj, signal, objectManager.getObject(receiverId), handler);
                        //this.removeEventReceiver(this.obj, signal, objectManager.getObject(receiverId), handler);
                        //EventData.getEventData(objectManager.getObject(receiverId)).removeEventSender(this.obj, signal, objectManager.getObject(receiverId), handler);
                    }
                }
            }
            for (signal in this.sendersMap) {
                senders = this.sendersMap[signal];
                for (senderId in senders) {
                    handlers = senders[senderId];
                    for (i = 0; i < handlers.length; ++i) {
                        handler = handlers[i];
                        EventData.event.removeEventHandler(objectManager.getObject(senderId), signal, this.obj, handler);
                        //this.removeEventSender(objectManager.getObject(senderId), signal, this.obj, handler);
                        //EventData.getEventData(objectManager.getObject(senderId)).removeEventReceiver(objectManager.getObject(senderId), signal, this.obj, handler);
                    }
                }
            }
            objectManager.deleteObject(this.id);
        },

        raiseEvent: function (sender, signal, message) {
            var receivers = this.receiversMap[signal];
            if (!receivers) {
                return;
            }
            for (var receiverId in receivers) {
                var handlers = receivers[receiverId];
                var stableHandlers = handlers.slice();
                for (var i = 0; i < stableHandlers.length; ++i) {
                    var handler = stableHandlers[i];
                    if (!core.hasObject(handlers, handler)) {
                        continue;
                    }
                    handler.apply(objectManager.getObject(receiverId), [signal, message]);
                }
            }
        }
    };

    EventData.getEventData = function (obj) {
        var eventData = obj.__event__;
        if (eventData) {
            return eventData;
        }
        eventData = new EventData(obj);
        obj.__event__ = eventData;
        return eventData;
    }

    return EventData;

});