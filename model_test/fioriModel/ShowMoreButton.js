define(['../core/core', '../testEngine/Model', '../testEngine/Action'], function (core, Model, Action) {

    return Model.derive({
        meta: {
            name: 'ShowMoreButton'
        },
        init: function () {
            Model.prototype.init.apply(this, arguments);
        },
        click: function () {
            this.parent.parent.parent.clickShowMoreButton();
        },
        _hash: function () {
            return 'smb';
        },
        _getActions: function () {
            return [new Action({ title: 'click show more', execute: () => this.click() })];
        }
    });



});