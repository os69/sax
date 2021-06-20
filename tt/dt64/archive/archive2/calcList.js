define([], function () {


    module = {};

    var FilteredList = function () {
        this.init.apply(this, arguments);
    }

    FilteredList.prototype = {
        init: function (params) {
            this.list = params.list;
            this.filter = params.filter;
        },
        calculate: function(){
            
        }
    }

    module.filteredList = function (list, filter) {
        var filteredList = new FilteredList({
            list: list,
            filter: filter
        })
        return filteredList;
    }

    return module;

});