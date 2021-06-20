"use strict";

define(['../../../src/index', './Object'], function (tt, Object) {
  return tt.core.defineDerivedClass(Object, {
    init: function init() {
      Object.prototype.init.apply(this, arguments);
      this.itemUsageCounter = 0;
    },
    incItemUsageCounter: function incItemUsageCounter() {
      this.itemUsageCounter++;
    },
    decItemUsageCounter: function decItemUsageCounter() {
      this.itemUsageCounter--;
    },
    delete: function _delete() {
      if (!Object.prototype.delete.apply(this, arguments)) {
        return false;
      }

      tt.core.removeObject(this.parent.exercises, this);
      return true;
    },
    insertBefore: function insertBefore(exercise) {
      var oldParent = exercise.parent;
      tt.core.removeObject(oldParent.exercises, exercise);
      exercise.parent = this.parent;
      var index = this.parent.exercises.indexOf(this);
      this.parent.exercises.splice(index, 0, exercise);
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL0V4ZXJjaXNlLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsInR0IiwiT2JqZWN0IiwiY29yZSIsImRlZmluZURlcml2ZWRDbGFzcyIsImluaXQiLCJwcm90b3R5cGUiLCJhcHBseSIsImFyZ3VtZW50cyIsIml0ZW1Vc2FnZUNvdW50ZXIiLCJpbmNJdGVtVXNhZ2VDb3VudGVyIiwiZGVjSXRlbVVzYWdlQ291bnRlciIsImRlbGV0ZSIsInJlbW92ZU9iamVjdCIsInBhcmVudCIsImV4ZXJjaXNlcyIsImluc2VydEJlZm9yZSIsImV4ZXJjaXNlIiwib2xkUGFyZW50IiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUMsQ0FBQyxvQkFBRCxFQUF1QixVQUF2QixDQUFELEVBQXFDLFVBQVVDLEVBQVYsRUFBY0MsTUFBZCxFQUFzQjtBQUU3RCxTQUFPRCxFQUFFLENBQUNFLElBQUgsQ0FBUUMsa0JBQVIsQ0FBMkJGLE1BQTNCLEVBQW1DO0FBRXRDRyxJQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZEgsTUFBQUEsTUFBTSxDQUFDSSxTQUFQLENBQWlCRCxJQUFqQixDQUFzQkUsS0FBdEIsQ0FBNEIsSUFBNUIsRUFBa0NDLFNBQWxDO0FBQ0EsV0FBS0MsZ0JBQUwsR0FBd0IsQ0FBeEI7QUFDSCxLQUxxQztBQU90Q0MsSUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0IsV0FBS0QsZ0JBQUw7QUFDSCxLQVRxQztBQVd0Q0UsSUFBQUEsbUJBQW1CLEVBQUUsK0JBQVk7QUFDN0IsV0FBS0YsZ0JBQUw7QUFDSCxLQWJxQztBQWV0Q0csSUFBQUEsTUFBTSxFQUFFLG1CQUFZO0FBQ2hCLFVBQUksQ0FBQ1YsTUFBTSxDQUFDSSxTQUFQLENBQWlCTSxNQUFqQixDQUF3QkwsS0FBeEIsQ0FBOEIsSUFBOUIsRUFBb0NDLFNBQXBDLENBQUwsRUFBcUQ7QUFDakQsZUFBTyxLQUFQO0FBQ0g7O0FBQ0RQLE1BQUFBLEVBQUUsQ0FBQ0UsSUFBSCxDQUFRVSxZQUFSLENBQXFCLEtBQUtDLE1BQUwsQ0FBWUMsU0FBakMsRUFBNEMsSUFBNUM7QUFDQSxhQUFPLElBQVA7QUFDSCxLQXJCcUM7QUF1QnRDQyxJQUFBQSxZQUFZLEVBQUUsc0JBQVVDLFFBQVYsRUFBb0I7QUFDOUIsVUFBSUMsU0FBUyxHQUFHRCxRQUFRLENBQUNILE1BQXpCO0FBQ0FiLE1BQUFBLEVBQUUsQ0FBQ0UsSUFBSCxDQUFRVSxZQUFSLENBQXFCSyxTQUFTLENBQUNILFNBQS9CLEVBQTBDRSxRQUExQztBQUNBQSxNQUFBQSxRQUFRLENBQUNILE1BQVQsR0FBa0IsS0FBS0EsTUFBdkI7QUFDQSxVQUFJSyxLQUFLLEdBQUcsS0FBS0wsTUFBTCxDQUFZQyxTQUFaLENBQXNCSyxPQUF0QixDQUE4QixJQUE5QixDQUFaO0FBQ0EsV0FBS04sTUFBTCxDQUFZQyxTQUFaLENBQXNCTSxNQUF0QixDQUE2QkYsS0FBN0IsRUFBb0MsQ0FBcEMsRUFBdUNGLFFBQXZDO0FBQ0g7QUE3QnFDLEdBQW5DLENBQVA7QUFpQ0gsQ0FuQ0ssQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbJy4uLy4uLy4uL3NyYy9pbmRleCcsICcuL09iamVjdCddLCBmdW5jdGlvbiAodHQsIE9iamVjdCkge1xuXG4gICAgcmV0dXJuIHR0LmNvcmUuZGVmaW5lRGVyaXZlZENsYXNzKE9iamVjdCwge1xuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5pdGVtVXNhZ2VDb3VudGVyID0gMDtcbiAgICAgICAgfSxcblxuICAgICAgICBpbmNJdGVtVXNhZ2VDb3VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1Vc2FnZUNvdW50ZXIrKztcbiAgICAgICAgfSxcblxuICAgICAgICBkZWNJdGVtVXNhZ2VDb3VudGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1Vc2FnZUNvdW50ZXItLTtcbiAgICAgICAgfSxcblxuICAgICAgICBkZWxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5kZWxldGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHR0LmNvcmUucmVtb3ZlT2JqZWN0KHRoaXMucGFyZW50LmV4ZXJjaXNlcywgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChleGVyY2lzZSkge1xuICAgICAgICAgICAgdmFyIG9sZFBhcmVudCA9IGV4ZXJjaXNlLnBhcmVudDtcbiAgICAgICAgICAgIHR0LmNvcmUucmVtb3ZlT2JqZWN0KG9sZFBhcmVudC5leGVyY2lzZXMsIGV4ZXJjaXNlKTtcbiAgICAgICAgICAgIGV4ZXJjaXNlLnBhcmVudCA9IHRoaXMucGFyZW50O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5wYXJlbnQuZXhlcmNpc2VzLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5leGVyY2lzZXMuc3BsaWNlKGluZGV4LCAwLCBleGVyY2lzZSk7XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KTsiXX0=