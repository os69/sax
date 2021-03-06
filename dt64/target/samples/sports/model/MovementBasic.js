"use strict";

define(['../../../src/index', './Movement'], function (tt, Movement) {
  return tt.core.defineDerivedClass(Movement, {
    init: function init() {
      Movement.prototype.init.apply(this, arguments);
      this.muscles = [];
    },
    addMuscle: function addMuscle(muscle) {
      if (tt.core.hasObject(this.muscles, muscle)) {
        return;
      }

      this.muscles.push(muscle);
      muscle.incUsageCounter();
    },
    removeMuscle: function removeMuscle(muscle) {
      if (!tt.core.hasObject(this.muscles, muscle)) {
        return;
      }

      tt.core.removeObject(this.muscles, muscle);
      muscle.decUsageCounter();
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL01vdmVtZW50QmFzaWMuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwidHQiLCJNb3ZlbWVudCIsImNvcmUiLCJkZWZpbmVEZXJpdmVkQ2xhc3MiLCJpbml0IiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtdXNjbGVzIiwiYWRkTXVzY2xlIiwibXVzY2xlIiwiaGFzT2JqZWN0IiwicHVzaCIsImluY1VzYWdlQ291bnRlciIsInJlbW92ZU11c2NsZSIsInJlbW92ZU9iamVjdCIsImRlY1VzYWdlQ291bnRlciJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsb0JBQUQsRUFBdUIsWUFBdkIsQ0FBRCxFQUF1QyxVQUFVQyxFQUFWLEVBQWNDLFFBQWQsRUFBd0I7QUFFakUsU0FBT0QsRUFBRSxDQUFDRSxJQUFILENBQVFDLGtCQUFSLENBQTJCRixRQUEzQixFQUFxQztBQUV4Q0csSUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2RILE1BQUFBLFFBQVEsQ0FBQ0ksU0FBVCxDQUFtQkQsSUFBbkIsQ0FBd0JFLEtBQXhCLENBQThCLElBQTlCLEVBQW9DQyxTQUFwQztBQUNBLFdBQUtDLE9BQUwsR0FBZSxFQUFmO0FBQ0gsS0FMdUM7QUFPeENDLElBQUFBLFNBQVMsRUFBRSxtQkFBVUMsTUFBVixFQUFrQjtBQUN6QixVQUFJVixFQUFFLENBQUNFLElBQUgsQ0FBUVMsU0FBUixDQUFrQixLQUFLSCxPQUF2QixFQUFnQ0UsTUFBaEMsQ0FBSixFQUE2QztBQUN6QztBQUNIOztBQUNELFdBQUtGLE9BQUwsQ0FBYUksSUFBYixDQUFrQkYsTUFBbEI7QUFDQUEsTUFBQUEsTUFBTSxDQUFDRyxlQUFQO0FBQ0gsS0FidUM7QUFleENDLElBQUFBLFlBQVksRUFBRSxzQkFBVUosTUFBVixFQUFrQjtBQUM1QixVQUFJLENBQUNWLEVBQUUsQ0FBQ0UsSUFBSCxDQUFRUyxTQUFSLENBQWtCLEtBQUtILE9BQXZCLEVBQWdDRSxNQUFoQyxDQUFMLEVBQThDO0FBQzFDO0FBQ0g7O0FBQ0RWLE1BQUFBLEVBQUUsQ0FBQ0UsSUFBSCxDQUFRYSxZQUFSLENBQXFCLEtBQUtQLE9BQTFCLEVBQW1DRSxNQUFuQztBQUNBQSxNQUFBQSxNQUFNLENBQUNNLGVBQVA7QUFDSDtBQXJCdUMsR0FBckMsQ0FBUDtBQXlCSCxDQTNCSyxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFsnLi4vLi4vLi4vc3JjL2luZGV4JywgJy4vTW92ZW1lbnQnXSwgZnVuY3Rpb24gKHR0LCBNb3ZlbWVudCkge1xuXG4gICAgcmV0dXJuIHR0LmNvcmUuZGVmaW5lRGVyaXZlZENsYXNzKE1vdmVtZW50LCB7XG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgTW92ZW1lbnQucHJvdG90eXBlLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMubXVzY2xlcyA9IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGFkZE11c2NsZTogZnVuY3Rpb24gKG11c2NsZSkge1xuICAgICAgICAgICAgaWYgKHR0LmNvcmUuaGFzT2JqZWN0KHRoaXMubXVzY2xlcywgbXVzY2xlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubXVzY2xlcy5wdXNoKG11c2NsZSk7XG4gICAgICAgICAgICBtdXNjbGUuaW5jVXNhZ2VDb3VudGVyKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlTXVzY2xlOiBmdW5jdGlvbiAobXVzY2xlKSB7XG4gICAgICAgICAgICBpZiAoIXR0LmNvcmUuaGFzT2JqZWN0KHRoaXMubXVzY2xlcywgbXVzY2xlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR0LmNvcmUucmVtb3ZlT2JqZWN0KHRoaXMubXVzY2xlcywgbXVzY2xlKTtcbiAgICAgICAgICAgIG11c2NsZS5kZWNVc2FnZUNvdW50ZXIoKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbn0pOyJdfQ==