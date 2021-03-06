"use strict";

define(['../../../src/index', './Db', './Root', './ExerciseCollection', './WorkoutCollection', './MovementCollection', './MuscleCollection'], function (tt, Db, Root, ExerciseCollection, WorkoutCollection, MovementCollection, MuscleCollection) {
  var dbPath = '../../db.json';

  if (window.globalEnv && window.globalEnv.dbPath) {
    dbPath = window.globalEnv.dbPath;
  }

  ;
  return tt.core.defineClass({
    init: function init() {
      this.db = new Db();
      tt.initProperty(this, 'root');
      this.setRoot(this.createRoot());
    },
    createRoot: function createRoot() {
      // root exercise collection
      var exerciseCollection = new ExerciseCollection({
        name: 'All Exercises'
      });
      var exercise1 = exerciseCollection.createExerciseBasic({
        name: 'Liegestützen'
      });
      var exercise2 = exerciseCollection.createExerciseBasic({
        name: 'Bankdrücken'
      }); // root workout collection

      var workoutCollection = new WorkoutCollection({
        name: 'All Workouts'
      });
      var workout = workoutCollection.createWorkoutBasic({
        name: 'Basic'
      });
      workout.createItem({
        name: 'Übung 1',
        exercise: exercise1,
        count: 10
      });
      workout.createItem({
        name: 'Übung 2',
        exercise: exercise2,
        count: 5
      });
      workout = workoutCollection.createWorkoutBasic({
        name: 'Hard'
      });
      workout.createItem({
        name: 'Übung 1',
        exercise: exercise1,
        count: 20
      });
      workout.createItem({
        name: 'Übung 2',
        exercise: exercise2,
        count: 10
      }); // root movement

      var movementCollection = new MovementCollection({
        name: 'All Movement'
      }); // root muscle

      var muscleCollection = new MuscleCollection({
        name: 'All Muscles'
      }); // root

      return new Root({
        exercise: exerciseCollection,
        workout: workoutCollection,
        movement: movementCollection,
        muscle: muscleCollection
      });
    },
    load: function load() {
      return this.db.load(dbPath).then(function (root) {
        this.setRoot(root);
      }.bind(this));
    },
    save: function save() {
      return this.db.save(dbPath, this.getRoot()).then(function () {//alert('saved');
      });
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL21vZGVsL01vZGVsLmpzIl0sIm5hbWVzIjpbImRlZmluZSIsInR0IiwiRGIiLCJSb290IiwiRXhlcmNpc2VDb2xsZWN0aW9uIiwiV29ya291dENvbGxlY3Rpb24iLCJNb3ZlbWVudENvbGxlY3Rpb24iLCJNdXNjbGVDb2xsZWN0aW9uIiwiZGJQYXRoIiwid2luZG93IiwiZ2xvYmFsRW52IiwiY29yZSIsImRlZmluZUNsYXNzIiwiaW5pdCIsImRiIiwiaW5pdFByb3BlcnR5Iiwic2V0Um9vdCIsImNyZWF0ZVJvb3QiLCJleGVyY2lzZUNvbGxlY3Rpb24iLCJuYW1lIiwiZXhlcmNpc2UxIiwiY3JlYXRlRXhlcmNpc2VCYXNpYyIsImV4ZXJjaXNlMiIsIndvcmtvdXRDb2xsZWN0aW9uIiwid29ya291dCIsImNyZWF0ZVdvcmtvdXRCYXNpYyIsImNyZWF0ZUl0ZW0iLCJleGVyY2lzZSIsImNvdW50IiwibW92ZW1lbnRDb2xsZWN0aW9uIiwibXVzY2xlQ29sbGVjdGlvbiIsIm1vdmVtZW50IiwibXVzY2xlIiwibG9hZCIsInRoZW4iLCJyb290IiwiYmluZCIsInNhdmUiLCJnZXRSb290Il0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUMsQ0FBQyxvQkFBRCxFQUF1QixNQUF2QixFQUErQixRQUEvQixFQUF5QyxzQkFBekMsRUFBaUUscUJBQWpFLEVBQXdGLHNCQUF4RixFQUFnSCxvQkFBaEgsQ0FBRCxFQUNGLFVBQVVDLEVBQVYsRUFBY0MsRUFBZCxFQUFrQkMsSUFBbEIsRUFBd0JDLGtCQUF4QixFQUE0Q0MsaUJBQTVDLEVBQStEQyxrQkFBL0QsRUFBbUZDLGdCQUFuRixFQUFxRztBQUVqRyxNQUFJQyxNQUFNLEdBQUcsZUFBYjs7QUFDQSxNQUFHQyxNQUFNLENBQUNDLFNBQVAsSUFBb0JELE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkYsTUFBeEMsRUFBK0M7QUFDM0NBLElBQUFBLE1BQU0sR0FBR0MsTUFBTSxD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YUFBS25CLE9BQUwsQ0FBYW1CLElBQWI7QUFDSCxPQUZnQyxDQUUvQkMsSUFGK0IsQ0FFMUIsSUFGMEIsQ0FBMUIsQ0FBUDtBQUdILEtBdkNzQjtBQXlDdkJDLElBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkLGFBQU8sS0FBS3ZCLEVBQUwsQ0FBUXVCLElBQVIsQ0FBYTdCLE1BQWIsRUFBcUIsS0FBSzhCLE9BQUwsRUFBckIsRUFBcUNKLElBQXJDLENBQTBDLFlBQVksQ0FDekQ7QUFDSCxPQUZNLENBQVA7QUFHSDtBQTdDc0IsR0FBcEIsQ0FBUDtBQWlESCxDQXpEQyxDQUFOIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFsnLi4vLi4vLi4vc3JjL2luZGV4JywgJy4vRGInLCAnLi9Sb290JywgJy4vRXhlcmNpc2VDb2xsZWN0aW9uJywgJy4vV29ya291dENvbGxlY3Rpb24nLCAnLi9Nb3ZlbWVudENvbGxlY3Rpb24nLCAnLi9NdXNjbGVDb2xsZWN0aW9uJ10sXG4gICAgZnVuY3Rpb24gKHR0LCBEYiwgUm9vdCwgRXhlcmNpc2VDb2xsZWN0aW9uLCBXb3Jrb3V0Q29sbGVjdGlvbiwgTW92ZW1lbnRDb2xsZWN0aW9uLCBNdXNjbGVDb2xsZWN0aW9uKSB7XG5cbiAgICAgICAgdmFyIGRiUGF0aCA9ICcuLi8uLi9kYi5qc29uJztcbiAgICAgICAgaWYod2luZG93Lmdsb2JhbEVudiAmJiB3aW5kb3cuZ2xvYmFsRW52LmRiUGF0aCl7XG4gICAgICAgICAgICBkYlBhdGggPSB3aW5kb3cuZ2xvYmFsRW52LmRiUGF0aDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdHQuY29yZS5kZWZpbmVDbGFzcyh7XG4gICAgICAgIFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGIgPSBuZXcgRGIoKTtcbiAgICAgICAgICAgICAgICB0dC5pbml0UHJvcGVydHkodGhpcywgJ3Jvb3QnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJvb3QodGhpcy5jcmVhdGVSb290KCkpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY3JlYXRlUm9vdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgLy8gcm9vdCBleGVyY2lzZSBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgdmFyIGV4ZXJjaXNlQ29sbGVjdGlvbiA9IG5ldyBFeGVyY2lzZUNvbGxlY3Rpb24oeyBuYW1lOiAnQWxsIEV4ZXJjaXNlcycgfSk7XG4gICAgICAgICAgICAgICAgdmFyIGV4ZXJjaXNlMSA9IGV4ZXJjaXNlQ29sbGVjdGlvbi5jcmVhdGVFeGVyY2lzZUJhc2ljKHsgbmFtZTogJ0xpZWdlc3TDvHR6ZW4nIH0pO1xuICAgICAgICAgICAgICAgIHZhciBleGVyY2lzZTIgPSBleGVyY2lzZUNvbGxlY3Rpb24uY3JlYXRlRXhlcmNpc2VCYXNpYyh7IG5hbWU6ICdCYW5rZHLDvGNrZW4nIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gcm9vdCB3b3Jrb3V0IGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICB2YXIgd29ya291dENvbGxlY3Rpb24gPSBuZXcgV29ya291dENvbGxlY3Rpb24oeyBuYW1lOiAnQWxsIFdvcmtvdXRzJyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgd29ya291dCA9IHdvcmtvdXRDb2xsZWN0aW9uLmNyZWF0ZVdvcmtvdXRCYXNpYyh7IG5hbWU6ICdCYXNpYycgfSk7XG4gICAgICAgICAgICAgICAgd29ya291dC5jcmVhdGVJdGVtKHsgbmFtZTogJ8OcYnVuZyAxJywgZXhlcmNpc2U6IGV4ZXJjaXNlMSwgY291bnQ6IDEwIH0pO1xuICAgICAgICAgICAgICAgIHdvcmtvdXQuY3JlYXRlSXRlbSh7IG5hbWU6ICfDnGJ1bmcgMicsIGV4ZXJjaXNlOiBleGVyY2lzZTIsIGNvdW50OiA1IH0pO1xuICAgICAgICAgICAgICAgIHdvcmtvdXQgPSB3b3Jrb3V0Q29sbGVjdGlvbi5jcmVhdGVXb3Jrb3V0QmFzaWMoeyBuYW1lOiAnSGFyZCcgfSk7XG4gICAgICAgICAgICAgICAgd29ya291dC5jcmVhdGVJdGVtKHsgbmFtZTogJ8OcYnVuZyAxJywgZXhlcmNpc2U6IGV4ZXJjaXNlMSwgY291bnQ6IDIwIH0pO1xuICAgICAgICAgICAgICAgIHdvcmtvdXQuY3JlYXRlSXRlbSh7IG5hbWU6ICfDnGJ1bmcgMicsIGV4ZXJjaXNlOiBleGVyY2lzZTIsIGNvdW50OiAxMCB9KTtcblxuICAgICAgICAgICAgICAgIC8vIHJvb3QgbW92ZW1lbnRcbiAgICAgICAgICAgICAgICB2YXIgbW92ZW1lbnRDb2xsZWN0aW9uID0gbmV3IE1vdmVtZW50Q29sbGVjdGlvbih7IG5hbWU6ICdBbGwgTW92ZW1lbnQnIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gcm9vdCBtdXNjbGVcbiAgICAgICAgICAgICAgICB2YXIgbXVzY2xlQ29sbGVjdGlvbiA9IG5ldyBNdXNjbGVDb2xsZWN0aW9uKHsgbmFtZTogJ0FsbCBNdXNjbGVzJyB9KTtcblxuICAgICAgICAgICAgICAgIC8vIHJvb3RcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJvb3QoeyBleGVyY2lzZTogZXhlcmNpc2VDb2xsZWN0aW9uLCB3b3Jrb3V0OiB3b3Jrb3V0Q29sbGVjdGlvbiwgbW92ZW1lbnQ6IG1vdmVtZW50Q29sbGVjdGlvbiwgbXVzY2xlOiBtdXNjbGVDb2xsZWN0aW9uIH0pO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBsb2FkOiBmdW5jdGlvbiAoKSB7ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGIubG9hZChkYlBhdGgpLnRoZW4oZnVuY3Rpb24gKHJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb290KHJvb3QpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBzYXZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGIuc2F2ZShkYlBhdGgsIHRoaXMuZ2V0Um9vdCgpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydCgnc2F2ZWQnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG4iXX0=