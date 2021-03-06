"use strict";

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
  };

  return module;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2RlY29yYXRlLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsIm1vZHVsZSIsImRlY29yYXRlIiwib2JqIiwibWV0aG9kTmFtZSIsImtleSIsImZ1bmNQcmUiLCJmdW5jUG9zdCIsIm1ldGhvZCIsImFwcGx5IiwiYXJndW1lbnRzIiwidmFsdWUiLCJpc0RlY29yYXRlZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLEVBQUQsRUFBSyxZQUFZO0FBRW5CLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUVBQSxFQUFBQSxNQUFNLENBQUNDLFFBQVAsR0FBa0IsVUFBVUMsR0FBVixFQUFlQyxVQUFmLEVBQTJCQyxHQUEzQixFQUFnQ0MsT0FBaEMsRUFBeUNDLFFBQXpDLEVBQW1EO0FBQ2pFLFFBQUlDLE1BQU0sR0FBR0wsR0FBRyxDQUFDQyxVQUFELENBQWhCOztBQUNBLFFBQUlJLE1BQU0sQ0FBQyxnQkFBZ0JILEdBQWpCLENBQVYsRUFBaUM7QUFDN0I7QUFDSDs7QUFDREYsSUFBQUEsR0FBRyxDQUFDQyxVQUFELENBQUgsR0FBa0IsWUFBWTtBQUMxQkUsTUFBQUEsT0FBTyxJQUFJQSxPQUFPLENBQUNHLEtBQVIsQ0FBYyxJQUFkLEVBQW9CQyxTQUFwQixDQUFYO0FBQ0EsVUFBSUMsS0FBSyxHQUFHSCxNQUFNLENBQUNDLEtBQVAsQ0FBYSxJQUFiLEVBQW1CQyxTQUFuQixDQUFaO0FBQ0FILE1BQUFBLFFBQVEsSUFBSUEsUUFBUSxDQUFDRSxLQUFULENBQWUsSUFBZixFQUFxQkMsU0FBckIsQ0FBWjtBQUNBLGFBQU9DLEtBQVA7QUFDSCxLQUxEOztBQU1BUixJQUFBQSxHQUFHLENBQUNDLFVBQUQsQ0FBSCxDQUFnQixnQkFBZ0JDLEdBQWhDLElBQXVDLElBQXZDO0FBQ0gsR0FaRDs7QUFjQUosRUFBQUEsTUFBTSxDQUFDVyxXQUFQLEdBQXFCLFVBQVVULEdBQVYsRUFBZUMsVUFBZixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDakQsUUFBSUcsTUFBTSxHQUFHTCxHQUFHLENBQUNDLFVBQUQsQ0FBaEI7QUFDQSxXQUFPSSxNQUFNLElBQUlBLE1BQU0sQ0FBQyxnQkFBZ0JILEdBQWpCLENBQXZCO0FBQ0gsR0FIRDs7QUFLQSxTQUFPSixNQUFQO0FBRUgsQ0F6QkssQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbXSwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIG1vZHVsZSA9IHt9O1xuXG4gICAgbW9kdWxlLmRlY29yYXRlID0gZnVuY3Rpb24gKG9iaiwgbWV0aG9kTmFtZSwga2V5LCBmdW5jUHJlLCBmdW5jUG9zdCkge1xuICAgICAgICB2YXIgbWV0aG9kID0gb2JqW21ldGhvZE5hbWVdO1xuICAgICAgICBpZiAobWV0aG9kWydkZWNvcmF0b3JfXycgKyBrZXldKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb2JqW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY1ByZSAmJiBmdW5jUHJlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGZ1bmNQb3N0ICYmIGZ1bmNQb3N0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIG9ialttZXRob2ROYW1lXVsnZGVjb3JhdG9yX18nICsga2V5XSA9IHRydWU7XG4gICAgfTtcblxuICAgIG1vZHVsZS5pc0RlY29yYXRlZCA9IGZ1bmN0aW9uIChvYmosIG1ldGhvZE5hbWUsIGtleSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gb2JqW21ldGhvZE5hbWVdO1xuICAgICAgICByZXR1cm4gbWV0aG9kICYmIG1ldGhvZFsnZGVjb3JhdG9yX18nICsga2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuXG59KTsiXX0=