
define(['../core/core', '../eventing/event', '../calc/property', './AutoCalc', './ListFilter'], function (core, event, propertyLib, AutoCalc, ListFilter) {


    var module = {};

    module.create = function (obj, propertyName, calc) {
        propertyLib.initProperty(obj, propertyName);
        return new AutoCalc({
            start: true,
            calc: calc,
            callback: function (value) {
                propertyLib._set(obj, propertyName, value);
            }
        });
    };

    module.createObject = function (definition) {
        var obj = {};
        for (propertyName in definition) {
            var propertyValue = definition[propertyName];
            switch (core.getType(propertyValue)) {
                case 'object':
                    obj[propertyName] = module.createObj(propertyValue);
                    break;
                case 'function':
                    module.create(obj, propertyName, propertyValue);
                    break;
                default:
                    obj[propertyName] = propertyValue;
            }

        }
        return obj;
    }

    MappedList = function () {
        this.init.apply(this, arguments);
    }

    MappedList.prototype = {
        init: function (params) {
            this.list = params.list;
            this.map = params.map;
            this.targetList = [];
            this.adminList = [];
            propertyLib.initList(this.list);
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
            var spliceArgs = [this.list.length - 1, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', spliceArgs);
        }
    }

    module.createMappedList = function (list, map) {
        var calcList = new MappedList({ list: list, map: map });
        return calcList.getList();
    };

    var DummyListFilter = function () {
        this.init.apply(this, arguments);
    }

    DummyListFilter.prototype = {
        init: function () {
            this.visibility = []
        },
        setVisibility: function (index, visibility) {
            this.visibility[index] = visibility;
        }
    }

    FilteredList = function () {
        this.init.apply(this, arguments);
    }

    FilteredList.prototype = {
        init: function (params) {
            this.list = params.list;
            this.filter = params.filter;
            this.targetList = [];
            this.adminList = [];
            this.visibility = [];
            this.listFilter = null;
            propertyLib.initList(this.list);
            event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
            event.addEventHandler(this.list, 'push', this, this.pushHandler);
            this.calculate();
        },
        getList: function () {
            return this.targetList;
        },
        calculate: function () {
            var dummyListFilter = new DummyListFilter();
            for (var i = 0; i < this.list.length; ++i) {
                this.adminList.push(this.createAdmin(this.list, dummyListFilter, i));
            }
            this.listFilter = new ListFilter(this.list, dummyListFilter.visibility);
            this.targetList = this.listFilter.filteredList;
            for (i = 0; i < this.adminList.length; ++i) {
                var admin = this.adminList[i];
                admin.listFilter = this.listFilter;
            }
        },
        createAdmin: function (list, listFilter, index) {
            var admin = {
                list: list,
                index: index,
                listFilter: listFilter,
                autoCalc: null
            };
            admin.autoCalc = new AutoCalc({
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

            var admin;
            var index = spliceArgs[0];
            var numDel = spliceArgs[1];
            var insertElements = spliceArgs.slice(2);

            for (var i = 0; i < numDel; ++i) {
                admin = this.adminList[index + i];
                admin.autoCalc.stop();
            }

            var insertAdmin = [];
            var dummyListFilter = new DummyListFilter();
            for (i = 0; i < insertElements.length; ++i) {
                var insertElement = insertElements[i];
                insertAdmin.push(this.createAdmin(insertElements, dummyListFilter, i));
            }
            core.splice(this.adminList, index, numDel, insertAdmin);

            for (i = index; i < index + insertElements.length; ++i) {
                admin = this.adminList[i];
                admin.list = this.list;
                admin.listFilter = this.listFilter;
                admin.index = i;
            }
            for (i = index + insertElements.length; i < this.adminList.length; ++i) {
                var admin = this.adminList[i];
                admin.index += insertElements.length - numDel;
            }
            this.listFilter.splice(index, numDel, insertElements, dummyListFilter.visibility);


        },
        pushHandler: function (signal, pushArgs) {
            var spliceArgs = [this.list.length - 1, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', spliceArgs);
        }
    }

    module.createFilteredList = function (list, filter) {
        var filteredList = new FilteredList({ list: list, filter: filter });
        return filteredList.getList();
    };

    return module;

    //   1 2 3 4 5 6
    //   v   v v
    //   1   3 4
});