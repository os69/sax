/* global window,  console */
(function () {

	// =========================================================================
	// create module
	// =========================================================================
	window.pc = {};
	var module = window.pc.core = {};

	// =========================================================================
	// extend
	// =========================================================================
	module.extend = function (o1, o2) {
		for (var key in o2) {
			o1[key] = o2[key];
		}
		return o1;
	};

	// =========================================================================
	// generate constructor function
	// =========================================================================
	module.generateConstructorFunction = function () {
		return function (param) {
			if (this.init) {
				this.init.apply(this, arguments);
			}
		};
	};

	// =========================================================================
	// define class
	// =========================================================================    
	module.defineClass = function (prototype) {
		var constructorFunction = module.generateConstructorFunction();
		constructorFunction.prototype = prototype;
		constructorFunction.prototype.constructor = constructorFunction;
		return constructorFunction;
	};

	// =========================================================================
	// define derived class
	// =========================================================================    
	module.defineDerivedClass = function (prototype, baseConstructorFunction) {
		var constructorFunction = module.generateConstructorFunction();
		var newPrototype = Object.create(baseConstructorFunction.prototype);
		module.extend(newPrototype, prototype);
		constructorFunction.prototype = newPrototype;
		constructorFunction.prototype.constructor = constructorFunction;
		return constructorFunction;
	};

	// =========================================================================
	// derive 
	// =========================================================================
	Function.prototype.derive = function (proto) {
		return module.defineDerivedClass(proto, this);
	};

})();