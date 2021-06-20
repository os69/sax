"use strict";

define(['../../core/core', '../../core/event', './Property', './CalculatedProperty'], function (core, event, Property, CalculatedProperty) {
  return core.defineDerivedClass(Property, {
    init: function init(params) {
      Property.prototype.init.apply(this, [params]);
      this.list = params.list;
      this.reducer = params.reducer;
      this.startValue = params.startValue;
      this.callback = params.callback;

      if (params.start) {
        this.start();
      }
    },
    start: function start() {
      if (this.active) {
        return;
      }

      this.active = true;
      this.calculate();
    },
    stop: function stop() {
      if (!this.active) {
        return;
      }

      event.removeEventHandler(this.list, 'splice', this, this.spliceHandler);
      event.removeEventHandler(this.list, 'push', this, this.pushHandler);
      this.calculatedProperty.stop();
      this.active = false;
    },
    calculate: function calculate() {
      event.addEventHandler(this.list, 'splice', this, this.spliceHandler);
      event.addEventHandler(this.list, 'push', this, this.pushHandler);

      this._calculate();
    },
    _calculate: function _calculate() {
      if (this.calculatedProperty) {
        this.calculatedProperty.stop();
      }

      this.calculatedProperty = new CalculatedProperty({
        start: true,
        calc: function () {
          var reducedValue = this.startValue;

          for (var i = 0; i < this.list.length; ++i) {
            var element = this.list[i];
            reducedValue = this.reducer(reducedValue, element);
          }

          return reducedValue;
        }.bind(this),
        callback: function (reducedValue) {
          this.callback(reducedValue);
        }.bind(this)
      });
    },
    spliceHandler: function spliceHandler(signal, spliceArgs) {
      this._calculate();
    },
    pushHandler: function pushHandler(signal, pushArgs) {
      this._calculate();
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90dC9wcm9wZXJ0eS9SZWR1Y2VkTGlzdFByb3BlcnR5LmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImNvcmUiLCJldmVudCIsIlByb3BlcnR5IiwiQ2FsY3VsYXRlZFByb3BlcnR5IiwiZGVmaW5lRGVyaXZlZENsYXNzIiwiaW5pdCIsInBhcmFtcyIsInByb3RvdHlwZSIsImFwcGx5IiwibGlzdCIsInJlZHVjZXIiLCJzdGFydFZhbHVlIiwiY2FsbGJhY2siLCJzdGFydCIsImFjdGl2ZSIsImNhbGN1bGF0ZSIsInN0b3AiLCJyZW1vdmVFdmVudEhhbmRsZXIiLCJzcGxpY2VIYW5kbGVyIiwicHVzaEhhbmRsZXIiLCJjYWxjdWxhdGVkUHJvcGVydHkiLCJhZGRFdmVudEhhbmRsZXIiLCJfY2FsY3VsYXRlIiwiY2FsYyIsInJlZHVjZWRWYWx1ZSIsImkiLCJsZW5ndGgiLCJlbGVtZW50IiwiYmluZCIsInNpZ25hbCIsInNwbGljZUFyZ3MiLCJwdXNoQXJncyJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsaUJBQUQsRUFBb0Isa0JBQXBCLEVBQXdDLFlBQXhDLEVBQXNELHNCQUF0RCxDQUFELEVBQWdGLFVBQVVDLElBQVYsRUFBZ0JDLEtBQWhCLEVBQXVCQyxRQUF2QixFQUFpQ0Msa0JBQWpDLEVBQXFEO0FBRXZJLFNBQU9ILElBQUksQ0FBQ0ksa0JBQUwsQ0FBd0JGLFFBQXhCLEVBQWtDO0FBQ3JDRyxJQUFBQSxJQUFJLEVBQUUsY0FBVUMsTUFBVixFQUFrQjtBQUNwQkosTUFBQUEsUUFBUSxDQUFDSyxTQUFULENBQW1CRixJQUFuQixDQUF3QkcsS0FBeEIsQ0FBOEIsSUFBOUIsRUFBb0MsQ0FBQ0YsTUFBRCxDQUFwQztBQUNBLFdBQUtHLElBQUwsR0FBWUgsTUFBTSxDQUFDRyxJQUFuQjtBQUNBLFdBQUtDLE9BQUwsR0FBZUosTUFBTSxDQUFDSSxPQUF0QjtBQUNBLFdBQUtDLFVBQUwsR0FBa0JMLE1BQU0sQ0FBQ0ssVUFBekI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCTixNQUFNLENBQUNNLFFBQXZCOztBQUNBLFVBQUlOLE1BQU0sQ0FBQ08sS0FBWCxFQUFrQjtBQUNkLGFBQUtBLEtBQUw7QUFDSDtBQUNKLEtBVm9DO0FBV3JDQSxJQUFBQSxLQUFLLEVBQUUsaUJBQVk7QUFDZixVQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDYjtBQUNIOztBQUNELFdBQUtBLE1BQUwsR0FBYyxJQUFkO0FBQ0EsV0FBS0MsU0FBTDtBQUNILEtBakJvQztBQWtCckNDLElBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLFVBQUksQ0FBQyxLQUFLRixNQUFWLEVBQWtCO0FBQ2Q7QUFDSDs7QUFDRGIsTUFBQUEsS0FBSyxDQUFDZ0Isa0JBQU4sQ0FBeUIsS0FBS1IsSUFBOUIsRUFBb0MsUUFBcEMsRUFBOEMsSUFBOUMsRUFBb0QsS0FBS1MsYUFBekQ7QUFDQWpCLE1BQUFBLEtBQUssQ0FBQ2dCLGtCQUFOLENBQXlCLEtBQUtSLElBQTlCLEVBQW9DLE1BQXBDLEVBQTRDLElBQTVDLEVBQWtELEtBQUtVLFdBQXZEO0FBQ0EsV0FBS0Msa0JBQUwsQ0FBd0JKLElBQXhCO0FBQ0EsV0FBS0YsTUFBTCxHQUFjLEtBQWQ7QUFDSCxLQTFCb0M7QUEyQnJDQyxJQUFBQSxTQUFTLEVBQUUscUJBQVk7QUFDbkJkLE1BQUFBLEtBQUssQ0FBQ29CLGVBQU4sQ0FBc0IsS0FBS1osSUFBM0IsRUFBaUMsUUFBakMsRUFBMkMsSUFBM0MsRUFBaUQsS0FBS1MsYUFBdEQ7QUFDQWpCLE1BQUFBLEtBQUssQ0FBQ29CLGVBQU4sQ0FBc0IsS0FBS1osSUFBM0IsRUFBaUMsTUFBakMsRUFBeUMsSUFBekMsRUFBK0MsS0FBS1UsV0FBcEQ7O0FBQ0EsV0FBS0csVUFBTDtBQUNILEtBL0JvQztBQWdDckNBLElBQUFBLFVBQVUsRUFBRSxzQkFBWTtBQUNwQixVQUFJLEtBQUtGLGtCQUFULEVBQTZCO0FBQ3pCLGFBQUtBLGtCQUFMLENBQXdCSixJQUF4QjtBQUNIOztBQUNELFdBQUtJLGtCQUFMLEdBQTBCLElBQUlqQixrQkFBSixDQUF1QjtBQUM3Q1UsUUFBQUEsS0FBSyxFQUFFLElBRHNDO0FBRTdDVSxRQUFBQSxJQUFJLEVBQUUsWUFBWTtBQUNkLGNBQUlDLFlBQVksR0FBRyxLQUFLYixVQUF4Qjs7QUFDQSxlQUFLLElBQUljLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS2hCLElBQUwsQ0FBVWlCLE1BQTlCLEVBQXNDLEVBQUVELENBQXhDLEVBQTJDO0FBQ3ZDLGdCQUFJRSxPQUFPLEdBQUcsS0FBS2xCLElBQUwsQ0FBVWdCLENBQVYsQ0FBZDtBQUNBRCxZQUFBQSxZQUFZLEdBQUcsS0FBS2QsT0FBTCxDQUFhYyxZQUFiLEVBQTJCRyxPQUEzQixDQUFmO0FBQ0g7O0FBQ0QsaUJBQU9ILFlBQVA7QUFDSCxTQVBLLENBT0pJLElBUEksQ0FPQyxJQVBELENBRnVDO0FBVTdDaEIsUUFBQUEsUUFBUSxFQUFFLFVBQVVZLFlBQVYsRUFBd0I7QUFDOUIsZUFBS1osUUFBTCxDQUFjWSxZQUFkO0FBQ0gsU0FGUyxDQUVSSSxJQUZRLENBRUgsSUFGRztBQVZtQyxPQUF2QixDQUExQjtBQWNILEtBbERvQztBQW1EckNWLElBQUFBLGFBQWEsRUFBRSx1QkFBVVcsTUFBVixFQUFrQkMsVUFBbEIsRUFBOEI7QUFDekMsV0FBS1IsVUFBTDtBQUNILEtBckRvQztBQXNEckNILElBQUFBLFdBQVcsRUFBRSxxQkFBVVUsTUFBVixFQUFrQkUsUUFBbEIsRUFBNEI7QUFDckMsV0FBS1QsVUFBTDtBQUNIO0FBeERvQyxHQUFsQyxDQUFQO0FBMkRILENBN0RLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi9jb3JlL2NvcmUnLCAnLi4vLi4vY29yZS9ldmVudCcsICcuL1Byb3BlcnR5JywgJy4vQ2FsY3VsYXRlZFByb3BlcnR5J10sIGZ1bmN0aW9uIChjb3JlLCBldmVudCwgUHJvcGVydHksIENhbGN1bGF0ZWRQcm9wZXJ0eSkge1xuXG4gICAgcmV0dXJuIGNvcmUuZGVmaW5lRGVyaXZlZENsYXNzKFByb3BlcnR5LCB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIFByb3BlcnR5LnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIFtwYXJhbXNdKTtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHBhcmFtcy5saXN0O1xuICAgICAgICAgICAgdGhpcy5yZWR1Y2VyID0gcGFyYW1zLnJlZHVjZXI7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VmFsdWUgPSBwYXJhbXMuc3RhcnRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2sgPSBwYXJhbXMuY2FsbGJhY2s7XG4gICAgICAgICAgICBpZiAocGFyYW1zLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LnJlbW92ZUV2ZW50SGFuZGxlcih0aGlzLmxpc3QsICdzcGxpY2UnLCB0aGlzLCB0aGlzLnNwbGljZUhhbmRsZXIpO1xuICAgICAgICAgICAgZXZlbnQucmVtb3ZlRXZlbnRIYW5kbGVyKHRoaXMubGlzdCwgJ3B1c2gnLCB0aGlzLCB0aGlzLnB1c2hIYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFByb3BlcnR5LnN0b3AoKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGNhbGN1bGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXZlbnQuYWRkRXZlbnRIYW5kbGVyKHRoaXMubGlzdCwgJ3NwbGljZScsIHRoaXMsIHRoaXMuc3BsaWNlSGFuZGxlcik7XG4gICAgICAgICAgICBldmVudC5hZGRFdmVudEhhbmRsZXIodGhpcy5saXN0LCAncHVzaCcsIHRoaXMsIHRoaXMucHVzaEhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIF9jYWxjdWxhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGN1bGF0ZWRQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFByb3BlcnR5LnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlZFByb3BlcnR5ID0gbmV3IENhbGN1bGF0ZWRQcm9wZXJ0eSh7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY2FsYzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVkdWNlZFZhbHVlID0gdGhpcy5zdGFydFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0aGlzLmxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICByZWR1Y2VkVmFsdWUgPSB0aGlzLnJlZHVjZXIocmVkdWNlZFZhbHVlLCBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVkdWNlZFZhbHVlO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHJlZHVjZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKHJlZHVjZWRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgc3BsaWNlSGFuZGxlcjogZnVuY3Rpb24gKHNpZ25hbCwgc3BsaWNlQXJncykge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlKCk7XG4gICAgICAgIH0sXG4gICAgICAgIHB1c2hIYW5kbGVyOiBmdW5jdGlvbiAoc2lnbmFsLCBwdXNoQXJncykge1xuICAgICAgICAgICAgdGhpcy5fY2FsY3VsYXRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7XG5cbiJdfQ==