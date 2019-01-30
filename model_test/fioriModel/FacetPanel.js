define(['../core/core', '../testEngine/Model', '../testEngine/Action', './ShowMoreButton'], function (core, Model, Action, ShowMoreButton) {

    return Model.derive({
        meta: {
            name: 'FacetPanel'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
            this.showMoreButton = this.createSubModel(ShowMoreButton, {});
        },
        _hash: function () { return 'fp'; }
    });


});