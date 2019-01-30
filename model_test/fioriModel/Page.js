define(['../core/core', '../testEngine/Model', './SearchButton', './SearchInputField', './SearchResultList', './ShowMoreDialog'], function (core, Model, SearchButton, SearchInputField, SearchResultList, ShowMoreDialog) {


    return Model.derive({
        meta: {
            name: 'Page'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
            this.searchButton = this.createSubModel(SearchButton, {});
            this.searchInputField = null;
            this.searchResultList = null;
            this.showMoreDialog = null;
        },
        clickMagnifier: function () {
            if (this.searchInputField) {
                if (!this.searchInputField.searchTerm) {
                    this.searchInputField.delete();
                    this.searchInputField = null;
                } else {
                    if (!this.searchResultList) {
                        this.searchResultList = this.createSubModel(SearchResultList, {});
                    }
                }
            } else {
                this.searchInputField = this.createSubModel(SearchInputField, {});
            }
        },
        clickShowMoreButton: function () {
            this.searchResultList.delete();
            this.searchResultList = null;
            this.searchButton.delete();
            this.searchButton = null;
            this.showMoreDialog = this.createSubModel(ShowMoreDialog, {});
        },
        _hash: function () { return 'p'; },
    });

});