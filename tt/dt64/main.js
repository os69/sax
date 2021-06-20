define(['./src/core/core', './src/tt/property/mainProperty', './src/tt/list/mainList', './src/tt/object/mainObject', './src/dom/mainDom'], function (core, mainProperty, mainList, mainObject, mainDom) {

    var module = {};

    core.extend(module, mainProperty);
    core.extend(module, mainList);
    core.extend(module, mainObject);
    core.extend(module, mainDom);
    module.core = core;

    return module;

});
