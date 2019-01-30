define(['../core/core', '../testEngine/Model', './SearchButton', './SearchInputField', './SearchResultList'], function (core, Model, SearchButton, SearchInputField, SearchResultList) {


    return Model.derive({
        meta: {
            name: 'ShowMoreDialog'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
        },
        _hash: function () { return 'smd'; },
    });

});