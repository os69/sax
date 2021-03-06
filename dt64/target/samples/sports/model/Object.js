"use strict";

define(['../../../src/index'], function (tt) {
  return tt.core.defineClass({
    init: function init(params) {
      this.name = params.name;
      this.parent = params.parent;
      this.deleted = false;
      this.usageCounter = 0;
    },
    incUsageCounter: function incUsageCounter() {
      this.usageCounter++;
    },
    decUsageCounter: function decUsageCounter() {
      this.usageCounter--;
    },
    getName: function getName() {
      return this.name;
    },
    getDeleted: function getDeleted(deleted) {
      return this.deleted;
    },
    setDeleted: function setDeleted(deleted) {
      this.deleted = deleted;
    },
    delete: function _delete() {
      if (this.isRoot() || this.parent.isRoot() || this.usageCounter > 0) {
        return false;
      }

      this.setDeleted(true);
      return true;
    },
    isRoot: function isRoot() {
      return false;
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL09iamVjdC5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJ0dCIsImNvcmUiLCJkZWZpbmVDbGFzcyIsImluaXQiLCJwYXJhbXMiLCJuYW1lIiwicGFyZW50IiwiZGVsZXRlZCIsInVzYWdlQ291bnRlciIsImluY1VzYWdlQ291bnRlciIsImRlY1VzYWdlQ291bnRlciIsImdldE5hbWUiLCJnZXREZWxldGVkIiwic2V0RGVsZXRlZCIsImRlbGV0ZSIsImlzUm9vdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsb0JBQUQsQ0FBRCxFQUF5QixVQUFVQyxFQUFWLEVBQWM7QUFFekMsU0FBT0EsRUFBRSxDQUFDQyxJQUFILENBQVFDLFdBQVIsQ0FBb0I7QUFFdkJDLElBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCO0FBQ3BCLFdBQUtDLElBQUwsR0FBWUQsTUFBTSxDQUFDQyxJQUFuQjtBQUNBLFdBQUtDLE1BQUwsR0FBY0YsTUFBTSxDQUFDRSxNQUFyQjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQixDQUFwQjtBQUNILEtBUHNCO0FBU3ZCQyxJQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsV0FBS0QsWUFBTDtBQUNILEtBWHNCO0FBYXZCRSxJQUFBQSxlQUFlLEVBQUUsMkJBQVk7QUFDekIsV0FBS0YsWUFBTDtBQUNILEtBZnNCO0FBaUJ2QkcsSUFBQUEsT0FBTyxFQUFFLG1CQUFZO0FBQ2pCLGFBQU8sS0FBS04sSUFBWjtBQUNILEtBbkJzQjtBQXFCdkJPLElBQUFBLFVBQVUsRUFBRSxvQkFBVUwsT0FBVixFQUFtQjtBQUMzQixhQUFPLEtBQUtBLE9BQVo7QUFDSCxLQXZCc0I7QUF5QnZCTSxJQUFBQSxVQUFVLEVBQUUsb0JBQVVOLE9BQVYsRUFBbUI7QUFDM0IsV0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0gsS0EzQnNCO0FBNkJ2Qk8sSUFBQUEsTUFBTSxFQUFFLG1CQUFZO0FBQ2hCLFVBQUksS0FBS0MsTUFBTCxNQUFpQixLQUFLVCxNQUFMLENBQVlTLE1BQVosRUFBakIsSUFBeUMsS0FBS1AsWUFBTCxHQUFvQixDQUFqRSxFQUFvRTtBQUNoRSxlQUFPLEtBQVA7QUFDSDs7QUFDRCxXQUFLSyxVQUFMLENBQWdCLElBQWhCO0FBQ0EsYUFBTyxJQUFQO0FBQ0gsS0FuQ3NCO0FBcUN2QkUsSUFBQUEsTUFBTSxFQUFFLGtCQUFZO0FBQ2hCLGFBQU8sS0FBUDtBQUNIO0FBdkNzQixHQUFwQixDQUFQO0FBNENILENBOUNLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi8uLi9zcmMvaW5kZXgnXSwgZnVuY3Rpb24gKHR0KSB7XG5cbiAgICByZXR1cm4gdHQuY29yZS5kZWZpbmVDbGFzcyh7XG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gcGFyYW1zLm5hbWU7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHBhcmFtcy5wYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudXNhZ2VDb3VudGVyID0gMDtcbiAgICAgICAgfSxcblxuICAgICAgICBpbmNVc2FnZUNvdW50ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudXNhZ2VDb3VudGVyKys7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVjVXNhZ2VDb3VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnVzYWdlQ291bnRlci0tO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RGVsZXRlZDogZnVuY3Rpb24gKGRlbGV0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0RGVsZXRlZDogZnVuY3Rpb24gKGRlbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlZCA9IGRlbGV0ZWQ7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Jvb3QoKSB8fCB0aGlzLnBhcmVudC5pc1Jvb3QoKSB8fCB0aGlzLnVzYWdlQ291bnRlciA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldERlbGV0ZWQodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBpc1Jvb3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG5cbiAgICB9KTtcblxufSk7Il19