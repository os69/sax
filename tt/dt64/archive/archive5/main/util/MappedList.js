define(['../../core/core', '../../core/decorate', '../../core/eventing/event','./AutoCalc'], function (core, decorate, event, AutoCalc) {


    MappedList = function () {
        this.init.apply(this, arguments);
    }

    MappedList.prototype = {
        init: function (params) {
            this.list = params.list;
            this.map = params.map;
            this.targetList = [];
            this.adminList = [];            
            event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
            event.addEventHandler(this.list, 'push', this, this.pushHandler);
            this.calculate();
        },
        getList: function () {
            return this.targetList;
        },
        calculate: function () {
            for (var i = 0; i < this.list.length; ++i) {
                this.adminList.push(this.createAdmin(this.list, this.targetList, i));
            }
        },
        createAdmin: function (list, targetList, index) {
            var admin = {
                list: list,
                targetList: targetList,
                index: index,
                autoCalc: null
            }
            admin.autoCalc = new AutoCalc({
                start: true,
                calc: function () {
                    return this.map(admin.list[admin.index]);
                }.bind(this),
                callback: function (value) {
                    admin.targetList[admin.index] = value;
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
                admin.autoCalc.stop();
            }
            var insertAdmin = [];
            var insertTargetList = [];
            for (i = 0; i < insertElements.length; ++i) {
                var insertElement = insertElements[i];
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
        },
        pushHandler: function (signal, pushArgs) {
            var spliceArgs = [this.list.length - pushArgs.length, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', spliceArgs);
        }
    }

    return MappedList;

});