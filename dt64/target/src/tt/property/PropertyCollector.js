"use strict";

define([], function () {
  var module = {};
  var propertyCollectors = [];

  var PropertyCollector = function PropertyCollector() {
    this.init.apply(this, arguments);
  };

  PropertyCollector.prototype = {
    init: function init(params) {
      this.addCallback = params.addCallback;
      this.properties = [];
    },
    addProperty: function addProperty(property) {
      for (var i = 0; i < this.properties.length; ++i) {
        var checkProperty = this.properties[i];

        if (checkProperty.obj === property.obj && checkProperty.propertyName === property.propertyName) {
          return;
        }
      }

      if (this.addCallback) {
        this.addCallback(property);
      }

      this.properties.push(property);
    },
    getProperties: function getProperties() {
      return this.properties;
    },
    stop: function stop() {
      if (propertyCollectors.length === 0) {
        throw 'program error';
      }

      if (propertyCollectors[propertyCollectors.length - 1] !== this) {
        throw 'program error';
      }

      propertyCollectors.pop();
      return this.getProperties();
    }
  };
  var notify = true;

  PropertyCollector.stopNotify = function () {
    notify = false;
  };

  PropertyCollector.startNotify = function () {
    notify = true;
  };

  PropertyCollector.notify = function (property) {
    if (!notify) {
      return;
    }

    if (propertyCollectors.length === 0) {
      return;
    }

    propertyCollector = propertyCollectors[propertyCollectors.length - 1];
    propertyCollector.addProperty(property);
  };

  PropertyCollector.create = function (params) {
    var propertyCollector = new PropertyCollector(params);
    propertyCollectors.push(propertyCollector);
    return propertyCollector;
  };

  return PropertyCollector;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90dC9wcm9wZXJ0eS9Qcm9wZXJ0eUNvbGxlY3Rvci5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJtb2R1bGUiLCJwcm9wZXJ0eUNvbGxlY3RvcnMiLCJQcm9wZXJ0eUNvbGxlY3RvciIsImluaXQiLCJhcHBseSIsImFyZ3VtZW50cyIsInByb3RvdHlwZSIsInBhcmFtcyIsImFkZENhbGxiYWNrIiwicHJvcGVydGllcyIsImFkZFByb3BlcnR5IiwicHJvcGVydHkiLCJpIiwibGVuZ3RoIiwiY2hlY2tQcm9wZXJ0eSIsIm9iaiIsInByb3BlcnR5TmFtZSIsInB1c2giLCJnZXRQcm9wZXJ0aWVzIiwic3RvcCIsInBvcCIsIm5vdGlmeSIsInN0b3BOb3RpZnkiLCJzdGFydE5vdGlmeSIsInByb3BlcnR5Q29sbGVjdG9yIiwiY3JlYXRlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUMsRUFBRCxFQUFLLFlBQVk7QUFFbkIsTUFBSUMsTUFBTSxHQUFHLEVBQWI7QUFFQSxNQUFJQyxrQkFBa0IsR0FBRyxFQUF6Qjs7QUFFQSxNQUFJQyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLEdBQVk7QUFDaEMsU0FBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCLElBQWhCLEVBQXNCQyxTQUF0QjtBQUNILEdBRkQ7O0FBSUFILEVBQUFBLGlCQUFpQixDQUFDSSxTQUFsQixHQUE4QjtBQUMxQkgsSUFBQUEsSUFBSSxFQUFFLGNBQVVJLE1BQVYsRUFBa0I7QUFDcEIsV0FBS0MsV0FBTCxHQUFtQkQsTUFBTSxDQUFDQyxXQUExQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsRUFBbEI7QUFDSCxLQUp5QjtBQUsxQkMsSUFBQUEsV0FBVyxFQUFFLHFCQUFVQyxRQUFWLEVBQW9CO0FBQzdCLFdBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLSCxVQUFMLENBQWdCSSxNQUFwQyxFQUE0QyxFQUFFRCxDQUE5QyxFQUFpRDtBQUM3QyxZQUFJRSxhQUFhLEdBQUcsS0FBS0wsVUFBTCxDQUFnQkcsQ0FBaEIsQ0FBcEI7O0FBQ0EsWUFBSUUsYUFBYSxDQUFDQyxHQUFkLEtBQXNCSixRQUFRLENBQUNJLEdBQS9CLElBQXNDRCxhQUFhLENBQUNFLFlBQWQsS0FBK0JMLFFBQVEsQ0FBQ0ssWUFBbEYsRUFBZ0c7QUFDNUY7QUFDSDtBQUNKOztBQUNELFVBQUksS0FBS1IsV0FBVCxFQUFzQjtBQUNsQixhQUFLQSxXQUFMLENBQWlCRyxRQUFqQjtBQUNIOztBQUNELFdBQUtGLFVBQUwsQ0FBZ0JRLElBQWhCLENBQXFCTixRQUFyQjtBQUNILEtBaEJ5QjtBQWlCMUJPLElBQUFBLGFBQWEsRUFBRSx5QkFBWTtBQUN2QixhQUFPLEtBQUtULFVBQVo7QUFDSCxLQW5CeUI7QUFvQjFCVSxJQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxVQUFJbEIsa0JBQWtCLENBQUNZLE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ2pDLGNBQU0sZUFBTjtBQUNIOztBQUNELFVBQUlaLGtCQUFrQixDQUFDQSxrQkFBa0IsQ0FBQ1ksTUFBbkIsR0FBNEIsQ0FBN0IsQ0FBbEIsS0FBc0QsSUFBMUQsRUFBZ0U7QUFDNUQsY0FBTSxlQUFOO0FBQ0g7O0FBQ0RaLE1BQUFBLGtCQUFrQixDQUFDbUIsR0FBbkI7QUFDQSxhQUFPLEtBQUtGLGFBQUwsRUFBUDtBQUNIO0FBN0J5QixHQUE5QjtBQWdDQSxNQUFJRyxNQUFNLEdBQUcsSUFBYjs7QUFFQW5CLEVBQUFBLGlCQUFpQixDQUFDb0IsVUFBbEIsR0FBK0IsWUFBWTtBQUN2Q0QsSUFBQUEsTUFBTSxHQUFHLEtBQVQ7QUFDSCxHQUZEOztBQUlBbkIsRUFBQUEsaUJBQWlCLENBQUNxQixXQUFsQixHQUFnQyxZQUFZO0FBQ3hDRixJQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNILEdBRkQ7O0FBSUFuQixFQUFBQSxpQkFBaUIsQ0FBQ21CLE1BQWxCLEdBQTJCLFVBQVVWLFFBQVYsRUFBb0I7QUFDM0MsUUFBSSxDQUFDVSxNQUFMLEVBQWE7QUFDVDtBQUNIOztBQUNELFFBQUlwQixrQkFBa0IsQ0FBQ1ksTUFBbkIsS0FBOEIsQ0FBbEMsRUFBcUM7QUFDakM7QUFDSDs7QUFDRFcsSUFBQUEsaUJBQWlCLEdBQUd2QixrQkFBa0IsQ0FBQ0Esa0JBQWtCLENBQUNZLE1BQW5CLEdBQTRCLENBQTdCLENBQXRDO0FBQ0FXLElBQUFBLGlCQUFpQixDQUFDZCxXQUFsQixDQUE4QkMsUUFBOUI7QUFDSCxHQVREOztBQVdBVCxFQUFBQSxpQkFBaUIsQ0FBQ3VCLE1BQWxCLEdBQTJCLFVBQVVsQixNQUFWLEVBQWtCO0FBQ3pDLFFBQUlpQixpQkFBaUIsR0FBRyxJQUFJdEIsaUJBQUosQ0FBc0JLLE1BQXRCLENBQXhCO0FBQ0FOLElBQUFBLGtCQUFrQixDQUFDZ0IsSUFBbkIsQ0FBd0JPLGlCQUF4QjtBQUNBLFdBQU9BLGlCQUFQO0FBQ0gsR0FKRDs7QUFNQSxTQUFPdEIsaUJBQVA7QUFFSCxDQXZFSyxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbW9kdWxlID0ge307XG5cbiAgICB2YXIgcHJvcGVydHlDb2xsZWN0b3JzID0gW107XG5cbiAgICB2YXIgUHJvcGVydHlDb2xsZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eUNvbGxlY3Rvci5wcm90b3R5cGUgPSB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkQ2FsbGJhY2sgPSBwYXJhbXMuYWRkQ2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgYWRkUHJvcGVydHk6IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnByb3BlcnRpZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tQcm9wZXJ0eSA9IHRoaXMucHJvcGVydGllc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tQcm9wZXJ0eS5vYmogPT09IHByb3BlcnR5Lm9iaiAmJiBjaGVja1Byb3BlcnR5LnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHkucHJvcGVydHlOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hZGRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHkpO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcm9wZXJ0aWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xuICAgICAgICB9LFxuICAgICAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHlDb2xsZWN0b3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRocm93ICdwcm9ncmFtIGVycm9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eUNvbGxlY3RvcnNbcHJvcGVydHlDb2xsZWN0b3JzLmxlbmd0aCAtIDFdICE9PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ3Byb2dyYW0gZXJyb3InO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvcGVydHlDb2xsZWN0b3JzLnBvcCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydGllcygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBub3RpZnkgPSB0cnVlO1xuXG4gICAgUHJvcGVydHlDb2xsZWN0b3Iuc3RvcE5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbm90aWZ5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgUHJvcGVydHlDb2xsZWN0b3Iuc3RhcnROb3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG5vdGlmeSA9IHRydWU7XG4gICAgfVxuXG4gICAgUHJvcGVydHlDb2xsZWN0b3Iubm90aWZ5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgIGlmICghbm90aWZ5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnR5Q29sbGVjdG9ycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwcm9wZXJ0eUNvbGxlY3RvciA9IHByb3BlcnR5Q29sbGVjdG9yc1twcm9wZXJ0eUNvbGxlY3RvcnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHByb3BlcnR5Q29sbGVjdG9yLmFkZFByb3BlcnR5KHByb3BlcnR5KTtcbiAgICB9O1xuXG4gICAgUHJvcGVydHlDb2xsZWN0b3IuY3JlYXRlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICB2YXIgcHJvcGVydHlDb2xsZWN0b3IgPSBuZXcgUHJvcGVydHlDb2xsZWN0b3IocGFyYW1zKTtcbiAgICAgICAgcHJvcGVydHlDb2xsZWN0b3JzLnB1c2gocHJvcGVydHlDb2xsZWN0b3IpO1xuICAgICAgICByZXR1cm4gcHJvcGVydHlDb2xsZWN0b3I7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm9wZXJ0eUNvbGxlY3RvcjtcblxufSk7Il19