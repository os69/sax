define(['./EventData'], function (EventData) {

    var globalSender = {};

    var module = {

        addEventHandler: function (sender, signal, receiver, handler) {
            EventData.getEventData(sender).addEventReceiver(sender, signal, receiver, handler);
            EventData.getEventData(receiver).addEventSender(sender, signal, receiver, handler);
        },

        removeEventHandler: function (sender, signal, receiver, handler) {
            EventData.getEventData(sender).removeEventReceiver(sender, signal, receiver, handler);
            EventData.getEventData(receiver).removeEventSender(sender, signal, receiver, handler);
        },

        raiseEvent: function (sender, signal, message) {
            EventData.getEventData(sender).raiseEvent(sender, signal, message);
        },

        addGlobalEventHandler: function (signal, receiver, handler) {
            module.addEventHandler(globalSender, signal, receiver, handler);
        },

        removeGlobalEventHandler: function (signal, receiver, handler) {
            module.removeEventHandler(globalSender, signal, receiver, handler);
        },

        raiseGlobalEvent: function (signal, message) {
            module.raiseEvent(globalSender, signal, message);
        },

        delete: function (obj) {
            EventData.getEventData(obj).delete(obj);
        }

    };

    EventData.event = module;

    return module;

})