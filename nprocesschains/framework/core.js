/* global module, require,  console */

// =========================================================================
// create module
// =========================================================================
var exports = module.exports = {};

// =========================================================================
// extend
// =========================================================================
exports.extend = function (o1, o2) {
	for (var key in o2) {
		o1[key] = o2[key];
	}
	return o1;
};

// =========================================================================
// generate constructor function
// =========================================================================
exports.generateConstructorFunction = function () {
	return function (param) {
		if (this.init) {
			this.init.apply(this, arguments);
		}
	};
};

// =========================================================================
// define class
// =========================================================================    
exports.defineClass = function (prototype) {
	var constructorFunction = exports.generateConstructorFunction();
	constructorFunction.prototype = prototype;
	constructorFunction.prototype.constructor = constructorFunction;
	return constructorFunction;
};

// =========================================================================
// define derived class
// =========================================================================    
exports.defineDerivedClass = function (prototype, baseConstructorFunction) {
	var constructorFunction = exports.generateConstructorFunction();
	var newPrototype = Object.create(baseConstructorFunction.prototype);
	exports.extend(newPrototype, prototype);
	constructorFunction.prototype = newPrototype;
	constructorFunction.prototype.constructor = constructorFunction;
	return constructorFunction;
};

// =========================================================================
// derive 
// =========================================================================
Function.prototype.derive = function (proto) {
	return exports.defineDerivedClass(proto, this);
};

// =========================================================================
// generate id
// =========================================================================
var maxId = 0;
exports.generateId = function () {
	return '' + maxId++;
};