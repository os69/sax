define(['../../core/core', './ListFilter', './DummyListFilter', '../../core/eventing/event', './AutoCalc'], function (core, ListFilter, DummyListFilter, event, AutoCalc) {

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
            var spliceArgs = [this.list.length - pushArgs.length, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', spliceArgs);
        }
    }

    return FilteredList;

});