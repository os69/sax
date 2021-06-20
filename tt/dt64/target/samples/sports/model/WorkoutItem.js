"use strict";

define(['../../../src/index', './Object'], function (tt, Object) {
  var WorkoutItem = tt.core.defineDerivedClass(Object, {
    init: function init(params) {
      params.name = params.name || '';
      Object.prototype.init.apply(this, arguments);
      this.count = params.count || 1;
      this.duration = params.duration || 0;
      this.exercise = params.exercise;
      this.exercise.incItemUsageCounter();
      this.checked = false;
      this.postDeSerialize();
    },
    postDeSerialize: function postDeSerialize() {
      tt.initProperty(this, 'checked');
      tt.initProperty(this, 'count');
      tt.initProperty(this, 'duration');
      tt.createCalculatedProperty(this, 'totalDuration', function () {
        return this.getDuration() * this.getCount();
      }.bind(this));
      tt.createCalculatedProperty(this, 'elapsed', function () {
        return this.getChecked() ? this.getDuration() * this.getCount() : 0;
      }.bind(this));
    },
    delete: function _delete() {
      if (!Object.prototype.delete.apply(this, arguments)) {
        return false;
      }

      this.exercise.decItemUsageCounter();
      tt.core.removeObject(this.parent.items, this);
      return true;
    },
    deepClone: function deepClone() {
      return new WorkoutItem({
        name: this.name,
        count: this.count,
        duration: this.duration,
        exercise: this.exercise
      });
    },
    insertBefore: function insertBefore(item) {
      if (item === this) {
        return;
      }

      var oldParent = item.parent;
      tt.core.removeObject(oldParent.items, item);
      item.parent = this.parent;
      var index = this.parent.items.indexOf(this);
      this.parent.items.splice(index, 0, item);
    },
    insertCloneBefore: function insertCloneBefore(item) {
      var clonedWorkoutItem = item.deepClone();
      clonedWorkoutItem.parent = this.parent;
      var index = this.parent.items.indexOf(this);
      this.parent.items.splice(index, 0, clonedWorkoutItem);
    },
    createItemBefore: function createItemBefore(params) {
      params.parent = this.parent;
      var item = new WorkoutItem(params);
      var index = this.parent.items.indexOf(this);
      this.parent.items.splice(index, 0, item);
    }
  });
  return WorkoutItem;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL1dvcmtvdXRJdGVtLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsInR0IiwiT2JqZWN0IiwiV29ya291dEl0ZW0iLCJjb3JlIiwiZGVmaW5lRGVyaXZlZENsYXNzIiwiaW5pdCIsInBhcmFtcyIsIm5hbWUiLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsImNvdW50IiwiZHVyYXRpb24iLCJleGVyY2lzZSIsImluY0l0ZW1Vc2FnZUNvdW50ZXIiLCJjaGVja2VkIiwicG9zdERlU2VyaWFsaXplIiwiaW5pdFByb3BlcnR5IiwiY3JlYXRlQ2FsY3VsYXRlZFByb3BlcnR5IiwiZ2V0RHVyYXRpb24iLCJnZXRDb3VudCIsImJpbmQiLCJnZXRDaGVja2VkIiwiZGVsZXRlIiwiZGVjSXRlbVVzYWdlQ291bnRlciIsInJlbW92ZU9iamVjdCIsInBhcmVudCIsIml0ZW1zIiwiZGVlcENsb25lIiwiaW5zZXJ0QmVmb3JlIiwiaXRlbSIsIm9sZFBhcmVudCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImluc2VydENsb25lQmVmb3JlIiwiY2xvbmVkV29ya291dEl0ZW0iLCJjcmVhdGVJdGVtQmVmb3JlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUMsQ0FBQyxvQkFBRCxFQUF1QixVQUF2QixDQUFELEVBQXFDLFVBQVVDLEVBQVYsRUFBY0MsTUFBZCxFQUFzQjtBQUU3RCxNQUFJQyxXQUFXLEdBQUdGLEVBQUUsQ0FBQ0csSUFBSCxDQUFRQyxrQkFBUixDQUEyQkgsTUFBM0IsRUFBbUM7QUFFakRJLElBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCO0FBQ3BCQSxNQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBY0QsTUFBTSxDQUFDQyxJQUFQLElBQWUsRUFBN0I7QUFDQU4sTUFBQUEsTUFBTSxDQUFDTyxTQUFQLENBQWlCSCxJQUFqQixDQUFzQkksS0FBdEIsQ0FBNEIsSUFBNUIsRUFB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VixNQUFsQixHQUEyQixLQUFLQSxNQUFoQztBQUNBLFVBQUlNLEtBQUssR0FBRyxLQUFLTixNQUFMLENBQVlDLEtBQVosQ0FBa0JNLE9BQWxCLENBQTBCLElBQTFCLENBQVo7QUFDQSxXQUFLUCxNQUFMLENBQVlDLEtBQVosQ0FBa0JPLE1BQWxCLENBQXlCRixLQUF6QixFQUFnQyxDQUFoQyxFQUFtQ0ksaUJBQW5DO0FBQ0gsS0EzRGdEO0FBNkRqREMsSUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVUvQixNQUFWLEVBQWtCO0FBQ2hDQSxNQUFBQSxNQUFNLENBQUNvQixNQUFQLEdBQWdCLEtBQUtBLE1BQXJCO0FBQ0EsVUFBSUksSUFBSSxHQUFHLElBQUk1QixXQUFKLENBQWdCSSxNQUFoQixDQUFYO0FBQ0EsVUFBSTBCLEtBQUssR0FBRyxLQUFLTixNQUFMLENBQVlDLEtBQVosQ0FBa0JNLE9BQWxCLENBQTBCLElBQTFCLENBQVo7QUFDQSxXQUFLUCxNQUFMLENBQVlDLEtBQVosQ0FBa0JPLE1BQWxCLENBQXlCRixLQUF6QixFQUFnQyxDQUFoQyxFQUFtQ0YsSUFBbkM7QUFDSDtBQWxFZ0QsR0FBbkMsQ0FBbEI7QUFzRUEsU0FBTzVCLFdBQVA7QUFFSCxDQTFFSyxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFsnLi4vLi4vLi4vc3JjL2luZGV4JywgJy4vT2JqZWN0J10sIGZ1bmN0aW9uICh0dCwgT2JqZWN0KSB7XG5cbiAgICB2YXIgV29ya291dEl0ZW0gPSB0dC5jb3JlLmRlZmluZURlcml2ZWRDbGFzcyhPYmplY3QsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMubmFtZSA9IHBhcmFtcy5uYW1lIHx8ICcnO1xuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB0aGlzLmNvdW50ID0gcGFyYW1zLmNvdW50IHx8IDE7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gcGFyYW1zLmR1cmF0aW9uIHx8IDA7XG4gICAgICAgICAgICB0aGlzLmV4ZXJjaXNlID0gcGFyYW1zLmV4ZXJjaXNlO1xuICAgICAgICAgICAgdGhpcy5leGVyY2lzZS5pbmNJdGVtVXNhZ2VDb3VudGVyKCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucG9zdERlU2VyaWFsaXplKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9zdERlU2VyaWFsaXplOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0dC5pbml0UHJvcGVydHkodGhpcywgJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIHR0LmluaXRQcm9wZXJ0eSh0aGlzLCAnY291bnQnKTtcbiAgICAgICAgICAgIHR0LmluaXRQcm9wZXJ0eSh0aGlzLCAnZHVyYXRpb24nKTtcbiAgICAgICAgICAgIHR0LmNyZWF0ZUNhbGN1bGF0ZWRQcm9wZXJ0eSh0aGlzLCAndG90YWxEdXJhdGlvbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXREdXJhdGlvbigpICogdGhpcy5nZXRDb3VudCgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHR0LmNyZWF0ZUNhbGN1bGF0ZWRQcm9wZXJ0eSh0aGlzLCAnZWxhcHNlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDaGVja2VkKCkgPyB0aGlzLmdldER1cmF0aW9uKCkgKiB0aGlzLmdldENvdW50KCkgOiAwO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5kZWxldGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXhlcmNpc2UuZGVjSXRlbVVzYWdlQ291bnRlcigpO1xuICAgICAgICAgICAgdHQuY29yZS5yZW1vdmVPYmplY3QodGhpcy5wYXJlbnQuaXRlbXMsIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVlcENsb25lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFdvcmtvdXRJdGVtKHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgY291bnQ6IHRoaXMuY291bnQsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sXG4gICAgICAgICAgICAgICAgZXhlcmNpc2U6IHRoaXMuZXhlcmNpc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGlmIChpdGVtID09PSB0aGlzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9sZFBhcmVudCA9IGl0ZW0ucGFyZW50O1xuICAgICAgICAgICAgdHQuY29yZS5yZW1vdmVPYmplY3Qob2xkUGFyZW50Lml0ZW1zLCBpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhcmVudC5pdGVtcy5pbmRleE9mKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQuaXRlbXMuc3BsaWNlKGluZGV4LCAwLCBpdGVtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbnNlcnRDbG9uZUJlZm9yZTogZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBjbG9uZWRXb3Jrb3V0SXRlbSA9IGl0ZW0uZGVlcENsb25lKCk7XG4gICAgICAgICAgICBjbG9uZWRXb3Jrb3V0SXRlbS5wYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMucGFyZW50Lml0ZW1zLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5pdGVtcy5zcGxpY2UoaW5kZXgsIDAsIGNsb25lZFdvcmtvdXRJdGVtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVJdGVtQmVmb3JlOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICBwYXJhbXMucGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBXb3Jrb3V0SXRlbShwYXJhbXMpO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYXJlbnQuaXRlbXMuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Lml0ZW1zLnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFdvcmtvdXRJdGVtO1xuXG59KTsiXX0=