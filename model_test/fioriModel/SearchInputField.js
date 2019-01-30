define(['../core/core', '../testEngine/Model', '../testEngine/Action'], function (core, Model, Action) {

    return Model.derive({
        meta: {
            name: 'SearchInputField'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
            this.visible = false;
            this.searchTerm = '';
        },
        toggle: function () {
            this.visible = !this.visible;
        },
        setSearchTerm: function (searchTerm) {
            this.searchTerm = searchTerm;
        },
        _hash: function () {
            return 'sf:' + this.searchTerm;
        },
        _getActions: function () {
            if (!this.searchTerm) {
                return [
                    new Action({
                        title: 'enter searchterm sally',
                        execute: () => this.setSearchTerm('sally')
                    })];
            } else {
                return [
                 /*  new Action({
                        title: 'clear searchterm',
                        execute: () => this.setSearchTerm('')
                    })*/
                ];
            }
        }
    });



});