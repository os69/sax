define(['../../core/core', '../../core/event', './MappedListManager', './FilteredListManager', './initList'], function (core, event, MappedListManager, FilteredListManager, initList) {

    var module = {};

    module.initList = initList.initList;

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

    module.createFilteredList = function (list, filter) {
        module.initList(list);
        var filteredList = [];
        module.initList(filteredList);
        event.getEventData(filteredList).filteredListManager = new FilteredListManager({
            list: list,
            filter: filter,
            targetList: filteredList
        });
        return filteredList;
    };

    var ListObserver = core.defineClass({
        init: function (params) {
            event.addEventHandler(params.list, 'splice', this, this.changed);
            event.addEventHandler(params.list, 'push', this, this.changed);
        },
        changed: function () {
           // console.log(arguments);
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
