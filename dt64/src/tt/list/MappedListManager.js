define(['../../core/core', '../../core/decorate', '../../core/event', '../property/CalculatedProperty'], function (core, decorate, event, CalculatedProperty) {


    return core.defineClass({

        init: function (params) {
            this.list = params.list;
            this.map = params.map;
            this.targetList = params.targetList;
            this.adminList = [];
            this.usageCounter = 0;
            this.active = false;
            this.isCalculating = false;
            event.addModificationHandler(this.targetList, this.eventHandlerModificationHandler.bind(this));
        },

        incUsage: function () {
            this.usageCounter++;
            if (this.usageCounter > 0 && !this.active) {
                this.start();
            }
        },

        decUsage: function () {
            if (this.usageCounter === 0) {
                throw 'program error';
            }
            this.usageCounter--;
            if (this.usageCounter === 0 & this.active) {
                this.stop();
            }
        },

        start: function () {
            if (this.active) {
                return;
            }
            this.active = true;
            this.calculate();
        },

        stop: function () {
            if (!this.active) {
                return;
            }
            event.removeEventHandler(this.list, 'splice', this, this.spliceHandler);
            event.removeEventHandler(this.list, 'push', this, this.pushHandler);
            for (var i = 0; i < this.adminList.length; ++i) {
                var admin = this.adminList[i];
                admin.calculatedProperty.stop();
            }
            this.adminList = [];
            this.active = false;
        },

        eventHandlerModificationHandler: function (action, sender, signal, receiver, handler) {
            if (sender !== this.targetList) {
                return;
            }
            if (signal !== 'splice' && signal !== 'push') {
                return;
            }
            switch (action) {
                case 'add':
                    this.incUsage();
                    break;
                case 'remove':
                    this.decUsage();
                    break;
            }
        },

        calculate: function () {
            if (this.isCalculating) {
                return false;
            }
            this.isCalculating = true;
            event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
            event.addEventHandler(this.list, 'push', this, this.pushHandler);         
            for (var i = 0; i < this.list.length; ++i) {
                this.adminList.push(this.createAdmin(this.list, this.targetList, i));
            }
            this.isCalculating = false;
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
                    return this.map(admin.list[admin.index]);
                }.bind(this),
                callback: function (value) {
                    core.splice(admin.targetList, admin.index, 1, [value]);
                }.bind(this)
            });
            return admin;
        },

        spliceHandler: function (signal, spliceArgs) {
            if (this.isCalculating) {
                return;
            }
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
        },

        pushHandler: function (signal, pushArgs) {
            if (this.isCalculating) {
                return;
            }
            var spliceArgs = [this.list.length - pushArgs.length, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', spliceArgs);
        }

    });

});