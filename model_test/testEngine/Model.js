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
        hash: function () {
            var totalHash = [];
            for (var i = 0; i < this.subModels.length; ++i) {
                var subModel = this.subModels[i];
                totalHash.push(subModel.hash());
            }
            return totalHash.join('/');
        },
        getActions: function () {
            var actions = [];
            for (var i = 0; i < this.subModels.length; ++i) {
                var subModel = this.subModels[i];
                actions.push.apply(actions, subModel.getActions());
            }
            return actions;
        }
    });

});