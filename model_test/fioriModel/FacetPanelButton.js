define(['../core/core', '../testEngine/Model', '../testEngine/Action'], function (core, Model, Action) {

    return Model.derive({
        meta: {
            name: 'FacetPanelButton'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
        },
        click: function () {
            this.parent.clickFacetPanelButton();
        },
        _hash: function () {
            return 'fpb';
        },
        _getActions: function () {
            return [new Action({ title: 'click facetpanel', execute: () => this.click() })];
        }
    });



});