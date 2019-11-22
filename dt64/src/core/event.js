define(['./core', './ObjectManager'], function (core, ObjectManager) {

    var module = {

        eventDataProperty: '__tt_event__',

        numHandlers: 0,

        addEventHandler: function (sender, signal, receiver, handler) {
            var success1 = module._addEventSenderToReceiver(sender, signal, receiver, handler);
            var success2 = module._addEventReceiverToSender(sender, signal, receiver, handler);
            if (success1 !== success2) {
                throw 'program error';
            }
            if (success1) {
                this.numHandlers++;
                module._notifyModificationHandlers('add', sender, signal, receiver, handler);
            }
        },

        removeEventHandler: function (sender, signal, receiver, handler) {
            var success1 = module._removeEventSenderFromReceiver(sender, signal, receiver, handler);
            var success2 = module._removeEventReceiverFromSender(sender, signal, receiver, handler);
            if (success1 !== success2) {
                throw 'program error';
            }
            if (success1) {
                this.numHandlers--;
                module._notifyModificationHandlers('remove', sender, signal, receiver, handler);
            }
        },

        delete: function (obj) {
            var eventData = module.getEventData(obj);
            // collect event subscriptions where obj is sender
            var signal, receivers, receiverId, handlers, senders, senderId, i, handler, subscriptions;
            subscriptions = [];
            for (signal in eventData.receiversMap) {
                receivers = eventData.receiversMap[signal];
                for (receiverId in receivers) {
                    handlers = receivers[receiverId];
                    for (i = 0; i < handlers.length; ++i) {
                        handler = handlers[i];
                        subscriptions.push([obj, signal, eventData.receiverObjectManager.getObject(receiverId), handler]);
                    }
                }
            }
            // collect event subscriptions  where obj is receiver
            for (signal in eventData.sendersMap) {
                senders = eventData.sendersMap[signal];
                for (senderId in senders) {
                    handlers = senders[senderId];
                    for (i = 0; i < handlers.length; ++i) {
                        handler = handlers[i];
                        subscriptions.push([eventData.senderObjectManager.getObject(senderId), signal, obj, handler]);
                    }
                }
            }
            // remove subscriptions
            for (var i = 0; i < subscriptions.length; ++i) {
                var subscription = subscriptions[i];
                module.removeEventHandler.apply(module, subscription);
            }
        },

        raiseEvent: function (sender, signal, message) {
            var eventData = module.getEventData(sender);
            var receivers = eventData.receiversMap[signal];
            if (!receivers) {
                return;
            }
            // collect events
            var events = [];
            var receiverId, handler, handlers;
            for (receiverId in receivers) {
                handlers = receivers[receiverId];
                for (var i = 0; i < handlers.length; ++i) {
                    handler = handlers[i];
                    events.push([receiverId, handler]);
                }
            }
            // process events
            for (var j = 0; j < events.length; ++j) {
                var event = events[j];
                receiverId = event[0];
                handler = event[1];
                receivers = eventData.receiversMap[signal];
                if (!receivers) {
                    return;
                }
                handlers = receivers[receiverId];
                if (!handlers) {
                    continue;
                }
                if (!core.hasObject(handlers, handler)) {
                    continue;
                }
                handler.apply(eventData.receiverObjectManager.getObject(receiverId), [signal, message]);
            }
        },

        addModificationHandler: function (obj, modificationHandler) {
            var eventData = module.getEventData(obj);
            if (core.hasObject(eventData.modificationHandlers, modificationHandler)) {
                return;
            }
            eventData.modificationHandlers.push(modificationHandler);
        },

        _notifyModificationHandlers: function (action, sender, signal, receiver, handler) {
            var notify = function (modificationHandlers) {
                for (var i = 0; i < modificationHandlers.length; ++i) {
                    var modificationHandler = modificationHandlers[i];
                    modificationHandler(action, sender, signal, receiver, handler);
                }
            }
            notify(module.getEventData(sender).modificationHandlers);
            notify(module.getEventData(receiver).modificationHandlers);
        },

        getEventData: function (obj) {
            var eventData = obj[this.eventDataProperty];
            if (eventData) {
                return eventData;
            }
            eventData = module._createEventData();
            obj[this.eventDataProperty] = eventData;
            return eventData;
        },

        _createEventData: function () {
            var eventData = {};
            eventData.receiversMap = {}; // { signal : { receiverId : [handler]}}
            eventData.sendersMap = {}; // { signal : { senderId:  [handler]}}
            eventData.id = core.generateId();
            eventData.receiverObjectManager = new ObjectManager();
            eventData.senderObjectManager = new ObjectManager();
            eventData.modificationHandlers = [];
            return eventData;
        },

        _addEventReceiverToSender: function (sender, signal, receiver, handler) {
            var senderEventData = module.getEventData(sender);
            var receiverEventData = module.getEventData(receiver);
            senderEventData.receiverObjectManager.registerObject(receiverEventData.id, receiver);
            var receivers = senderEventData.receiversMap[signal];
            if (!receivers) {
                senderEventData.receiversMap[signal] = receivers = {};
            }
            var handlers = receivers[receiverEventData.id];
            if (!handlers) {
                receivers[receiverEventData.id] = handlers = [];
            }
            if (core.hasObject(handlers, handler)) {
                return false;
            }
            handlers.push(handler);
            return true;
        },

        _removeEventReceiverFromSender: function (sender, signal, receiver, handler) {
            var senderEventData = module.getEventData(sender);
            var receiverEventData = module.getEventData(receiver);
            var receivers = senderEventData.receiversMap[signal];
            if (!receivers) {
                return false;
            }
            var handlers = receivers[receiverEventData.id];
            if (!handlers) {
                return false;
            }
            var numDel = core.removeObject(handlers, handler);
            var success = numDel > 0;
            if (handlers.length === 0) {
                delete receivers[receiverEventData.id];
                if (!module._senderHasReceiver(sender, receiver)) {
                    senderEventData.receiverObjectManager.deleteObject(receiverEventData.id);
                }
            }
            if (core.isEmpty(receivers)) {
                delete senderEventData.receiversMap[signal];
            }
            return success;
        },

        _senderHasReceiver: function (sender, receiver) {
            var senderEventData = module.getEventData(sender);
            var receiverEventData = module.getEventData(receiver);
            for (var signal in senderEventData.receiversMap) {
                var receivers = senderEventData.receiversMap[signal];
                var handlers = receivers[receiverEventData.id];
                if (handlers) {
                    return true;
                }
            }
            return false;
        },

        _receiverHasSender: function (receiver, sender) {
            var senderEventData = module.getEventData(sender);
            var receiverEventData = module.getEventData(receiver);
            for (var signal in receiverEventData.sendersMap) {
                var senders = receiverEventData.sendersMap[signal];
                var handlers = senders[senderEventData.id];
                if (handlers) {
                    return true;
                }
            }
            return false;
        },

        _addEventSenderToReceiver: function (sender, signal, receiver, handler) {
            var senderEventData = module.getEventData(sender);
            var receiverEventData = module.getEventData(receiver);
            receiverEventData.senderObjectManager.registerObject(senderEventData.id, sender);
            var senders = receiverEventData.sendersMap[signal];
            if (!senders) {
                receiverEventData.sendersMap[signal] = senders = {};
            }
            var handlers = senders[senderEventData.id];
            if (!handlers) {
                senders[senderEventData.id] = handlers = [];
            }
            if (core.hasObject(handlers, handler)) {
                return false;
            }
            handlers.push(handler);
            return true;
        },

        _removeEventSenderFromReceiver: function (sender, signal, receiver, handler) {
            var senderEventData = module.getEventData(sender);
            var receiverEventData = module.getEventData(receiver);
            var senders = receiverEventData.sendersMap[signal];
            if (!senders) {
                return false;
            }
            var handlers = senders[senderEventData.id];
            if (!handlers) {
                return false;
            }
            var numDel = core.removeObject(handlers, handler);
            var success = numDel > 0;
            if (handlers.length === 0) {
                delete senders[senderEventData.id];
                if (!module._receiverHasSender(receiver, sender)) {
                    receiverEventData.senderObjectManager.deleteObject(senderEventData.id);
                }
            }
            if (core.isEmpty(senders)) {
                delete receiverEventData.sendersMap[signal];
            }
            return success;
        },

    };

    return module;

});