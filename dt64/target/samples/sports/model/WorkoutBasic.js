"use strict";

define(['../../../src/index', './Workout', './WorkoutItem', './WorkoutItemCollection'], function (tt, Workout, WorkoutItem, WorkoutItemCollection) {
  return tt.core.defineDerivedClass(Workout, {
    init: function init(params) {
      Workout.prototype.init.apply(this, arguments);
      this.items = params.items || [];
      this.postDeSerialize();
    },
    postDeSerialize: function postDeSerialize() {
      tt.createReducedListProperty(this, 'totalDuration', this.items, function (accu, item) {
        return accu + item.getTotalDuration();
      }.bind(this), 0);
      tt.createReducedListProperty(this, 'elapsed', this.items, function (accu, item) {
        return accu + item.getElapsed();
      }.bind(this), 0);
    },
    createItem: function createItem(params) {
      params.parent = this;
      var item = new WorkoutItem(params);
      this.items.push(item);
      return item;
    },
    createItemCollection: function createItemCollection(params) {
      params.parent = this;
      var itemCollection = new WorkoutItemCollection(params);
      this.items.push(itemCollection);
      return itemCollection;
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL1dvcmtvdXRCYXNpYy5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJ0dCIsIldvcmtvdXQiLCJXb3Jrb3V0SXRlbSIsIldvcmtvdXRJdGVtQ29sbGVjdGlvbiIsImNvcmUiLCJkZWZpbmVEZXJpdmVkQ2xhc3MiLCJpbml0IiwicGFyYW1zIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJpdGVtcyIsInBvc3REZVNlcmlhbGl6ZSIsImNyZWF0ZVJlZHVjZWRMaXN0UHJvcGVydHkiLCJhY2N1IiwiaXRlbSIsImdldFRvdGFsRHVyYXRpb24iLCJiaW5kIiwiZ2V0RWxhcHNlZCIsImNyZWF0ZUl0ZW0iLCJwYXJlbnQiLCJwdXNoIiwiY3JlYXRlSXRlbUNvbGxlY3Rpb24iLCJpdGVtQ29sbGVjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsb0JBQUQsRUFBdUIsV0FBdkIsRUFBb0MsZUFBcEMsRUFBb0QseUJBQXBELENBQUQsRUFBaUYsVUFBVUMsRUFBVixFQUFjQyxPQUFkLEVBQXVCQyxXQUF2QixFQUFvQ0MscUJBQXBDLEVBQTJEO0FBRTlJLFNBQU9ILEVBQUUsQ0FBQ0ksSUFBSCxDQUFRQyxrQkFBUixDQUEyQkosT0FBM0IsRUFBb0M7QUFFdkNLLElBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCO0FBQ3BCTixNQUFBQSxPQUFPLENBQUNPLFNBQVIsQ0FBa0JGLElBQWxCLENBQXVCRyxLQUF2QixDQUE2QixJQUE3QixFQUFtQ0MsU0FBbkM7QUFDQSxXQUFLQyxLQUFMLEdBQWFKLE1BQU0sQ0FBQ0ksS0FBUCxJQUFnQixFQUE3QjtBQUNBLFdBQUtDLGVBQUw7QUFDSCxLQU5zQztBQVF2Q0EsSUFBQUEsZUFBZSxFQUFFLDJCQUFZO0FBQ3pCWixNQUFBQSxFQUFFLENBQUNhLHlCQUFILENBQTZCLElBQTdCLEVBQW1DLGVBQW5DLEVBQW9ELEtBQUtGLEtBQXpELEVBQWdFLFVBQVVHLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ2xGLGVBQU9ELElBQUksR0FBR0MsSUFBSSxDQUFDQyxnQkFBTCxFQUFkO0FBQ0gsT0FGK0QsQ0FFOURDLElBRjhELENBRXpELElBRnlELENBQWhFLEVBRWMsQ0FGZDtBQUdBakIsTUFBQUEsRUFBRSxDQUFDYSx5QkFBSCxDQUE2QixJQUE3QixFQUFtQyxTQUFuQyxFQUE4QyxLQUFLRixLQUFuRCxFQUEwRCxVQUFVRyxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUM1RSxlQUFPRCxJQUFJLEdBQUdDLElBQUksQ0FBQ0csVUFBTCxFQUFkO0FBQ0gsT0FGeUQsQ0FFeERELElBRndELENBRW5ELElBRm1ELENBQTFELEVBRWMsQ0FGZDtBQUdILEtBZnNDO0FBaUJ2Q0UsSUFBQUEsVUFBVSxFQUFFLG9CQUFVWixNQUFWLEVBQWtCO0FBQzFCQSxNQUFBQSxNQUFNLENBQUNhLE1BQVAsR0FBZ0IsSUFBaEI7QUFDQSxVQUFJTCxJQUFJLEdBQUcsSUFBSWIsV0FBSixDQUFnQkssTUFBaEIsQ0FBWDtBQUNBLFdBQUtJLEtBQUwsQ0FBV1UsSUFBWCxDQUFnQk4sSUFBaEI7QUFDQSxhQUFPQSxJQUFQO0FBQ0gsS0F0QnNDO0FBd0J2Q08sSUFBQUEsb0JBQW9CLEVBQUUsOEJBQVVmLE1BQVYsRUFBa0I7QUFDcENBLE1BQUFBLE1BQU0sQ0FBQ2EsTUFBUCxHQUFnQixJQUFoQjtBQUNBLFVBQUlHLGNBQWMsR0FBRyxJQUFJcEIscUJBQUosQ0FBMEJJLE1BQTFCLENBQXJCO0FBQ0EsV0FBS0ksS0FBTCxDQUFXVSxJQUFYLENBQWdCRSxjQUFoQjtBQUNBLGFBQU9BLGNBQVA7QUFDSDtBQTdCc0MsR0FBcEMsQ0FBUDtBQWtDSCxDQXBDSyxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFsnLi4vLi4vLi4vc3JjL2luZGV4JywgJy4vV29ya291dCcsICcuL1dvcmtvdXRJdGVtJywnLi9Xb3Jrb3V0SXRlbUNvbGxlY3Rpb24nXSwgZnVuY3Rpb24gKHR0LCBXb3Jrb3V0LCBXb3Jrb3V0SXRlbSwgV29ya291dEl0ZW1Db2xsZWN0aW9uKSB7XG5cbiAgICByZXR1cm4gdHQuY29yZS5kZWZpbmVEZXJpdmVkQ2xhc3MoV29ya291dCwge1xuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIFdvcmtvdXQucHJvdG90eXBlLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBwYXJhbXMuaXRlbXMgfHwgW107XG4gICAgICAgICAgICB0aGlzLnBvc3REZVNlcmlhbGl6ZSgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHBvc3REZVNlcmlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHQuY3JlYXRlUmVkdWNlZExpc3RQcm9wZXJ0eSh0aGlzLCAndG90YWxEdXJhdGlvbicsIHRoaXMuaXRlbXMsIGZ1bmN0aW9uIChhY2N1LCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjY3UgKyBpdGVtLmdldFRvdGFsRHVyYXRpb24oKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgICAgICAgICB0dC5jcmVhdGVSZWR1Y2VkTGlzdFByb3BlcnR5KHRoaXMsICdlbGFwc2VkJywgdGhpcy5pdGVtcywgZnVuY3Rpb24gKGFjY3UsIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdSArIGl0ZW0uZ2V0RWxhcHNlZCgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVJdGVtOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBpdGVtID0gbmV3IFdvcmtvdXRJdGVtKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVJdGVtQ29sbGVjdGlvbjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgcGFyYW1zLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgaXRlbUNvbGxlY3Rpb24gPSBuZXcgV29ya291dEl0ZW1Db2xsZWN0aW9uKHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbUNvbGxlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1Db2xsZWN0aW9uO1xuICAgICAgICB9LFxuXG5cbiAgICB9KTtcblxufSk7ICJdfQ==