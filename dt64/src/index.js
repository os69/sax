define(['./core/core', './core/event', './tt/property/index', './tt/list/index', './tt/object/index', './dom/index'], function (core, event, indexProperty, indexList, indexObject, indexDom) {

    var module = {};

    core.extend(module, indexProperty);
    core.extend(module, indexList);
    core.extend(module, indexObject);
    core.extend(module, indexDom);
    module.core = core;
    module.event = event;

    return module;

});
