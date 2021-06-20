define(['../../core/core', '../../core/decorate', '../../core/eventing/event', './AutoCalc'], function (core, decorate, event, AutoCalc) {


    ConcatenatedList = function () {
        this.init.apply(this, arguments);
    }

    ConcatenatedList.prototype = {
        init: function (params) {
            this.subLists = params.subLists;
            this.targetList = null;
            for (var i = 0; i < this.subLists.length; ++i) {
                this.registerEventHandlers(i);
            }
            this.calculate();
        },
        getList: function () {
            return this.targetList;
        },
        registerEventHandlers: function (subListIndex) {
            var subList = this.subLists[subListIndex];
            event.addEventHandler(subList, 'splice', this, function (signal, spliceArgs) {
                this.spliceHandler(signal, subListIndex, spliceArgs);
            });
            event.addEventHandler(subList, 'push', this, function (signal, pushArgs) {
                this.pushHandler(signal, subListIndex, pushArgs);
            });
        },
        calculate: function () {
            this.targetList = Array.prototype.concat.apply([], this.subLists);
        },
        spliceHandler: function (signal, subListIndex, spliceArgs) {

            var index = spliceArgs[0];
            var numDel = spliceArgs[1];
            var insertElements = spliceArgs.slice(2);

            var deltaIndex = 0;
            for (var i = 0; i < subListIndex; ++i) {
                var subList = this.subLists[i];
                deltaIndex += subList.length;
            }

            core.splice(this.targetList, index + deltaIndex, numDel, insertElements);

        },
        pushHandler: function (signal, subListIndex, pushArgs) {
            var subList = this.subLists[subListIndex];
            var spliceArgs = [subList.length - pushArgs.length, 0];
            spliceArgs.push.apply(spliceArgs, pushArgs);
            this.spliceHandler('splice', subListIndex, spliceArgs);
        }
    }

    return ConcatenatedList;

});