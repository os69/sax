define([], function () {

    var module = {};

    module.methodName = module.methodName = function (type, property) {
        return type + property[0].toUpperCase() + property.slice(1);
    };

    return module;
});

