define(['../core/core', './TtNode'], function (core, TtNode) {

    module = {
        createTtNode: function (params) {
            return new TtNode(params);
        },
        createTtNodeCreator: function (param) {
            var rendererCls;
            if (core.isObject(param)) {
                rendererCls = core.defineClass(param);
            } else {
                rendererCls = param;
            }
            return function (params) {
                var renderer = new rendererCls(params);
                var ttNode = renderer.render();
                ttNode.renderer = renderer;
                return ttNode;
            }
        }
    };

    return module;

});