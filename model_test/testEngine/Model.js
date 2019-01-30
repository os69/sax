define(['../core/core'], function (core) {

    return core.defineClass({
        init: function () {
            this.subModels = [];
        },
        createSubModel: function (subModelClass, properties) {
            properties.parent = this;
            var subModel = new subModelClass(properties);
            subModel.parent = this;
            this.subModels.push(subModel);
            return subModel;
        },
        deleteSubModel: function (model) {
            for (var i = 0; i < this.subModels.length; ++i) {
                var subModel = this.subModels[i];
                if (subModel === model) {
                    this.subModels.splice(i, 1);
                    return;
                }
            }
        },
        delete: function () {
            this.parent.deleteSubModel(this);
        },
        _hash: function () {
            return '';
        },
        _getActions: function () {
            return [];
        },
        hash: function () {
            var totalHash = [this._hash()];
            for (var i = 0; i < this.subModels.length; ++i) {
                var subModel = this.subModels[i];
                var hash = subModel.hash();
                if (hash) {
                    totalHash.push(hash);
                }
            }
            return totalHash.join('/');
        },
        getActions: function () {
            var actions = [];
            actions.push.apply(actions, this._getActions());
            for (var i = 0; i < this.subModels.length; ++i) {
                var subModel = this.subModels[i];
                actions.push.apply(actions, subModel.getActions());
            }
            return actions;
        }
    });

});