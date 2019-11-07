define(['../core/core', '../core/decorate', '../core/eventing/event', './util/MappedList', './util/FilteredList', './util/ConcatenatedList'], function (core, decorate, event, MappedList, FilteredList, ConcatenatedList) {

    var module = {};

    module.initList = function (list) {
        if (!decorate.isDecorated('raise-push-event')) {
            decorate.decorate(list, 'push', 'raise-push-event', null, function () {
                event.raiseEvent(list, 'push', core.argumentsToList(arguments));
            });
            decorate.decorate(list, 'splice', 'raise-splice-event', null, function () {
                event.raiseEvent(list, 'splice', core.argumentsToList(arguments));
            });
        }
    }

    module.createMappedList = function (list, map) {
        module.initList(list);
        var calcList = new MappedList({ list: list, map: map });
        return calcList.getList();
    };

    module.createFilteredList = function (list, filter) {
        module.initList(list);
        var filteredList = new FilteredList({ list: list, filter: filter });
        return filteredList.getList();
    };

    module.createConcatenatedList = function () {
        var subLists = core.argumentsToList(arguments);
        for (var i = 0; i < subLists.length; ++i) {
            var subList = subLists[i];
            module.initList(subList);
        }
        var concatenatedList = new ConcatenatedList({
            subLists: subLists
        });
        return concatenatedList.getList();
    };

    return module;

});