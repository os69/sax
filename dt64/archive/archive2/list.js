define(['./event'], function (event) {

    var module = {};

    module.init = function (list) {

        // decorate push
        if (!decorate.isDecorated(list, 'push', 'raise-push-event')) {
            decorate.decorate(list, 'push', 'raise-push-event', null, function () {
                event.raiseGlobalEvent('push', list);
            });
        }

    };

    module.addChangedHandler = function (list, receiver, handler) {
        module.init(list);
        event.addEventHandler(list, 'push', receiver, handler);
    }

    module.removeChangedHandler = function (list, receiver, handler) {
        module.init(list);
        event.removeEventHandler(list, 'push', receiver, handler);
    }

    module.hasObject = function (list, obj) {
        return list.indexOf(obj) >= 0;
    }

    return module;

});