"use strict";

define(['../../../../src/index', '../../model/WorkoutCollection', '../../model/Workout', '../../model/WorkoutItem', '../../model/Exercise', '../../../../controls/util', '../common/time'], function (tt, WorkoutCollection, Workout, WorkoutItem, Exercise, controlsUtil, time) {
  var module = {};

  module.createWorkoutBasicTtNode = function (params) {
    return tt.createTtNode({
      type: 'div',
      children: [tt.createTtNode({
        type: 'div',
        css: ['workout-browser-header'],
        children: [tt.createTtNode({
          type: 'i',
          css: ['fas', 'fa-arrow-left'],
          click: function () {
            params.ui.setWorkout(params.workout.parent);
          }.bind(this)
        }), tt.createTtNode({
          type: 'div',
          css: ['workout-browser-header-text'],
          text: function text() {
            tt.initProperty(params.workout, 'name');
            return params.workout.getName();
          }
        })]
      }), tt.createTtNode({
        type: 'div',
        css: ['workout-browser-toolbar'],
        children: [tt.createTtNode({
          type: 'i',
          css: ['fas', 'fa-play'],
          click: function () {
            params.mobileUi.runWorkout(params.workout);
          }.bind(this)
        }), tt.createTtNode({
          type: 'div',
          css: ['workout-browser-toolbar-total-duration'],
          text: function () {
            return time.int2ext(params.workout.getTotalDuration());
          }.bind(this)
        })]
      }), tt.createTtNode({
        type: 'div',
        children: tt.createMappedList(params.workout.items, function (item) {
          return tt.createTtNode({
            type: 'div',
            css: ['workout-browser-workout-item'],
            children: [tt.createTtNode({
              type: 'div',
              css: ['workout-browser-workout-item-line1'],
              children: [tt.createTtNode({
                type: 'div',
                css: ['workout-browser-workout-item-name'],
                text: function () {
                  tt.initProperty(item, 'name');
                  return item.getName();
                }.bind(this)
              }), tt.createTtNode({
                type: 'div',
                css: ['workout-browser-workout-item-exercise-name'],
                text: function () {
                  tt.initProperty(item, 'exercise');
                  return item.getExercise().getName();
                }.bind(this)
              })]
            }), tt.createTtNode({
              type: 'div',
              css: ['workout-browser-workout-item-line2'],
              children: [tt.createTtNode({
                type: 'div',
                css: ['workout-browser-workout-item-count'],
                text: function () {
                  tt.initProperty(item, 'count');
                  return item.getCount() + 'x';
                }.bind(this)
              }), tt.createTtNode({
                type: 'div',
                css: ['workout-browser-workout-item-duration'],
                text: function () {
                  tt.initProperty(item, 'duration');
                  return time.int2ext(item.getDuration());
                }.bind(this)
              }), tt.createTtNode({
                type: 'div',
                css: ['workout-browser-workout-item-total-duration'],
                text: function () {
                  return '∑ ' + time.int2ext(item.getTotalDuration());
                }.bind(this)
              })]
            })]
          });
        }.bind(this))
      })]
    });
  };

  module.createWorkoutCollectionTtNode = function (params) {
    return tt.createTtNode({
      type: 'div',
      children: [tt.createTtNode({
        type: 'div',
        css: ['workout-browser-header'],
        children: [tt.createTtNode({
          type: 'i',
          css: function () {
            if (!params.workout.parent.isRoot()) {
              return ['fas', 'fa-arrow-left'];
            } else {
              return [];
            }
          }.bind(this),
          click: function () {
            params.ui.setWorkout(params.workout.parent);
          }.bind(this)
        }), tt.createTtNode({
          type: 'div',
          css: ['workout-browser-header-text'],
          text: function text() {
            tt.initProperty(params.workout, 'name');
            return params.workout.getName();
          }
        })]
      }), tt.createTtNode({
        type: 'div',
        css: ['workout-browser-workouts'],
        children: tt.createMappedList(params.workout.workouts, function (workout) {
          return tt.createTtNode({
            type: 'div',
            css: ['workout-browser-workout'],
            click: function () {
              params.ui.setWorkout(workout);
            }.bind(this),
            children: [tt.createTtNode({
              type: 'div',
              css: ['workout-browser-workout-name'],
              text: function text() {
                tt.initProperty(workout, 'name');
                return workout.getName();
              }
            }), tt.createTtNode({
              type: 'div',
              css: ['workout-browser-workout-total-duration'],
              text: function text() {
                if (!workout.workouts) {
                  return '∑ ' + time.int2ext(workout.getTotalDuration());
                } else {
                  return '';
                }
              }
            }), tt.createTtNode({
              type: 'i',
              css: function () {
                if (!workout.workouts) {
                  return ['fas', 'fa-play', 'workout-browser-workout-run'];
                } else {
                  return [];
                }
              }.bind(this),
              click: function (evt) {
                evt.stopPropagation();
                params.mobileUi.runWorkout(workout);
              }.bind(this)
            })]
          });
        })
      })]
    });
  };

  module.createTtNode = tt.createTtNodeCreator({
    init: function init(params) {
      this.mobileUi = params.mobileUi;
      this.root = params.root;

      if (params.workout) {
        this.workout = params.workout;
      } else {
        this.workout = this.root.workout;
      }

      tt.initProperty(this, 'workout');
    },
    render: function render() {
      return tt.createTtNode({
        type: 'div',
        children: function () {
          var workout = this.getWorkout();
          var children = [];

          if (workout.workouts) {
            children.push(module.createWorkoutCollectionTtNode({
              mobileUi: this.mobileUi,
              ui: this,
              workout: workout
            }));
          } else {
            children.push(module.createWorkoutBasicTtNode({
              mobileUi: this.mobileUi,
              ui: this,
              workout: workout
            }));
          }

          return children;
        }.bind(this)
      });
    }
  });
  return module;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL3VpL21vYmlsZV9vbGQvd29ya291dEJyb3dzZXIuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwidHQiLCJXb3Jrb3V0Q29sbGVjdGlvbiIsIldvcmtvdXQiLCJXb3Jrb3V0SXRlbSIsIkV4ZXJjaXNlIiwiY29udHJvbHNVdGlsIiwidGltZSIsIm1vZHVsZSIsImNyZWF0ZVdvcmtvdXRCYXNpY1R0Tm9kZSIsInBhcmFtcyIsImNyZWF0ZVR0Tm9kZSIsInR5cGUiLCJjaGlsZHJlbiIsImNzcyIsImNsaWNrIiwidWkiLCJzZXRXb3Jrb3V0Iiwid29ya291dCIsInBhcmVudCIsImJpbmQiLCJ0ZXh0IiwiaW5pdFByb3BlcnR5IiwiZ2V0TmFtZSIsIm1vYmlsZVVpIiwicnVuV29ya291dCIsImludDJleHQiLCJnZXRUb3RhbER1cmF0aW9uIiwiY3JlYXRlTWFwcGVkTGlzdCIsIml0ZW1zIiwiaXRlbSIsImdldEV4ZXJjaXNlIiwiZ2V0Q291bnQiLCJnZXREdXJhdGlvbiIsImNyZWF0ZVdvcmtvdXRDb2xsZWN0aW9uVHROb2RlIiwiaXNSb290Iiwid29ya291dHMiLCJldnQiLCJzdG9wUHJvcGFnYXRpb24iLCJjcmVhdGVUdE5vZGVDcmVhdG9yIiwiaW5pdCIsInJvb3QiLCJyZW5kZXIiLCJnZXRXb3Jrb3V0IiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsdUJBQUQsRUFBMEIsK0JBQTFCLEVBQTJELHFCQUEzRCxFQUFrRix5QkFBbEYsRUFBNkcsc0JBQTdHLEVBQXFJLDJCQUFySSxFQUFrSyxnQkFBbEssQ0FBRCxFQUFzTCxVQUFVQyxFQUFWLEVBQWNDLGlCQUFkLEVBQWlDQyxPQUFqQyxFQUEwQ0MsV0FBMUMsRUFBdURDLFFBQXZELEVBQWlFQyxZQUFqRSxFQUErRUMsSUFBL0UsRUFBcUY7QUFFN1EsTUFBSUMsTUFBTSxHQUFHLEVBQWI7O0FBRUFBLEVBQUFBLE1BQU0sQ0FBQ0Msd0JBQVAsR0FBa0MsVUFBVUMsTUFBVixFQUFrQjtBQUNoRCxXQUFPVCxFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDbkJDLE1BQUFBLElBQUksRUFBRSxLQURhO0FBRW5CQyxNQUFBQSxRQUFRLEVBQUUsQ0FDTlosRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ1pDLFFBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLFFBQUFBLEdBQUcsRUFBRSxDQUFDLHdCQUFELENBRk87QUFHWkQsUUFBQUEsUUFBUSxFQUFFLENBQ05aLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxVQUFBQSxJQUFJLEVBQUUsR0FETTtBQUVaRSxVQUFBQSxHQUFHLEVBQUUsQ0FBQyxLQUFELEVBQVEsZUFBUixDQUZPO0FBR1pDLFVBQUFBLEtBQUssRUFBRSxZQUFZO0FBQ2ZMLFlBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVQyxVQUFWLENBQXFCUCxNQUFNLENBQUNRLE9BQVAsQ0FBZUMsTUFBcEM7QUFDSCxXQUZNLENBRUxDLElBRkssQ0FFQSxJQUZBO0FBSEssU0FBaEIsQ0FETSxFQVFObkIsRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ1pDLFVBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLFVBQUFBLEdBQUcsRUFBRSxDQUFDLDZCQUFELENBRk87QUFHWk8sVUFBQUEsSUFBSSxFQUFFLGdCQUFZO0FBQ2RwQixZQUFBQSxFQUFFLENBQUNxQixZQUFILENBQWdCWixNQUFNLENBQUNRLE9BQXZCLEVBQWdDLE1BQWhDO0FBQ0EsbUJBQU9SLE1BQU0sQ0FBQ1EsT0FBUCxDQUFlSyxPQUFmLEVBQVA7QUFDSDtBQU5XLFNBQWhCLENBUk07QUFIRSxPQUFoQixDQURNLEVBcUJOdEIsRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ1pDLFFBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLFFBQUFBLEdBQUcsRUFBRSxDQUFDLHlCQUFELENBRk87QUFHWkQsUUFBQUEsUUFBUSxFQUFFLENBQ05aLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxVQUFBQSxJQUFJLEVBQUUsR0FETTtBQUVaRSxVQUFBQSxHQUFHLEVBQUUsQ0FBQyxLQUFELEVBQVEsU0FBUixDQUZPO0FBR1pDLFVBQUFBLEtBQUssRUFBRSxZQUFZO0FBQ2ZMLFlBQUFBLE1BQU0sQ0FBQ2MsUUFBUCxDQUFnQkMsVUFBaEIsQ0FBMkJmLE1BQU0sQ0FBQ1EsT0FBbEM7QUFDSCxXQUZNLENBRUxFLElBRkssQ0FFQSxJQUZBO0FBSEssU0FBaEIsQ0FETSxFQVFObkIsRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ1pDLFVBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLFVBQUFBLEdBQUcsRUFBRSxDQUFDLHdDQUFELENBRk87QUFHWk8sVUFBQUEsSUFBSSxFQUFFLFlBQVk7QUFDZCxtQkFBT2QsSUFBSSxDQUFDbUIsT0FBTCxDQUFhaEIsTUFBTSxDQUFDUSxPQUFQLENBQWVTLGdCQUFmLEVBQWIsQ0FBUDtBQUNILFdBRkssQ0FFSlAsSUFGSSxDQUVDLElBRkQ7QUFITSxTQUFoQixDQVJNO0FBSEUsT0FBaEIsQ0FyQk0sRUF5Q05uQixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsUUFBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkMsUUFBQUEsUUFBUSxFQUFFWixFQUFFLENBQUMyQixnQkFBSCxDQUFvQmxCLE1BQU0sQ0FBQ1EsT0FBUCxDQUFlVyxLQUFuQyxFQUEwQyxVQUFVQyxJQUFWLEVBQWdCO0FBQ2hFLGlCQUFPN0IsRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ25CQyxZQUFBQSxJQUFJLEVBQUUsS0FEYTtBQUVuQkUsWUFBQUEsR0FBRyxFQUFFLENBQUMsOEJBQUQsQ0FGYztBQUduQkQsWUFBQUEsUUFBUSxFQUFFLENBQ05aLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxjQUFBQSxJQUFJLEVBQUUsS0FETTtBQUVaRSxjQUFBQSxHQUFHLEVBQUUsQ0FBQyxvQ0FBRCxDQUZPO0FBR1pELGNBQUFBLFFBQVEsRUFBRSxDQUNOWixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsZ0JBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLGdCQUFBQSxHQUFHLEVBQUUsQ0FBQyxtQ0FBRCxDQUZPO0FBR1pPLGdCQUFBQSxJQUFJLEVBQUUsWUFBWTtBQUNkcEIsa0JBQUFBLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0JRLElBQWhCLEVBQXNCLE1BQXRCO0FBQ0EseUJBQU9BLElBQUksQ0FBQ1AsT0FBTCxFQUFQO0FBQ0gsaUJBSEssQ0FHSkgsSUFISSxDQUdDLElBSEQ7QUFITSxlQUFoQixDQURNLEVBU05uQixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsZ0JBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLGdCQUFBQSxHQUFHLEVBQUUsQ0FBQyw0Q0FBRCxDQUZPO0FBR1pPLGdCQUFBQSxJQUFJLEVBQUUsWUFBWTtBQUNkcEIsa0JBQUFBLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0JRLElBQWhCLEVBQXNCLFVBQXRCO0FBQ0EseUJBQU9BLElBQUksQ0FBQ0MsV0FBTCxHQUFtQlIsT0FBbkIsRUFBUDtBQUNILGlCQUhLLENBR0pILElBSEksQ0FHQyxJQUhEO0FBSE0sZUFBaEIsQ0FUTTtBQUhFLGFBQWhCLENBRE0sRUF1Qk5uQixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsY0FBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkUsY0FBQUEsR0FBRyxFQUFFLENBQUMsb0NBQUQsQ0FGTztBQUdaRCxjQUFBQSxRQUFRLEVBQUUsQ0FBQ1osRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ3ZCQyxnQkFBQUEsSUFBSSxFQUFFLEtBRGlCO0FBRXZCRSxnQkFBQUEsR0FBRyxFQUFFLENBQUMsb0NBQUQsQ0FGa0I7QUFHdkJPLGdCQUFBQSxJQUFJLEVBQUUsWUFBWTtBQUNkcEIsa0JBQUFBLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0JRLElBQWhCLEVBQXNCLE9BQXRCO0FBQ0EseUJBQU9BLElBQUksQ0FBQ0UsUUFBTCxLQUFnQixHQUF2QjtBQUNILGlCQUhLLENBR0paLElBSEksQ0FHQyxJQUhEO0FBSGlCLGVBQWhCLENBQUQsRUFRVm5CLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxnQkFBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkUsZ0JBQUFBLEdBQUcsRUFBRSxDQUFDLHVDQUFELENBRk87QUFHWk8sZ0JBQUFBLElBQUksRUFBRSxZQUFZO0FBQ2RwQixrQkFBQUEsRUFBRSxDQUFDcUIsWUFBSCxDQUFnQlEsSUFBaEIsRUFBc0IsVUFBdEI7QUFDQSx5QkFBT3ZCLElBQUksQ0FBQ21CLE9BQUwsQ0FBYUksSUFBSSxDQUFDRyxXQUFMLEVBQWIsQ0FBUDtBQUNILGlCQUhLLENBR0piLElBSEksQ0FHQyxJQUhEO0FBSE0sZUFBaEIsQ0FSVSxFQWdCVm5CLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxnQkFBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkUsZ0JBQUFBLEdBQUcsRUFBRSxDQUFDLDZDQUFELENBRk87QUFHWk8sZ0JBQUFBLElBQUksRUFBRSxZQUFZO0FBQ2QseUJBQU8sT0FBS2QsSUFBSSxDQUFDbUIsT0FBTCxDQUFhSSxJQUFJLENBQUNILGdCQUFMLEVBQWIsQ0FBWjtBQUNILGlCQUZLLENBRUpQLElBRkksQ0FFQyxJQUZEO0FBSE0sZUFBaEIsQ0FoQlU7QUFIRSxhQUFoQixDQXZCTTtBQUhTLFdBQWhCLENBQVA7QUF1REgsU0F4RG1ELENBd0RsREEsSUF4RGtELENBd0Q3QyxJQXhENkMsQ0FBMUM7QUFGRSxPQUFoQixDQXpDTTtBQUZTLEtBQWhCLENBQVA7QUF5R0gsR0ExR0Q7O0FBNEdBWixFQUFBQSxNQUFNLENBQUMwQiw2QkFBUCxHQUF1QyxVQUFVeEIsTUFBVixFQUFrQjtBQUNyRCxXQUFPVCxFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDbkJDLE1BQUFBLElBQUksRUFBRSxLQURhO0FBRW5CQyxNQUFBQSxRQUFRLEVBQUUsQ0FDTlosRUFBRSxDQUFDVSxZQUFILENBQWdCO0FBQ1pDLFFBQUFBLElBQUksRUFBRSxLQURNO0FBRVpFLFFBQUFBLEdBQUcsRUFBRSxDQUFDLHdCQUFELENBRk87QUFHWkQsUUFBQUEsUUFBUSxFQUFFLENBQ05aLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxVQUFBQSxJQUFJLEVBQUUsR0FETTtBQUVaRSxVQUFBQSxHQUFHLEVBQUUsWUFBWTtBQUNiLGdCQUFJLENBQUNKLE1BQU0sQ0FBQ1EsT0FBUCxDQUFlQyxNQUFmLENBQXNCZ0IsTUFBdEIsRUFBTCxFQUFxQztBQUNqQyxxQkFBTyxDQUFDLEtBQUQsRUFBUSxlQUFSLENBQVA7QUFDSCxhQUZELE1BRU87QUFDSCxxQkFBTyxFQUFQO0FBQ0g7QUFDSixXQU5JLENBTUhmLElBTkcsQ0FNRSxJQU5GLENBRk87QUFTWkwsVUFBQUEsS0FBSyxFQUFFLFlBQVk7QUFDZkwsWUFBQUEsTUFBTSxDQUFDTSxFQUFQLENBQVVDLFVBQVYsQ0FBcUJQLE1BQU0sQ0FBQ1EsT0FBUCxDQUFlQyxNQUFwQztBQUNILFdBRk0sQ0FFTEMsSUFGSyxDQUVBLElBRkE7QUFUSyxTQUFoQixDQURNLEVBY05uQixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsVUFBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkUsVUFBQUEsR0FBRyxFQUFFLENBQUMsNkJBQUQsQ0FGTztBQUdaTyxVQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZHBCLFlBQUFBLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0JaLE1BQU0sQ0FBQ1EsT0FBdkIsRUFBZ0MsTUFBaEM7QUFDQSxtQkFBT1IsTUFBTSxDQUFDUSxPQUFQLENBQWVLLE9BQWYsRUFBUDtBQUNIO0FBTlcsU0FBaEIsQ0FkTTtBQUhFLE9BQWhCLENBRE0sRUEyQk50QixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsUUFBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkUsUUFBQUEsR0FBRyxFQUFFLENBQUMsMEJBQUQsQ0FGTztBQUdaRCxRQUFBQSxRQUFRLEVBQUVaLEVBQUUsQ0FBQzJCLGdCQUFILENBQW9CbEIsTUFBTSxDQUFDUSxPQUFQLENBQWVrQixRQUFuQyxFQUE2QyxVQUFVbEIsT0FBVixFQUFtQjtBQUN0RSxpQkFBT2pCLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNuQkMsWUFBQUEsSUFBSSxFQUFFLEtBRGE7QUFFbkJFLFlBQUFBLEdBQUcsRUFBRSxDQUFDLHlCQUFELENBRmM7QUFHbkJDLFlBQUFBLEtBQUssRUFBRSxZQUFZO0FBQ2ZMLGNBQUFBLE1BQU0sQ0FBQ00sRUFBUCxDQUFVQyxVQUFWLENBQXFCQyxPQUFyQjtBQUNILGFBRk0sQ0FFTEUsSUFGSyxDQUVBLElBRkEsQ0FIWTtBQU1uQlAsWUFBQUEsUUFBUSxFQUFFLENBQ05aLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxjQUFBQSxJQUFJLEVBQUUsS0FETTtBQUVaRSxjQUFBQSxHQUFHLEVBQUUsQ0FBQyw4QkFBRCxDQUZPO0FBR1pPLGNBQUFBLElBQUksRUFBRSxnQkFBWTtBQUNkcEIsZ0JBQUFBLEVBQUUsQ0FBQ3FCLFlBQUgsQ0FBZ0JKLE9BQWhCLEVBQXlCLE1BQXpCO0FBQ0EsdUJBQU9BLE9BQU8sQ0FBQ0ssT0FBUixFQUFQO0FBQ0g7QUFOVyxhQUFoQixDQURNLEVBU050QixFQUFFLENBQUNVLFlBQUgsQ0FBZ0I7QUFDWkMsY0FBQUEsSUFBSSxFQUFFLEtBRE07QUFFWkUsY0FBQUEsR0FBRyxFQUFFLENBQUMsd0NBQUQsQ0FGTztBQUdaTyxjQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZCxvQkFBSSxDQUFDSCxPQUFPLENBQUNrQixRQUFiLEVBQXVCO0FBQ25CLHlCQUFPLE9BQUs3QixJQUFJLENBQUNtQixPQUFMLENBQWFSLE9BQU8sQ0FBQ1MsZ0JBQVIsRUFBYixDQUFaO0FBQ0gsaUJBRkQsTUFFTztBQUNILHlCQUFPLEVBQVA7QUFDSDtBQUNKO0FBVFcsYUFBaEIsQ0FUTSxFQW9CTjFCLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNaQyxjQUFBQSxJQUFJLEVBQUUsR0FETTtBQUVaRSxjQUFBQSxHQUFHLEVBQUUsWUFBWTtBQUNiLG9CQUFJLENBQUNJLE9BQU8sQ0FBQ2tCLFFBQWIsRUFBdUI7QUFDbkIseUJBQU8sQ0FBQyxLQUFELEVBQVEsU0FBUixFQUFtQiw2QkFBbkIsQ0FBUDtBQUNILGlCQUZELE1BRU87QUFDSCx5QkFBTyxFQUFQO0FBQ0g7QUFDSixlQU5JLENBTUhoQixJQU5HLENBTUUsSUFORixDQUZPO0FBU1pMLGNBQUFBLEtBQUssRUFBRSxVQUFVc0IsR0FBVixFQUFlO0FBQ2xCQSxnQkFBQUEsR0FBRyxDQUFDQyxlQUFKO0FBQ0E1QixnQkFBQUEsTUFBTSxDQUFDYyxRQUFQLENBQWdCQyxVQUFoQixDQUEyQlAsT0FBM0I7QUFDSCxlQUhNLENBR0xFLElBSEssQ0FHQSxJQUhBO0FBVEssYUFBaEIsQ0FwQk07QUFOUyxXQUFoQixDQUFQO0FBeUNILFNBMUNTO0FBSEUsT0FBaEIsQ0EzQk07QUFGUyxLQUFoQixDQUFQO0FBOEVILEdBL0VEOztBQWlGQVosRUFBQUEsTUFBTSxDQUFDRyxZQUFQLEdBQXNCVixFQUFFLENBQUNzQyxtQkFBSCxDQUF1QjtBQUN6Q0MsSUFBQUEsSUFBSSxFQUFFLGNBQVU5QixNQUFWLEVBQWtCO0FBQ3BCLFdBQUtjLFFBQUwsR0FBZ0JkLE1BQU0sQ0FBQ2MsUUFBdkI7QUFDQSxXQUFLaUIsSUFBTCxHQUFZL0IsTUFBTSxDQUFDK0IsSUFBbkI7O0FBQ0EsVUFBSS9CLE1BQU0sQ0FBQ1EsT0FBWCxFQUFvQjtBQUNoQixhQUFLQSxPQUFMLEdBQWVSLE1BQU0sQ0FBQ1EsT0FBdEI7QUFDSCxPQUZELE1BRU87QUFDSCxhQUFLQSxPQUFMLEdBQWUsS0FBS3VCLElBQUwsQ0FBVXZCLE9BQXpCO0FBQ0g7O0FBQ0RqQixNQUFBQSxFQUFFLENBQUNxQixZQUFILENBQWdCLElBQWhCLEVBQXNCLFNBQXRCO0FBQ0gsS0FWd0M7QUFXekNvQixJQUFBQSxNQUFNLEVBQUUsa0JBQVk7QUFDaEIsYUFBT3pDLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQjtBQUNuQkMsUUFBQUEsSUFBSSxFQUFFLEtBRGE7QUFFbkJDLFFBQUFBLFFBQVEsRUFBRSxZQUFZO0FBQ2xCLGNBQUlLLE9BQU8sR0FBRyxLQUFLeUIsVUFBTCxFQUFkO0FBQ0EsY0FBSTlCLFFBQVEsR0FBRyxFQUFmOztBQUNBLGNBQUlLLE9BQU8sQ0FBQ2tCLFFBQVosRUFBc0I7QUFDbEJ2QixZQUFBQSxRQUFRLENBQUMrQixJQUFULENBQWNwQyxNQUFNLENBQUMwQiw2QkFBUCxDQUFxQztBQUFFVixjQUFBQSxRQUFRLEVBQUUsS0FBS0EsUUFBakI7QUFBMkJSLGNBQUFBLEVBQUUsRUFBRSxJQUEvQjtBQUFxQ0UsY0FBQUEsT0FBTyxFQUFFQTtBQUE5QyxhQUFyQyxDQUFkO0FBQ0gsV0FGRCxNQUVPO0FBQ0hMLFlBQUFBLFFBQVEsQ0FBQytCLElBQVQsQ0FBY3BDLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0M7QUFBRWUsY0FBQUEsUUFBUSxFQUFFLEtBQUtBLFFBQWpCO0FBQTJCUixjQUFBQSxFQUFFLEVBQUUsSUFBL0I7QUFBcUNFLGNBQUFBLE9BQU8sRUFBRUE7QUFBOUMsYUFBaEMsQ0FBZDtBQUNIOztBQUNELGlCQUFPTCxRQUFQO0FBQ0gsU0FUUyxDQVNSTyxJQVRRLENBU0gsSUFURztBQUZTLE9BQWhCLENBQVA7QUFhSDtBQXpCd0MsR0FBdkIsQ0FBdEI7QUE0QkEsU0FBT1osTUFBUDtBQUVILENBL05LLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi8uLi8uLi9zcmMvaW5kZXgnLCAnLi4vLi4vbW9kZWwvV29ya291dENvbGxlY3Rpb24nLCAnLi4vLi4vbW9kZWwvV29ya291dCcsICcuLi8uLi9tb2RlbC9Xb3Jrb3V0SXRlbScsICcuLi8uLi9tb2RlbC9FeGVyY2lzZScsICcuLi8uLi8uLi8uLi9jb250cm9scy91dGlsJywgJy4uL2NvbW1vbi90aW1lJ10sIGZ1bmN0aW9uICh0dCwgV29ya291dENvbGxlY3Rpb24sIFdvcmtvdXQsIFdvcmtvdXRJdGVtLCBFeGVyY2lzZSwgY29udHJvbHNVdGlsLCB0aW1lKSB7XG5cbiAgICB2YXIgbW9kdWxlID0ge307XG5cbiAgICBtb2R1bGUuY3JlYXRlV29ya291dEJhc2ljVHROb2RlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3dvcmtvdXQtYnJvd3Nlci1oZWFkZXInXSxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWydmYXMnLCAnZmEtYXJyb3ctbGVmdCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy51aS5zZXRXb3Jrb3V0KHBhcmFtcy53b3Jrb3V0LnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItaGVhZGVyLXRleHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmluaXRQcm9wZXJ0eShwYXJhbXMud29ya291dCwgJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy53b3Jrb3V0LmdldE5hbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KV1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3dvcmtvdXQtYnJvd3Nlci10b29sYmFyJ10sXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnZmFzJywgJ2ZhLXBsYXknXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMubW9iaWxlVWkucnVuV29ya291dChwYXJhbXMud29ya291dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3dvcmtvdXQtYnJvd3Nlci10b29sYmFyLXRvdGFsLWR1cmF0aW9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGltZS5pbnQyZXh0KHBhcmFtcy53b3Jrb3V0LmdldFRvdGFsRHVyYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB0dC5jcmVhdGVNYXBwZWRMaXN0KHBhcmFtcy53b3Jrb3V0Lml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3dvcmtvdXQtYnJvd3Nlci13b3Jrb3V0LWl0ZW0nXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnd29ya291dC1icm93c2VyLXdvcmtvdXQtaXRlbS1saW5lMSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3dvcmtvdXQtYnJvd3Nlci13b3Jrb3V0LWl0ZW0tbmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5pbml0UHJvcGVydHkoaXRlbSwgJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldE5hbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItd29ya291dC1pdGVtLWV4ZXJjaXNlLW5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHQuaW5pdFByb3BlcnR5KGl0ZW0sICdleGVyY2lzZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZ2V0RXhlcmNpc2UoKS5nZXROYW1lKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnd29ya291dC1icm93c2VyLXdvcmtvdXQtaXRlbS1saW5lMiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItd29ya291dC1pdGVtLWNvdW50J10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5pbml0UHJvcGVydHkoaXRlbSwgJ2NvdW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmdldENvdW50KCkrJ3gnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItd29ya291dC1pdGVtLWR1cmF0aW9uJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5pbml0UHJvcGVydHkoaXRlbSwgJ2R1cmF0aW9uJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aW1lLmludDJleHQoaXRlbS5nZXREdXJhdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnd29ya291dC1icm93c2VyLXdvcmtvdXQtaXRlbS10b3RhbC1kdXJhdGlvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfiiJEgJyt0aW1lLmludDJleHQoaXRlbS5nZXRUb3RhbER1cmF0aW9uKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBtb2R1bGUuY3JlYXRlV29ya291dENvbGxlY3Rpb25UdE5vZGUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFsnd29ya291dC1icm93c2VyLWhlYWRlciddLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyYW1zLndvcmtvdXQucGFyZW50LmlzUm9vdCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWydmYXMnLCAnZmEtYXJyb3ctbGVmdCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy51aS5zZXRXb3Jrb3V0KHBhcmFtcy53b3Jrb3V0LnBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItaGVhZGVyLXRleHQnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmluaXRQcm9wZXJ0eShwYXJhbXMud29ya291dCwgJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy53b3Jrb3V0LmdldE5hbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KV1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3dvcmtvdXQtYnJvd3Nlci13b3Jrb3V0cyddLFxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogdHQuY3JlYXRlTWFwcGVkTGlzdChwYXJhbXMud29ya291dC53b3Jrb3V0cywgZnVuY3Rpb24gKHdvcmtvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItd29ya291dCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy51aS5zZXRXb3Jrb3V0KHdvcmtvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnd29ya291dC1icm93c2VyLXdvcmtvdXQtbmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmluaXRQcm9wZXJ0eSh3b3Jrb3V0LCAnbmFtZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3b3Jrb3V0LmdldE5hbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWyd3b3Jrb3V0LWJyb3dzZXItd29ya291dC10b3RhbC1kdXJhdGlvbiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghd29ya291dC53b3Jrb3V0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+KIkSAnK3RpbWUuaW50MmV4dCh3b3Jrb3V0LmdldFRvdGFsRHVyYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdvcmtvdXQud29ya291dHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnZmFzJywgJ2ZhLXBsYXknLCAnd29ya291dC1icm93c2VyLXdvcmtvdXQtcnVuJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5tb2JpbGVVaS5ydW5Xb3Jrb3V0KHdvcmtvdXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICB9O1xuXG4gICAgbW9kdWxlLmNyZWF0ZVR0Tm9kZSA9IHR0LmNyZWF0ZVR0Tm9kZUNyZWF0b3Ioe1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLm1vYmlsZVVpID0gcGFyYW1zLm1vYmlsZVVpO1xuICAgICAgICAgICAgdGhpcy5yb290ID0gcGFyYW1zLnJvb3Q7XG4gICAgICAgICAgICBpZiAocGFyYW1zLndvcmtvdXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmtvdXQgPSBwYXJhbXMud29ya291dDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53b3Jrb3V0ID0gdGhpcy5yb290LndvcmtvdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0dC5pbml0UHJvcGVydHkodGhpcywgJ3dvcmtvdXQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnZGl2JyxcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd29ya291dCA9IHRoaXMuZ2V0V29ya291dCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdvcmtvdXQud29ya291dHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2gobW9kdWxlLmNyZWF0ZVdvcmtvdXRDb2xsZWN0aW9uVHROb2RlKHsgbW9iaWxlVWk6IHRoaXMubW9iaWxlVWksIHVpOiB0aGlzLCB3b3Jrb3V0OiB3b3Jrb3V0IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2gobW9kdWxlLmNyZWF0ZVdvcmtvdXRCYXNpY1R0Tm9kZSh7IG1vYmlsZVVpOiB0aGlzLm1vYmlsZVVpLCB1aTogdGhpcywgd29ya291dDogd29ya291dCB9KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1vZHVsZTtcblxufSk7XG4iXX0=