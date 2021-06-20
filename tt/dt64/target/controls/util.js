"use strict";

define(['../src/index'], function (tt) {
  return {
    createLabelTtNode: function createLabelTtNode(label) {
      return tt.createTtNode({
        type: 'span',
        text: label
      });
    },
    createIconTtNode: function createIconTtNode(params) {
      return tt.createTtNode({
        type: 'span',
        click: params.click,
        css: ['icon'],
        children: [tt.createTtNode({
          type: 'i',
          css: params.icon
        })]
      });
    },
    createWidgetTtNode: function createWidgetTtNode(params) {
      return tt.createTtNode({
        type: 'article',
        css: ['message'],
        children: [tt.createTtNode({
          type: 'div',
          css: ['message-header'],
          children: [tt.createTtNode({
            type: 'p',
            text: params.header
          }), tt.createTtNode({
            type: 'button',
            css: ['delete']
          })]
        }), tt.createTtNode({
          type: 'div',
          css: ['message-body'],
          children: params.body
        })]
      });
    },
    createInputTtNode: function createInputTtNode(params) {
      return tt.createTtNode({
        type: 'div',
        css: ['field'],
        children: [tt.createTtNode({
          type: 'label',
          css: ['label'],
          text: params.label
        }), tt.createTtNode({
          type: 'div',
          css: ['control'],
          children: [tt.createTtNode({
            type: 'input',
            css: ['input'],
            disabled: params.disabled,
            value: params.value,
            change: params.change
          })]
        })]
      });
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NvbnRyb2xzL3V0aWwuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwidHQiLCJjcmVhdGVMYWJlbFR0Tm9kZSIsImxhYmVsIiwiY3JlYXRlVHROb2RlIiwidHlwZSIsInRleHQiLCJjcmVhdGVJY29uVHROb2RlIiwicGFyYW1zIiwiY2xpY2siLCJjc3MiLCJjaGlsZHJlbiIsImljb24iLCJjcmVhdGVXaWRnZXRUdE5vZGUiLCJoZWFkZXIiLCJib2R5IiwiY3JlYXRlSW5wdXRUdE5vZGUiLCJkaXNhYmxlZCIsInZhbHVlIiwiY2hhbmdlIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxNQUFNLENBQUMsQ0FBQyxjQUFELENBQUQsRUFBbUIsVUFBVUMsRUFBVixFQUFjO0FBRW5DLFNBQU87QUFFSEMsSUFBQUEsaUJBQWlCLEVBQUUsMkJBQVVDLEtBQVYsRUFBaUI7QUFDaEMsYUFBT0YsRUFBRSxDQUFDRyxZQUFILENBQWdCO0FBQ25CQyxRQUFBQSxJQUFJLEVBQUUsTUFEYTtBQUVuQkMsUUFBQUEsSUFBSSxFQUFFSDtBQUZhLE9BQWhCLENBQVA7QUFJSCxLQVBFO0FBU0hJLElBQUFBLGdCQUFnQixFQUFFLDBCQUFVQyxNQUFWLEVBQWtCO0FBQ2hDLGFBQU9QLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQjtBQUNuQkMsUUFBQUEsSUFBSSxFQUFFLE1BRGE7QUFFbkJJLFFBQUFBLEtBQUssRUFBRUQsTUFBTSxDQUFDQyxLQUZLO0FBR25CQyxRQUFBQSxHQUFHLEVBQUUsQ0FBQyxNQUFELENBSGM7QUFJbkJDLFFBQUFBLFFBQVEsRUFBRSxDQUFDVixFQUFFLENBQUNHLFlBQUgsQ0FBZ0I7QUFDdkJDLFVBQUFBLElBQUksRUFBRSxHQURpQjtBQUV2QkssVUFBQUEsR0FBRyxFQUFFRixNQUFNLENBQUNJO0FBRlcsU0FBaEIsQ0FBRDtBQUpTLE9BQWhCLENBQVA7QUFTSCxLQW5CRTtBQXFCSEMsSUFBQUEsa0JBQWtCLEVBQUUsNEJBQVVMLE1BQVYsRUFBa0I7QUFDbEMsYUFBT1AsRUFBRSxDQUFDRyxZQUFILENBQWdCO0FBQ25CQyxRQUFBQSxJQUFJLEVBQUUsU0FEYTtBQUVuQkssUUFBQUEsR0FBRyxFQUFFLENBQUMsU0FBRCxDQUZjO0FBR25CQyxRQUFBQSxRQUFRLEVBQUUsQ0FDTlYsRUFBRSxDQUFDRyxZQUFILENBQWdCO0FBQ1pDLFVBQUFBLElBQUksRUFBRSxLQURNO0FBRVpLLFVBQUFBLEdBQUcsRUFBRSxDQUFDLGdCQUFELENBRk87QUFHWkMsVUFBQUEsUUFBUSxFQUFFLENBQ05WLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQjtBQUNaQyxZQUFBQSxJQUFJLEVBQUUsR0FETTtBQUVaQyxZQUFBQSxJQUFJLEVBQUVFLE1BQU0sQ0FBQ007QUFGRCxXQUFoQixDQURNLEVBS05iLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQjtBQUNaQyxZQUFBQSxJQUFJLEVBQUUsUUFETTtBQUVaSyxZQUFBQSxHQUFHLEVBQUUsQ0FBQyxRQUFEO0FBRk8sV0FBaEIsQ0FMTTtBQUhFLFNBQWhCLENBRE0sRUFlTlQsRUFBRSxDQUFDRyxZQUFILENBQWdCO0FBQ1pDLFVBQUFBLElBQUksRUFBRSxLQURNO0FBRVpLLFVBQUFBLEdBQUcsRUFBRSxDQUFDLGNBQUQsQ0FGTztBQUdaQyxVQUFBQSxRQUFRLEVBQUVILE1BQU0sQ0FBQ087QUFITCxTQUFoQixDQWZNO0FBSFMsT0FBaEIsQ0FBUDtBQXlCSCxLQS9DRTtBQWlESEMsSUFBQUEsaUJBQWlCLEVBQUUsMkJBQVVSLE1BQVYsRUFBa0I7QUFDakMsYUFBT1AsRUFBRSxDQUFDRyxZQUFILENBQWdCO0FBQ25CQyxRQUFBQSxJQUFJLEVBQUUsS0FEYTtBQUVuQkssUUFBQUEsR0FBRyxFQUFFLENBQUMsT0FBRCxDQUZjO0FBR25CQyxRQUFBQSxRQUFRLEVBQUUsQ0FDTlYsRUFBRSxDQUFDRyxZQUFILENBQWdCO0FBQ1pDLFVBQUFBLElBQUksRUFBRSxPQURNO0FBRVpLLFVBQUFBLEdBQUcsRUFBRSxDQUFDLE9BQUQsQ0FGTztBQUdaSixVQUFBQSxJQUFJLEVBQUVFLE1BQU0sQ0FBQ0w7QUFIRCxTQUFoQixDQURNLEVBTU5GLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQjtBQUNaQyxVQUFBQSxJQUFJLEVBQUUsS0FETTtBQUVaSyxVQUFBQSxHQUFHLEVBQUUsQ0FBQyxTQUFELENBRk87QUFHWkMsVUFBQUEsUUFBUSxFQUFFLENBQUNWLEVBQUUsQ0FBQ0csWUFBSCxDQUFnQjtBQUN2QkMsWUFBQUEsSUFBSSxFQUFFLE9BRGlCO0FBRXZCSyxZQUFBQSxHQUFHLEVBQUUsQ0FBQyxPQUFELENBRmtCO0FBR3ZCTyxZQUFBQSxRQUFRLEVBQUVULE1BQU0sQ0FBQ1MsUUFITTtBQUl2QkMsWUFBQUEsS0FBSyxFQUFFVixNQUFNLENBQUNVLEtBSlM7QUFLdkJDLFlBQUFBLE1BQU0sRUFBRVgsTUFBTSxDQUFDVztBQUxRLFdBQWhCLENBQUQ7QUFIRSxTQUFoQixDQU5NO0FBSFMsT0FBaEIsQ0FBUDtBQXFCSDtBQXZFRSxHQUFQO0FBMEVILENBNUVLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi9zcmMvaW5kZXgnXSwgZnVuY3Rpb24gKHR0KSB7XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZUxhYmVsVHROb2RlOiBmdW5jdGlvbiAobGFiZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0dC5jcmVhdGVUdE5vZGUoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzcGFuJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBsYWJlbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVJY29uVHROb2RlOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICByZXR1cm4gdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnc3BhbicsXG4gICAgICAgICAgICAgICAgY2xpY2s6IHBhcmFtcy5jbGljayxcbiAgICAgICAgICAgICAgICBjc3M6IFsnaWNvbiddLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2knLFxuICAgICAgICAgICAgICAgICAgICBjc3M6IHBhcmFtcy5pY29uXG4gICAgICAgICAgICAgICAgfSldXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVdpZGdldFR0Tm9kZTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2FydGljbGUnLFxuICAgICAgICAgICAgICAgIGNzczogWydtZXNzYWdlJ10sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ21lc3NhZ2UtaGVhZGVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcGFyYW1zLmhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnZGVsZXRlJ11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ21lc3NhZ2UtYm9keSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IHBhcmFtcy5ib2R5XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVJbnB1dFR0Tm9kZTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgcmV0dXJuIHR0LmNyZWF0ZVR0Tm9kZSh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2RpdicsXG4gICAgICAgICAgICAgICAgY3NzOiBbJ2ZpZWxkJ10sXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M6IFsnbGFiZWwnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHBhcmFtcy5sYWJlbFxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzOiBbJ2NvbnRyb2wnXSwgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbdHQuY3JlYXRlVHROb2RlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaW5wdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzczogWydpbnB1dCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBwYXJhbXMuZGlzYWJsZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcmFtcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2U6IHBhcmFtcy5jaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXVxuICAgICAgICAgICAgICAgICAgICB9KV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxufSk7Il19