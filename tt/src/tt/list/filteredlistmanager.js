import { core } from "../../core/core";
import { event } from "../../core/event";
import { ListManager } from "./listmanager";
import { CalculatedProperty } from "../property/calculatedproperty";
import { ListFilter } from "./listfilter";
import { DummyListFilter } from "./dummylistfilter";

export var FilteredListManager = core.defineDerivedClass(ListManager, {

    init: function (params) {
        this.list = params.list;
        this.filter = params.filter;
        this.targetList = params.targetList;
        ListManager.prototype.init.apply(this, arguments);
    },

    calculate: function () {
        core.removeAll(this.targetList);
        event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
        event.addEventHandler(this.list, 'push', this, this.pushHandler);
        var dummyListFilter = new DummyListFilter();
        for (var i = 0; i < this.list.length; ++i) {
            this.adminList.push(this.createAdmin(this.list, i, dummyListFilter));
        }
        this.listFilter = new ListFilter({ list: this.list, filteredList: this.targetList, visibility: dummyListFilter.visibility });
        for (i = 0; i < this.adminList.length; ++i) {
            var admin = this.adminList[i];
            admin.listFilter = this.listFilter;
        }
    },

    createAdmin: function (list, index, listFilter) {
        var admin = {
            list: list,
            index: index,
            listFilter: listFilter,
            calculatedProperty: null
        };
        admin.calculatedProperty = new CalculatedProperty({
            start: true,
            calc: function () {
                return this.filter(admin.list[admin.index]);
            }.bind(this),
            callback: function (visibility) {
                admin.listFilter.setVisibility(admin.index, visibility);
            }.bind(this)
        });
        return admin;
    },

    spliceHandler: function (signal, spliceArgs) {
        var index = spliceArgs[0];
        var numDel = spliceArgs[1];
        var insertElements = spliceArgs.slice(2);
        for (var i = 0; i < numDel; ++i) {
            var admin = this.adminList[index + i];
            admin.calculatedProperty.stop();
        }
        var insertAdmin = [];
        var dummyListFilter = new DummyListFilter();
        for (i = 0; i < insertElements.length; ++i) {
            insertAdmin.push(this.createAdmin(insertElements, i, dummyListFilter));
        }
        core.splice(this.adminList, index, numDel, insertAdmin);
        for (i = index; i < index + insertElements.length; ++i) {
            var admin = this.adminList[i];
            admin.list = this.list;
            admin.index = index;
            admin.listFilter = this.listFilter;

        }
        for (i = index + insertElements.length; i < this.adminList.length; ++i) {
            var admin = this.adminList[i];
            admin.index += insertElements.length - numDel;
        }
        this.listFilter.splice(index, numDel, insertElements, dummyListFilter.visibility);
    }
});

