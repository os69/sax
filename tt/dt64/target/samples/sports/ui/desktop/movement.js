"use strict";

define(['../../../../src/index', '../../../../controls/util', '../../model/Movement', '../../model/Muscle', '../common/icons'], function (tt, controlsUtil, Movement, Muscle, icons) {
  var module = {};

  module.createMovementTreeNode = function (params) {
    if (params.movement.movements) {
      return module.createMovementCollectionTreeNode(params);
    } else {
      return module.createMovementBasicTreeNode(params);
    }
  };

  module.createMovementCollectionTreeNode = function (params) {
    tt.initProperty(params.movement, 'name');
    return {
      movement: params.movement,
      labelTtNodes: [controlsUtil.createIconTtNode({
        icon: icons.MovementCollection
      }), tt.createTtNode({
        type: 'input',
        css: ['name-input'],
        value: function value() {
          return params.movement.getName();
        },
        change: function change(event) {
          params.movement.setName(event.srcElement.value);
        }
      }), controlsUtil.createIconTtNode({
        click: function () {
          params.movement.createMovementCollection({
            name: 'New Collection'
          });
        }.bind(this),
        icon: icons.createMovementCollection
      }), controlsUtil.createIconTtNode({
        click: function () {
          params.movement.createMovementBasic({
            name: 'New Movement'
          });
        }.bind(this),
        icon: icons.MovementBasic
      }), controlsUtil.createIconTtNode({
        click: function () {
          params.movement.delete();
        }.bind(this),
        icon: ['fas', 'fa-trash-alt']
      })],
      childNodes: tt.createMappedList(params.movement.movements, function (movement) {
        return module.createMovementTreeNode(tt.core.cloneExtend(params, {
          movement: movement
        }));
      }),
      drop: function drop(droppedTreeNode) {
        if (droppedTreeNode.movement instanceof Movement) {
          params.movement.insertBefore(droppedTreeNode.movement);
          return;
        }
      }
    };
  };

  module.createMovementBasicTreeNode = function (params) {
    tt.initProperty(params.movement, 'name');
    return {
      movement: params.movement,
      labelTtNodes: [controlsUtil.createIconTtNode({
        icon: icons.MovementBasic
      }), tt.createTtNode({
        type: 'input',
        css: ['name-input'],
        value: function value() {
          return params.movement.getName();
        },
        change: function change(event) {
          params.movement.setName(event.srcElement.value);
        }
      }), controlsUtil.createIconTtNode({
        click: function () {
          params.movement.delete();
        }.bind(this),
        icon: ['fas', 'fa-trash-alt']
      })],
      childNodes: tt.createMappedList(params.movement.muscles, function (muscle) {
        return module.createMovementMuscleUsageTreeNode({
          movement: params.movement,
          muscle: muscle
        });
      }),
      drop: function drop(droppedTreeNode) {
        if (droppedTreeNode.movement instanceof Movement) {
          params.movement.insertBefore(droppedTreeNode.movement);
          return;
        }

        if (droppedTreeNode.muscle instanceof Muscle) {
          params.movement.addMuscle(droppedTreeNode.muscle);
          return;
        }
      }
    };
  };

  module.createMovementMuscleUsageTreeNode = function (params) {
    tt.initProperty(params.muscle, 'name');
    return {
      movement: params.movement,
      muscle: params.muscle,
      labelTtNodes: [controlsUtil.createIconTtNode({
        icon: icons.MuscleBasic
      }), tt.createTtNode({
        type: 'span',
        css: ['name-input'],
        text: function text() {
          return params.muscle.getName();
        }
      }), controlsUtil.createIconTtNode({
        click: function () {
          params.movement.removeMuscle(params.muscle);
        }.bind(this),
        icon: ['fas', 'fa-trash-alt']
      })],
      childNodes: []
    };
  };

  return module;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NhbXBsZXMvc3BvcnRzL3VpL2Rlc2t0b3AvbW92ZW1lbnQuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwidHQiLCJjb250cm9sc1V0aWwiLCJNb3ZlbWVudCIsIk11c2NsZSIsImljb25zIiwibW9kdWxlIiwiY3JlYXRlTW92ZW1lbnRUcmVlTm9kZSIsInBhcmFtcyIsIm1vdmVtZW50IiwibW92ZW1lbnRzIiwiY3JlYXRlTW92ZW1lbnRDb2xsZWN0aW9uVHJlZU5vZGUiLCJjcmVhdGVNb3ZlbWVudEJhc2ljVHJlZU5vZGUiLCJpbml0UHJvcGVydHkiLCJsYWJlbFR0Tm9kZXMiLCJjcmVhdGVJY29uVHROb2RlIiwiaWNvbiIsIk1vdmVtZW50Q29sbGVjdGlvbiIsImNyZWF0ZVR0Tm9kZSIsInR5cGUiLCJjc3MiLCJ2YWx1ZSIsImdldE5hbWUiLCJjaGFuZ2UiLCJldmVudCIsInNldE5hbWUiLCJzcmNFbGVtZW50IiwiY2xpY2siLCJjcmVhdGVNb3ZlbWVudENvbGxlY3Rpb24iLCJuYW1lIiwiYmluZCIsImNyZWF0ZU1vdmVtZW50QmFzaWMiLCJNb3ZlbWVudEJhc2ljIiwiZGVsZXRlIiwiY2hpbGROb2RlcyIsImNyZWF0ZU1hcHBlZExpc3QiLCJjb3JlIiwiY2xvbmVFeHRlbmQiLCJkcm9wIiwiZHJvcHBlZFRyZWVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwibXVzY2xlcyIsIm11c2NsZSIsImNyZWF0ZU1vdmVtZW50TXVzY2xlVXNhZ2VUcmVlTm9kZSIsImFkZE11c2NsZSIsIk11c2NsZUJhc2ljIiwidGV4dCIsInJlbW92ZU11c2NsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsdUJBQUQsRUFBMEIsMkJBQTFCLEVBQXVELHNCQUF2RCxFQUE4RSxvQkFBOUUsRUFBbUcsaUJBQW5HLENBQUQsRUFBd0gsVUFBVUMsRUFBVixFQUFjQyxZQUFkLEVBQTRCQyxRQUE1QixFQUFzQ0MsTUFBdEMsRUFBOENDLEtBQTlDLEVB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QUFFWCxLQUFLLENBQUN3QztBQURjLE9BQTlCLENBRFUsRUFJVjVDLEVBQUUsQ0FBQ2lCLFlBQUgsQ0FBZ0I7QUFDWkMsUUFBQUEsSUFBSSxFQUFFLE1BRE07QUFFWkMsUUFBQUEsR0FBRyxFQUFFLENBQUMsWUFBRCxDQUZPO0FBR1owQixRQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFBRSxpQkFBT3RDLE1BQU0sQ0FBQ2tDLE1BQVAsQ0FBY3BCLE9BQWQsRUFBUDtBQUFpQztBQUh6QyxPQUFoQixDQUpVLEVBU1ZwQixZQUFZLENBQUNhLGdCQUFiLENBQThCO0FBQzFCWSxRQUFBQSxLQUFLLEVBQUUsWUFBWTtBQUNmbkIsVUFBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCc0MsWUFBaEIsQ0FBNkJ2QyxNQUFNLENBQUNrQyxNQUFwQztBQUNILFNBRk0sQ0FFTFosSUFGSyxDQUVBLElBRkEsQ0FEbUI7QUFJMUJkLFFBQUFBLElBQUksRUFBRSxDQUFDLEtBQUQsRUFBUSxjQUFSO0FBSm9CLE9BQTlCLENBVFUsQ0FIWDtBQW1CSGtCLE1BQUFBLFVBQVUsRUFBRTtBQW5CVCxLQUFQO0FBcUJILEdBdkJEOztBQXlCQSxTQUFPNUIsTUFBUDtBQUVILENBOUhLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi8uLi8uLi9zcmMvaW5kZXgnLCAnLi4vLi4vLi4vLi4vY29udHJvbHMvdXRpbCcsICcuLi8uLi9tb2RlbC9Nb3ZlbWVudCcsJy4uLy4uL21vZGVsL011c2NsZScsJy4uL2NvbW1vbi9pY29ucyddLCBmdW5jdGlvbiAodHQsIGNvbnRyb2xzVXRpbCwgTW92ZW1lbnQsIE11c2NsZSwgaWNvbnMpIHtcblxuICAgIHZhciBtb2R1bGUgPSB7fTtcblxuICAgIG1vZHVsZS5jcmVhdGVNb3ZlbWVudFRyZWVOb2RlID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLm1vdmVtZW50Lm1vdmVtZW50cykge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5jcmVhdGVNb3ZlbWVudENvbGxlY3Rpb25UcmVlTm9kZShwYXJhbXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5jcmVhdGVNb3ZlbWVudEJhc2ljVHJlZU5vZGUocGFyYW1zKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBtb2R1bGUuY3JlYXRlTW92ZW1lbnRDb2xsZWN0aW9uVHJlZU5vZGUgPSBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgIHR0LmluaXRQcm9wZXJ0eShwYXJhbXMubW92ZW1lbnQsICduYW1lJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb3ZlbWVudDogcGFyYW1zLm1vdmVtZW50LFxuICAgICAgICAgICAgbGFiZWxUdE5vZGVzOiBbXG4gICAgICAgICAgICAgICAgY29udHJvbHNVdGlsLmNyZWF0ZUljb25UdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICBpY29uOiBpY29ucy5Nb3ZlbWVudENvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFsnbmFtZS1pbnB1dCddLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyYW1zLm1vdmVtZW50LmdldE5hbWUoKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5tb3ZlbWVudC5zZXROYW1lKGV2ZW50LnNyY0VsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY29udHJvbHNVdGlsLmNyZWF0ZUljb25UdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm1vdmVtZW50LmNyZWF0ZU1vdmVtZW50Q29sbGVjdGlvbih7IG5hbWU6ICdOZXcgQ29sbGVjdGlvbicgfSlcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBpY29ucy5jcmVhdGVNb3ZlbWVudENvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjb250cm9sc1V0aWwuY3JlYXRlSWNvblR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMubW92ZW1lbnQuY3JlYXRlTW92ZW1lbnRCYXNpYyh7IG5hbWU6ICdOZXcgTW92ZW1lbnQnIH0pXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogaWNvbnMuTW92ZW1lbnRCYXNpY1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xzVXRpbC5jcmVhdGVJY29uVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5tb3ZlbWVudC5kZWxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBbJ2ZhcycsICdmYS10cmFzaC1hbHQnXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgY2hpbGROb2RlczogdHQuY3JlYXRlTWFwcGVkTGlzdChwYXJhbXMubW92ZW1lbnQubW92ZW1lbnRzLCBmdW5jdGlvbiAobW92ZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kdWxlLmNyZWF0ZU1vdmVtZW50VHJlZU5vZGUodHQuY29yZS5jbG9uZUV4dGVuZChwYXJhbXMsIHsgbW92ZW1lbnQ6IG1vdmVtZW50IH0pKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZHJvcDogZnVuY3Rpb24gKGRyb3BwZWRUcmVlTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChkcm9wcGVkVHJlZU5vZGUubW92ZW1lbnQgaW5zdGFuY2VvZiBNb3ZlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubW92ZW1lbnQuaW5zZXJ0QmVmb3JlKGRyb3BwZWRUcmVlTm9kZS5tb3ZlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgbW9kdWxlLmNyZWF0ZU1vdmVtZW50QmFzaWNUcmVlTm9kZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgdHQuaW5pdFByb3BlcnR5KHBhcmFtcy5tb3ZlbWVudCwgJ25hbWUnKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1vdmVtZW50OiBwYXJhbXMubW92ZW1lbnQsXG4gICAgICAgICAgICBsYWJlbFR0Tm9kZXM6IFtcbiAgICAgICAgICAgICAgICBjb250cm9sc1V0aWwuY3JlYXRlSWNvblR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgIGljb246IGljb25zLk1vdmVtZW50QmFzaWNcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IFsnbmFtZS1pbnB1dCddLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyYW1zLm1vdmVtZW50LmdldE5hbWUoKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5tb3ZlbWVudC5zZXROYW1lKGV2ZW50LnNyY0VsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY29udHJvbHNVdGlsLmNyZWF0ZUljb25UdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm1vdmVtZW50LmRlbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIGljb246IFsnZmFzJywgJ2ZhLXRyYXNoLWFsdCddXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjaGlsZE5vZGVzOiB0dC5jcmVhdGVNYXBwZWRMaXN0KHBhcmFtcy5tb3ZlbWVudC5tdXNjbGVzLCBmdW5jdGlvbiAobXVzY2xlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZHVsZS5jcmVhdGVNb3ZlbWVudE11c2NsZVVzYWdlVHJlZU5vZGUoeyBtb3ZlbWVudDogcGFyYW1zLm1vdmVtZW50LCBtdXNjbGU6IG11c2NsZSB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZHJvcDogZnVuY3Rpb24gKGRyb3BwZWRUcmVlTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChkcm9wcGVkVHJlZU5vZGUubW92ZW1lbnQgaW5zdGFuY2VvZiBNb3ZlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXMubW92ZW1lbnQuaW5zZXJ0QmVmb3JlKGRyb3BwZWRUcmVlTm9kZS5tb3ZlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRyb3BwZWRUcmVlTm9kZS5tdXNjbGUgaW5zdGFuY2VvZiBNdXNjbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm1vdmVtZW50LmFkZE11c2NsZShkcm9wcGVkVHJlZU5vZGUubXVzY2xlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgbW9kdWxlLmNyZWF0ZU1vdmVtZW50TXVzY2xlVXNhZ2VUcmVlTm9kZSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgdHQuaW5pdFByb3BlcnR5KHBhcmFtcy5tdXNjbGUsICduYW1lJyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb3ZlbWVudDogcGFyYW1zLm1vdmVtZW50LFxuICAgICAgICAgICAgbXVzY2xlOiBwYXJhbXMubXVzY2xlLFxuICAgICAgICAgICAgbGFiZWxUdE5vZGVzOiBbXG4gICAgICAgICAgICAgICAgY29udHJvbHNVdGlsLmNyZWF0ZUljb25UdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICBpY29uOiBpY29ucy5NdXNjbGVCYXNpY1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ25hbWUtaW5wdXQnXSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyYW1zLm11c2NsZS5nZXROYW1lKCk7IH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjb250cm9sc1V0aWwuY3JlYXRlSWNvblR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMubW92ZW1lbnQucmVtb3ZlTXVzY2xlKHBhcmFtcy5tdXNjbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIGljb246IFsnZmFzJywgJ2ZhLXRyYXNoLWFsdCddXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBjaGlsZE5vZGVzOiBbXVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gbW9kdWxlO1xuXG59KTtcbiJdfQ==