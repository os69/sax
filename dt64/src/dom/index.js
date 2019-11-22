define(['./TtNode'], function (TtNode) {

    module = {
        createTtNode: function (params) {
            return new TtNode(params);
        },
        createTtNodeCreator: function (rendererCls) {
            return function (params) {
                var renderer = new rendererCls(params);
                return renderer.render();
            }
        }
    };

    return module;

});