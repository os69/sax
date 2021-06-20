import { core } from '../../core/core';
import { event } from '../../core/event';
import { ListManager } from './listmanager';
import { CalculatedProperty } from '../property/calculatedproperty';

export var MappedListManager = core.defineDerivedClass(ListManager, {

    init: function (params) {
        this.list = params.list;
        this.map = params.map;
        this.targetList = params.targetList;
        ListManager.prototype.init.apply(this, arguments);
    },

    calculate: function () {
        core.removeAll(this.targetList);
        event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
        event.addEventHandler(this.list, 'push', this, this.pushHandler);
        for (var i = 0; i < this.list.length; ++i) {
            this.adminList.push(this.createAdmin(this.list, this.targetList, i));
        }
    },

    createAdmin: function (list, targetList, index) {
        var admin = {
            list: list,
            targetList: targetList,
            index: index,
            calculatedProperty: null
        };
        admin.calculatedProperty = new CalculatedProperty({
            start: true,
            calc: function () {
                return this.map(admin.list[admin.index], admin.index);
            }.bind(this),
            callback: function (value) {
                core.splice(admin.targetList, admin.index, 1, [value]);
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
        var insertTargetList = [];
        for (i = 0; i < insertElements.length; ++i) {
            insertAdmin.push(this.createAdmin(insertElements, insertTargetList, i));
        }
        core.splice(this.adminList, index, numDel, insertAdmin);
        for (i = index; i < index + insertElements.length; ++i) {
            var admin = this.adminList[i];
            admin.list = this.list;
            admin.targetList = this.targetList;
            admin.index = index;
        }
        for (i = index + insertElements.length; i < this.adminList.length; ++i) {
            var admin = this.adminList[i];
            admin.index += insertElements.length - numDel;
        }
        core.splice(this.targetList, index, numDel, insertTargetList);
    }

});

