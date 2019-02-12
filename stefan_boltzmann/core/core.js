define([], function () {

    "use strict";

    // =========================================================================	
    // packages 
    // =========================================================================
    var module = {};

    // =========================================================================   
    // helper: create object with prototype
    // =========================================================================   
    module.object = function (prototype) {
        var TmpFunction = function () { };
        TmpFunction.prototype = prototype;
        return new TmpFunction();
    };

    // =========================================================================   
    // helper: extend object
    // =========================================================================
    module.extend = function (o1, o2) {
        for (var key in o2) {
            o1[key] = o2[key];
        }
        return o1;
    };

    // =========================================================================   
    // helper: generate constructor function
    // =========================================================================
    var generateConstructorFunction = function () {
        var cf = function () {
            if (this.init) {
                this.init.apply(this, arguments);
            }
        };
        cf.derive = function (derivedPrototype) {
            return module.defineDerivedClass(cf, derivedPrototype);
        };
        return cf;
    };

    // =========================================================================   
    // create class
    // =========================================================================
    module.defineClass = function (prototype) {
        var Cls = generateConstructorFunction();
        Cls.prototype = prototype;
        Cls.prototype.constructor = Cls;
        return Cls;
    };

    // =========================================================================   
    // create derived class
    // =========================================================================   
    module.defineDerivedClass = function (parentClass, prototype) {
        var Cls = generateConstructorFunction();
        Cls.prototype = module.extend(module.object(parentClass.prototype), prototype);
        Cls.prototype.constructor = Cls;
        return Cls;
    };

    // =========================================================================
    // is array
    // =========================================================================	    
    module.isArray = function (obj) {
        if (Object.prototype.toString.call(obj) === '[object Array]') {
            return true;
        }
        return false;
    };

    // =========================================================================
    // generateId
    // =========================================================================	    
    module.maxId = 0;
    module.generateId = function () {
        return 'x' + (++module.maxId);
    };

    return module;
});