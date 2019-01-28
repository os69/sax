define(['../core/core', '../testEngine/Model', './SearchButton', './SearchInputField'], function (core, Model, SearchButton, SearchInputField) {


    return Model.derive({
        meta: {
            name: 'Page'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
            this.searchButton = this.createSubModel(SearchButton, {});
            this.searchInputField = this.createSubModel(SearchInputField, {});
        }
    });


});