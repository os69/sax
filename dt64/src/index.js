define(['./core/core', './core/event', './tt/property/index', './tt/list/index', './tt/object/index', './dom/index', './core/ajax', './core/Odb'], function (core, event, indexProperty, indexList, indexObject, indexDom, ajax, Odb) {

    var module = {};

    core.extend(module, indexProperty);
    core.extend(module, indexList);
    core.extend(module, indexObject);
    core.extend(module, indexDom);
    module.core = core;
    module.event = event;
    module.ajax = ajax;
    module.Odb = Odb;

    return module;

});
