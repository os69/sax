define(['../../core/core', '../../core/decorate', '../../core/event', './MappedListManager', '../property/PropertyCollector'], function (core, decorate, event, MappedListManager, PropertyCollector) {

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

    module.createMappedList = function (list, map) {
        module.initList(list);
        var mappedList = [];
        module.initList(mappedList);
        event.getEventData(mappedList).mappedListManager = new MappedListManager({
            list: list,
            map: map,
            targetList: mappedList
        });
        return mappedList;
    };

    var ListObserver = core.defineClass({
        init: function (params) {
            event.addEventHandler(params.list, 'splice', this, this.changed);
            event.addEventHandler(params.list, 'push', this, this.changed);
        },
        changed: function () {
            console.log(arguments);
        },
        delete: function () {
            event.delete(this);
        }
    });

    module.createListObserver = function (list) {
        return new ListObserver({ list: list });
    }

    return module;

});
