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
        hash: function () {
            return 'SearchInputField:' + this.visible + ':' + this.searchTerm;
        },
        toggle: function () {
            this.visible = !this.visible;
        },
        setSearchTerm: function (searchTerm) {
            this.searchTerm = searchTerm;
        },
        getActions: function () {
            return [];
            /*if (this.visible) {
                return [
                    new Action({
                        title: 'enter searchterm sally',
                        execute: () => this.setSearchTerm('sally')
                    })];
            } else {
                return [];
            }*/
        }
    });



});