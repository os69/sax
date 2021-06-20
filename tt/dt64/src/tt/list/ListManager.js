define(['../../core/core', '../../core/event'], function (core, event) {

    return core.defineClass({

        init: function (params) {
            this.adminList = [];
            this.usageCounter = 0;
            this.active = false;
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
            if (signal !== 'splice' && signal !== 'push' && signal !== 'setLength') {
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

        spliceHandler: function (signal, spliceArgs) {
            // override
        },

        pushHandler: function (signal, pushArgs) {
            var spliceArgs = [this.list.length - pushArgs.length, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', spliceArgs);
        }


    });

});