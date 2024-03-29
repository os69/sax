"use strict";

define(['../../core/core', '../../core/event', '../property/index'], function (core, event, indexProperty) {
  var module = {
    createDict: function createDict() {
      return {
        __dict: true
      };
    },
    createCalculatedObject: function createCalculatedObject(params) {
      var calculatedObject = {};

      for (var propertyName in params) {
        var propertyValue = params[propertyName];

        if (core.isFunction(propertyValue)) {
          indexProperty.createCalculatedProperty(calculatedObject, propertyName, propertyValue);
        } else {
          calculatedObject[propertyName] = propertyValue;
        }
      }

      return calculatedObject;
    }
  };
  return module;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90dC9vYmplY3QvaW5kZXguanMiXSwibmFtZXMiOlsiZGVmaW5lIiwiY29yZSIsImV2ZW50IiwiaW5kZXhQcm9wZXJ0eSIsIm1vZHVsZSIsImNyZWF0ZURpY3QiLCJfX2RpY3QiLCJjcmVhdGVDYWxjdWxhdGVkT2JqZWN0IiwicGFyYW1zIiwiY2FsY3VsYXRlZE9iamVjdCIsInByb3BlcnR5TmFtZSIsInByb3BlcnR5VmFsdWUiLCJpc0Z1bmN0aW9uIiwiY3JlYXRlQ2FsY3VsYXRlZFByb3BlcnR5Il0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUMsQ0FBQyxpQkFBRCxFQUFvQixrQkFBcEIsRUFBd0MsbUJBQXhDLENBQUQsRUFBK0QsVUFBVUMsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUJDLGFBQXZCLEVBQXNDO0FBRXZHLE1BQUlDLE1BQU0sR0FBRztBQUVUQyxJQUFBQSxVQUFVLEVBQUUsc0JBQVk7QUFDcEIsYUFBTztBQUNIQyxRQUFBQSxNQUFNLEVBQUU7QUFETCxPQUFQO0FBR0gsS0FOUTtBQVFUQyxJQUFBQSxzQkFBc0IsRUFBRSxnQ0FBVUMsTUFBVixFQUFrQjtBQUN0QyxVQUFJQyxnQkFBZ0IsR0FBRyxFQUF2Qjs7QUFDQSxXQUFLLElBQUlDLFlBQVQsSUFBeUJGLE1BQXpCLEVBQWlDO0FBQzdCLFlBQUlHLGFBQWEsR0FBR0gsTUFBTSxDQUFDRSxZQUFELENBQTFCOztBQUNBLFlBQUlULElBQUksQ0FBQ1csVUFBTCxDQUFnQkQsYUFBaEIsQ0FBSixFQUFvQztBQUNoQ1IsVUFBQUEsYUFBYSxDQUFDVSx3QkFBZCxDQUF1Q0osZ0JBQXZDLEVBQXlEQyxZQUF6RCxFQUF1RUMsYUFBdkU7QUFDSCxTQUZELE1BRU87QUFDSEYsVUFBQUEsZ0JBQWdCLENBQUNDLFlBQUQsQ0FBaEIsR0FBaUNDLGFBQWpDO0FBQ0g7QUFDSjs7QUFDRCxhQUFPRixnQkFBUDtBQUNIO0FBbkJRLEdBQWI7QUF1QkEsU0FBT0wsTUFBUDtBQUVILENBM0JLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi9jb3JlL2NvcmUnLCAnLi4vLi4vY29yZS9ldmVudCcsICcuLi9wcm9wZXJ0eS9pbmRleCddLCBmdW5jdGlvbiAoY29yZSwgZXZlbnQsIGluZGV4UHJvcGVydHkpIHtcblxuICAgIHZhciBtb2R1bGUgPSB7XG5cbiAgICAgICAgY3JlYXRlRGljdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBfX2RpY3Q6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlQ2FsY3VsYXRlZE9iamVjdDogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGNhbGN1bGF0ZWRPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlWYWx1ZSA9IHBhcmFtc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgICAgIGlmIChjb3JlLmlzRnVuY3Rpb24ocHJvcGVydHlWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhQcm9wZXJ0eS5jcmVhdGVDYWxjdWxhdGVkUHJvcGVydHkoY2FsY3VsYXRlZE9iamVjdCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYWxjdWxhdGVkT2JqZWN0W3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0eVZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjYWxjdWxhdGVkT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIG1vZHVsZTtcblxufSk7Il19