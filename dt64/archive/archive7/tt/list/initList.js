define(['../../core/core', '../../core/decorate', '../../core/event', '../property/PropertyCollector'], function (core, decorate, event, PropertyCollector) {

    var module = {};

    module.initList = function (list) {
        if (!decorate.isDecorated(list, 'push', 'raise-push-event')) {
            decorate.decorate(list, 'push', 'raise-push-event', null, function () {
                event.raiseEvent(list, 'push', core.argumentsToList(arguments));
                event.raiseEvent(list, 'setLength', list.length);
            });
        }
        if (!decorate.isDecorated(list, 'splice', 'raise-splice-event')) {
            decorate.decorate(list, 'splice', 'raise-splice-event', null, function () {
                event.raiseEvent(list, 'splice', core.argumentsToList(arguments));
                event.raiseEvent(list, 'setLength', list.length);
            });
        }
        if (!list.getLength) {
            list.getLength = function () {
                PropertyCollector.notify({ obj: list, propertyName: 'length' });
                return list.length;
            }
        }
    }

    return module;

});
