"use strict";

define(['../../../src/index', './Movement', './MovementBasic'], function (tt, Movement, MovementBasic) {
  var MovementCollection = tt.core.defineDerivedClass(Movement, {
    init: function init(params) {
      Movement.prototype.init.apply(this, arguments);
      this.movements = params.movements || [];
    },
    createMovementBasic: function createMovementBasic(params) {
      params.parent = this;
      var basicMovement = new MovementBasic(params);
      this.movements.push(basicMovement);
      return basicMovement;
    },
    createMovementCollection: function createMovementCollection(params) {
      params.parent = this;
      var movementCollection = new MovementCollection(params);
      this.movements.push(movementCollection);
      return movementCollection;
    }
  });
  return MovementCollection;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL01vdmVtZW50Q29sbGVjdGlvbi5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJ0dCIsIk1vdmVtZW50IiwiTW92ZW1lbnRCYXNpYyIsIk1vdmVtZW50Q29sbGVjdGlvbiIsImNvcmUiLCJkZWZpbmVEZXJpdmVkQ2xhc3MiLCJpbml0IiwicGFyYW1zIiwicHJvdG90eXBlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtb3ZlbWVudHMiLCJjcmVhdGVNb3ZlbWVudEJhc2ljIiwicGFyZW50IiwiYmFzaWNNb3ZlbWVudCIsInB1c2giLCJjcmVhdGVNb3ZlbWVudENvbGxlY3Rpb24iLCJtb3ZlbWVudENvbGxlY3Rpb24iXSwibWFwcGluZ3MiOiI7O0FBQUFBLE1BQU0sQ0FBQyxDQUFDLG9CQUFELEVBQXVCLFlBQXZCLEVBQXFDLGlCQUFyQyxDQUFELEVBQTBELFVBQVVDLEVBQVYsRUFBY0MsUUFBZCxFQUF3QkMsYUFBeEIsRUFBdUM7QUFFbkcsTUFBSUMsa0JBQWtCLEdBQUdILEVBQUUsQ0FBQ0ksSUFBSCxDQUFRQyxrQkFBUixDQUEyQkosUUFBM0IsRUFBcUM7QUFFMURLLElBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCO0FBQ3BCTixNQUFBQSxRQUFRLENBQUNPLFNBQVQsQ0FBbUJGLElBQW5CLENBQXdCRyxLQUF4QixDQUE4QixJQUE5QixFQUFvQ0MsU0FBcEM7QUFDQSxXQUFLQyxTQUFMLEdBQWlCSixNQUFNLENBQUNJLFNBQVAsSUFBb0IsRUFBckM7QUFDSCxLQUx5RDtBQU8xREMsSUFBQUEsbUJBQW1CLEVBQUUsNkJBQVVMLE1BQVYsRUFBa0I7QUFDbkNBLE1BQUFBLE1BQU0sQ0FBQ00sTUFBUCxHQUFnQixJQUFoQjtBQUNBLFVBQUlDLGFBQWEsR0FBRyxJQUFJWixhQUFKLENBQWtCSyxNQUFsQixDQUFwQjtBQUNBLFdBQUtJLFNBQUwsQ0FBZUksSUFBZixDQUFvQkQsYUFBcEI7QUFDQSxhQUFPQSxhQUFQO0FBQ0gsS0FaeUQ7QUFjMURFLElBQUFBLHdCQUF3QixFQUFFLGtDQUFVVCxNQUFWLEVBQWtCO0FBQ3hDQSxNQUFBQSxNQUFNLENBQUNNLE1BQVAsR0FBZ0IsSUFBaEI7QUFDQSxVQUFJSSxrQkFBa0IsR0FBRyxJQUFJZCxrQkFBSixDQUF1QkksTUFBdkIsQ0FBekI7QUFDQSxXQUFLSSxTQUFMLENBQWVJLElBQWYsQ0FBb0JFLGtCQUFwQjtBQUNBLGFBQU9BLGtCQUFQO0FBQ0g7QUFuQnlELEdBQXJDLENBQXpCO0FBdUJBLFNBQU9kLGtCQUFQO0FBRUgsQ0EzQkssQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbJy4uLy4uLy4uL3NyYy9pbmRleCcsICcuL01vdmVtZW50JywgJy4vTW92ZW1lbnRCYXNpYyddLCBmdW5jdGlvbiAodHQsIE1vdmVtZW50LCBNb3ZlbWVudEJhc2ljKSB7XG5cbiAgICB2YXIgTW92ZW1lbnRDb2xsZWN0aW9uID0gdHQuY29yZS5kZWZpbmVEZXJpdmVkQ2xhc3MoTW92ZW1lbnQsIHtcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICBNb3ZlbWVudC5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudHMgPSBwYXJhbXMubW92ZW1lbnRzIHx8IFtdO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZU1vdmVtZW50QmFzaWM6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGJhc2ljTW92ZW1lbnQgPSBuZXcgTW92ZW1lbnRCYXNpYyhwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudHMucHVzaChiYXNpY01vdmVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBiYXNpY01vdmVtZW50O1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZU1vdmVtZW50Q29sbGVjdGlvbjogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgcGFyYW1zLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgbW92ZW1lbnRDb2xsZWN0aW9uID0gbmV3IE1vdmVtZW50Q29sbGVjdGlvbihwYXJhbXMpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlbWVudHMucHVzaChtb3ZlbWVudENvbGxlY3Rpb24pO1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVtZW50Q29sbGVjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTW92ZW1lbnRDb2xsZWN0aW9uO1xuXG59KTsiXX0=