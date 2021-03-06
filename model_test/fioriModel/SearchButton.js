define(['../core/core', '../testEngine/Model', '../testEngine/Action'], function (core, Model, Action) {

    return Model.derive({
        meta: {
            name: 'SearchButton'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
        },
        click: function () {
            this.parent.clickMagnifier();
        },
        _getActions: function () {
            return [new Action({ title: 'click magnifier', execute: () => this.click() })];
        },
        _hash: function () { return 'sb'; },
    });



});