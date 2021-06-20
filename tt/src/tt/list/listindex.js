import { core } from "../../core/core";
import { event } from "../../core/event";
import { MappedListManager } from "./mappedlistmanager";
import { FilteredListManager } from "./filteredlistmanager";
import { initList } from "./initlist";

var module = {};
export var listindex = module;

module.initList = initList;

module.createMappedList = function (list, map) {
    if (!list) {
        return [];
    }
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
    if (!list) {
        return [];
    }
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

module.createListObserver = function (list) {
    return new ListObserver({ list: list });
}

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
