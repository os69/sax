"use strict";

define(['../../src/index', '../../controls/util'], function (tt, controlsUtil) {
  var TreeNode = tt.core.defineClass({
    init: function init(params) {
      this.label = params.label;
      this.parentNode = null;
      this.childNodes = [];
      this.labelTtNode = null;
      this.createLabelTtNodes();
    },
    createLabelTtNodes: function createLabelTtNodes() {
      this.labelTtNodes = [tt.createTtNode({
        type: 'input',
        value: function () {
          return this.getLabel();
        }.bind(this),
        css: ['sample-tree-node-input'],
        change: function (event) {
          this.setLabel(event.srcElement.value);
        }.bind(this)
      }), controlsUtil.createIconTtNode({
        click: function () {
          this.createChildNode({
            label: 'new'
          });
        }.bind(this),
        icon: ['fas', 'fa-plus-square']
      }), controlsUtil.createIconTtNode({
        click: function () {
          this.delete();
        }.bind(this),
        icon: ['fas', 'fa-trash-alt']
      })];
    },
    getLabel: function getLabel() {
      return this.label;
    },
    setLabel: function setLabel(label) {
      this.label = label;
    },
    createChildNode: function createChildNode(params) {
      var childNode = new TreeNode(params);
      childNode.parentNode = this;
      this.childNodes.push(childNode);
      return childNode;
    },
    appendChildNode: function appendChildNode(node) {
      var oldParentNode = node.parentNode;
      tt.core.removeObject(oldParentNode.childNodes, node);
      this.childNodes.push(node);
      node.parentNode = this;
    },
    delete: function _delete() {
      tt.core.removeObject(this.parentNode.childNodes, this);
    },
    drop: function drop(droppedTreeNode) {
      this.appendChildNode(droppedTreeNode);
    }
  });
  return TreeNode;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NhbXBsZXMvdHJlZS9UcmVlTm9kZS5qcyJdLCJuYW1lcyI6WyJkZWZpbmUiLCJ0dCIsImNvbnRyb2xzVXRpbCIsIlRyZWVOb2RlIiwiY29yZSIsImRlZmluZUNsYXNzIiwiaW5pdCIsInBhcmFtcyIsImxhYmVsIiwicGFyZW50Tm9kZSIsImNoaWxkTm9kZXMiLCJsYWJlbFR0Tm9kZSIsImNyZWF0ZUxhYmVsVHROb2RlcyIsImxhYmVsVHROb2RlcyIsImNyZWF0ZVR0Tm9kZSIsInR5cGUiLCJ2YWx1ZSIsImdldExhYmVsIiwiYmluZCIsImNzcyIsImNoYW5nZSIsImV2ZW50Iiwic2V0TGFiZWwiLCJzcmNFbGVtZW50IiwiY3JlYXRlSWNvblR0Tm9kZSIsImNsaWNrIiwiY3JlYXRlQ2hpbGROb2RlIiwiaWNvbiIsImRlbGV0ZSIsImNoaWxkTm9kZSIsInB1c2giLCJhcHBlbmRDaGlsZE5vZGUiLCJub2RlIiwib2xkUGFyZW50Tm9kZSIsInJlbW92ZU9iamVjdCIsImRyb3AiLCJkcm9wcGVkVHJlZU5vZGUiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE1BQU0sQ0FBQyxDQUFDLGlCQUFELEVBQW9CLHFCQUFwQixDQUFELEVBQTZDLFVBQVVDLEVBQVYsRUFBY0MsWUFBZCxFQUE0QjtBQUUzRSxNQUFJQyxRQUFRLEdBQUdGLEVBQUUsQ0FBQ0csSUFBSCxDQUFRQyxXQUFSLENBQW9CO0FBRS9CQyxJQUFBQSxJQUFJLEVBQUUsY0FBVUMsTUFBVixFQUFrQjtBQUNwQixXQUFLQyxLQUFMLEdBQWFELE1BQU0sQ0FBQ0MsS0FBcEI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxXQUFLQyxrQkFBTDtBQUNILEtBUjhCO0FBVS9CQSxJQUFBQSxrQkFBa0IsRUFBRSw4QkFBWTtBQUM1QixXQUFLQyxZQUFMLEdBQW9CLENBQ2hCWixFQUFFLENBQUNhLFlBQUgsQ0FBZ0I7QUFDWkMsUUFBQUEsSUFBSSxFQUFFLE9BRE07QUFFWkMsUUFBQUEsS0FBSyxFQUFFLFlBQVk7QUFBRSxpQkFBTyxLQUFLQyxRQUFMLEVBQVA7QUFBeUIsU0FBdkMsQ0FBd0NDLElBQXhDLENBQTZDLElBQTdDLENBRks7QUFHWkMsUUFBQUEsR0FBRyxFQUFFLENBQUMsd0JBQUQsQ0FITztBQUlaQyxRQUFBQSxNQUFNLEVBQUUsVUFBVUMsS0FBVixFQUFpQjtBQUNyQixlQUFLQyxRQUFMLENBQWNELEtBQUssQ0FBQ0UsVUFBTixDQUFpQlAsS0FBL0I7QUFDSCxTQUZPLENBRU5FLElBRk0sQ0FFRCxJQUZDO0FBSkksT0FBaEIsQ0FEZ0IsRUFTaEJoQixZQUFZLENBQUNzQixnQkFBYixDQUE4QjtBQUMxQkMsUUFBQUEsS0FBSyxFQUFFLFlBQVk7QUFDZixlQUFLQyxlQUFMLENBQXFCO0FBQUVsQixZQUFBQSxLQUFLLEVBQUU7QUFBVCxXQUFyQjtBQUVILFNBSE0sQ0FHTFUsSUFISyxDQUdBLElBSEEsQ0FEbUI7QUFLMUJTLFFBQUFBLElBQUksRUFBRSxDQUFDLEtBQUQsRUFBUSxnQkFBUjtBQUxvQixPQUE5QixDQVRnQixFQWdCaEJ6QixZQUFZLENBQUNzQixnQkFBYixDQUE4QjtBQUMxQkMsUUFBQUEsS0FBSyxFQUFFLFlBQVk7QUFDZixlQUFLRyxNQUFMO0FBQ0gsU0FGTSxDQUVMVixJQUZLLENBRUEsSUFGQSxDQURtQjtBQUkxQlMsUUFBQUEsSUFBSSxFQUFFLENBQUMsS0FBRCxFQUFRLGNBQVI7QUFKb0IsT0FBOUIsQ0FoQmdCLENBQXBCO0FBc0JILEtBakM4QjtBQW1DL0JWLElBQUFBLFFBQVEsRUFBRSxvQkFBWTtBQUNsQixhQUFPLEtBQUtULEtBQVo7QUFDSCxLQXJDOEI7QUF1Qy9CYyxJQUFBQSxRQUFRLEVBQUUsa0JBQVVkLEtBQVYsRUFBaUI7QUFDdkIsV0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0gsS0F6QzhCO0FBMkMvQmtCLElBQUFBLGVBQWUsRUFBRSx5QkFBVW5CLE1BQVYsRUFBa0I7QUFDL0IsVUFBSXNCLFNBQVMsR0FBRyxJQUFJMUIsUUFBSixDQUFhSSxNQUFiLENBQWhCO0FBQ0FzQixNQUFBQSxTQUFTLENBQUNwQixVQUFWLEdBQXVCLElBQXZCO0FBQ0EsV0FBS0MsVUFBTCxDQUFnQm9CLElBQWhCLENBQXFCRCxTQUFyQjtBQUNBLGFBQU9BLFNBQVA7QUFDSCxLQWhEOEI7QUFrRC9CRSxJQUFBQSxlQUFlLEVBQUUseUJBQVVDLElBQVYsRUFBZ0I7QUFDN0IsVUFBSUMsYUFBYSxHQUFHRCxJQUFJLENBQUN2QixVQUF6QjtBQUNBUixNQUFBQSxFQUFFLENBQUNHLElBQUgsQ0FBUThCLFlBQVIsQ0FBcUJELGFBQWEsQ0FBQ3ZCLFVBQW5DLEVBQStDc0IsSUFBL0M7QUFDQSxXQUFLdEIsVUFBTCxDQUFnQm9CLElBQWhCLENBQXFCRSxJQUFyQjtBQUNBQSxNQUFBQSxJQUFJLENBQUN2QixVQUFMLEdBQWtCLElBQWxCO0FBQ0gsS0F2RDhCO0FBeUQvQm1CLElBQUFBLE1BQU0sRUFBRSxtQkFBWTtBQUNoQjNCLE1BQUFBLEVBQUUsQ0FBQ0csSUFBSCxDQUFROEIsWUFBUixDQUFxQixLQUFLekIsVUFBTCxDQUFnQkMsVUFBckMsRUFBaUQsSUFBakQ7QUFDSCxLQTNEOEI7QUE2RC9CeUIsSUFBQUEsSUFBSSxFQUFFLGNBQVNDLGVBQVQsRUFBeUI7QUFDM0IsV0FBS0wsZUFBTCxDQUFxQkssZUFBckI7QUFDSDtBQS9EOEIsR0FBcEIsQ0FBZjtBQW1FQSxTQUFPakMsUUFBUDtBQUVILENBdkVLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi9zcmMvaW5kZXgnLCAnLi4vLi4vY29udHJvbHMvdXRpbCddLCBmdW5jdGlvbiAodHQsIGNvbnRyb2xzVXRpbCkge1xuXG4gICAgdmFyIFRyZWVOb2RlID0gdHQuY29yZS5kZWZpbmVDbGFzcyh7XG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxUdE5vZGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVMYWJlbFR0Tm9kZXMoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMYWJlbFR0Tm9kZXM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubGFiZWxUdE5vZGVzID0gW1xuICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmdldExhYmVsKCk7IH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ3NhbXBsZS10cmVlLW5vZGUtaW5wdXQnXSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TGFiZWwoZXZlbnQuc3JjRWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xzVXRpbC5jcmVhdGVJY29uVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2hpbGROb2RlKHsgbGFiZWw6ICduZXcnIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBbJ2ZhcycsICdmYS1wbHVzLXNxdWFyZSddXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY29udHJvbHNVdGlsLmNyZWF0ZUljb25UdE5vZGUoe1xuICAgICAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBbJ2ZhcycsICdmYS10cmFzaC1hbHQnXVxuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRMYWJlbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGFiZWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TGFiZWw6IGZ1bmN0aW9uIChsYWJlbCkge1xuICAgICAgICAgICAgdGhpcy5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUNoaWxkTm9kZTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IG5ldyBUcmVlTm9kZShwYXJhbXMpO1xuICAgICAgICAgICAgY2hpbGROb2RlLnBhcmVudE5vZGUgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5jaGlsZE5vZGVzLnB1c2goY2hpbGROb2RlKTtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZE5vZGU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXBwZW5kQ2hpbGROb2RlOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgdmFyIG9sZFBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICB0dC5jb3JlLnJlbW92ZU9iamVjdChvbGRQYXJlbnROb2RlLmNoaWxkTm9kZXMsIG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZE5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICBub2RlLnBhcmVudE5vZGUgPSB0aGlzO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRlbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHQuY29yZS5yZW1vdmVPYmplY3QodGhpcy5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGRyb3A6IGZ1bmN0aW9uKGRyb3BwZWRUcmVlTm9kZSl7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZENoaWxkTm9kZShkcm9wcGVkVHJlZU5vZGUpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHJldHVybiBUcmVlTm9kZTtcblxufSk7Il19