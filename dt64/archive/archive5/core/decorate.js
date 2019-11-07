define([], function () {

    var module = {};

    module.decorate = function (obj, methodName, key, funcPre, funcPost) {
        var method = obj[methodName];
        if (method['decorator__' + key]) {
            return;
        }
        obj[methodName] = function () {
            funcPre && funcPre.apply(this, arguments);
            var value = method.apply(this, arguments);
            funcPost && funcPost.apply(this, arguments);
            return value;
        };
        obj[methodName]['decorator__' + key] = true;
    };

    module.isDecorated = function (obj, methodName, key) {
        var method = obj[methodName];
        return method && method['decorator__' + key];
    }

    return module;

});