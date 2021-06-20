define([], function () {

    var module = {};

    module.createDict = function () {
        return {
            __dict: true
        };
    }
    
    return module;

});