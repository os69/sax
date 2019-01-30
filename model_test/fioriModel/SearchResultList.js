define(['../core/core', '../testEngine/Model', '../testEngine/Action', './FacetPanelButton', './FacetPanel'], function (core, Model, Action, FacetPanelButton, FacetPanel) {

    return Model.derive({
        meta: {
            name: 'SearchResultList'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
            this.facetPanelButton = this.createSubModel(FacetPanelButton, {});
            this.facetPanel = null;
        },
        clickFacetPanelButton: function () {
            if (!this.facetPanel) {
                this.facetPanel = this.createSubModel(FacetPanel, {});
            } else {
                this.facetPanel.delete();
                this.facetPanel = null;
            }
        },
        _hash: function () { return 'srl'; }
    });

});