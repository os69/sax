"use strict";

define(['../src/index'], function (tt) {
  var testCases = {};
  testCases.mappedList1 = {
    label: 'Mapped List 1',
    skip: false,
    execute: function execute(ctx) {
      var obj = {
        offset1: 10,
        offset2: 100
      };
      tt.initProperty(obj, 'offset1');
      tt.initProperty(obj, 'offset2');
      var list1 = [1, 2, 3, 4];
      var list2 = tt.createMappedList(list1, function (x) {
        return x + obj.getOffset1();
      });
      ctx.assertEqualsList(list2, []);
      var observer = tt.createListObserver(list2);
      ctx.assertEqualsList(list2, [11, 12, 13, 14]);
      observer.delete();
    }
  };
  testCases.mappedList2 = {
    label: 'Mapped List 2',
    execute: function execute(ctx) {
      var obj = {
        offset1: 10,
        offset2: 100
      };
      tt.initProperty(obj, 'offset1');
      tt.initProperty(obj, 'offset2');
      var list1 = [1, 2, 3, 4];
      var list2 = tt.createMappedList(list1, function (x) {
        return x + obj.getOffset1();
      });
      var list3 = tt.createMappedList(list2, function (x) {
        return x + obj.getOffset2();
      });
      ctx.assertEqualsList(list2, []);
      ctx.assertEqualsList(list3, []);
      var observer = tt.createListObserver(list3);
      ctx.assertEqualsList(list2, [11, 12, 13, 14]);
      ctx.assertEqualsList(list3, [111, 112, 113, 114]);
      list1.push(5);
      ctx.assertEqualsList(list2, [11, 12, 13, 14, 15]);
      ctx.assertEqualsList(list3, [111, 112, 113, 114, 115]);
      obj.setOffset1(20);
      ctx.assertEqualsList(list2, [21, 22, 23, 24, 25]);
      ctx.assertEqualsList(list3, [121, 122, 123, 124, 125]);
      obj.setOffset2(200);
      ctx.assertEqualsList(list2, [21, 22, 23, 24, 25]);
      ctx.assertEqualsList(list3, [221, 222, 223, 224, 225]);
      observer.delete();
    }
  };
  return testCases;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvdGVzdE1hcHBlZExpc3QuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwidHQiLCJ0ZXN0Q2FzZXMiLCJtYXBwZWRMaXN0MSIsImxhYmVsIiwic2tpcCIsImV4ZWN1dGUiLCJjdHgiLCJvYmoiLCJvZmZzZXQxIiwib2Zmc2V0MiIsImluaXRQcm9wZXJ0eSIsImxpc3QxIiwibGlzdDIiLCJjcmVhdGVNYXBwZWRMaXN0IiwieCIsImdldE9mZnNldDEiLCJhc3NlcnRFcXVhbHNMaXN0Iiwib2JzZXJ2ZXIiLCJjcmVhdGVMaXN0T2JzZXJ2ZXIiLCJkZWxldGUiLCJtYXBwZWRMaXN0MiIsImxpc3QzIiwiZ2V0T2Zmc2V0MiIsInB1c2giLCJzZXRPZmZzZXQxIiwic2V0T2Zmc2V0MiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsY0FBRCxDQUFELEVBQW1CLFVBQVVDLEVBQVYsRUFBYztBQUVuQyxNQUFJQyxTQUFTLEdBQUcsRUFBaEI7QUFFQUEsRUFBQUEsU0FBUyxDQUFDQyxXQUFWLEdBQXdCO0FBQ3BCQyxJQUFBQSxLQUFLLEVBQUUsZUFEYTtBQUVwQkMsSUFBQUEsSUFBSSxFQUFFLEtBRmM7QUFHcEJDLElBQUFBLE9BQU8sRUFBRSxpQkFBVUMsR0FBVixFQUFlO0FBRXBCLFVBQUlDLEdBQUcsR0FBRztBQUNOQyxRQUFBQSxPQUFPLEVBQUUsRUFESDtBQUVOQyxRQUFBQSxPQUFPLEVBQUU7QUFGSCxPQUFWO0FBSUFULE1BQUFBLEVBQUUsQ0FBQ1UsWUFBSCxDQUFnQkgsR0FBaEIsRUFBcUIsU0FBckI7QUFDQVAsTUFBQUEsRUFBRSxDQUFDVSxZQUFILENBQWdCSCxHQUFoQixFQUFxQixTQUFyQjtBQUVBLFVBQUlJLEtBQUssR0FBRyxDQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sQ0FBUCxFQUFVLENBQVYsQ0FBWjtBQUNBLFVBQUlDLEtBQUssR0FBR1osRUFBRSxDQUFDYSxnQkFBSCxDQUFvQkYsS0FBcEIsRUFBMkIsVUFBVUcs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LEdBQXJCLENBQTVCO0FBRUFkLE1BQUFBLEdBQUcsQ0FBQ2tCLFVBQUosQ0FBZSxHQUFmO0FBQ0FuQixNQUFBQSxHQUFHLENBQUNVLGdCQUFKLENBQXFCSixLQUFyQixFQUE0QixDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsRUFBaUIsRUFBakIsQ0FBNUI7QUFDQU4sTUFBQUEsR0FBRyxDQUFDVSxnQkFBSixDQUFxQkssS0FBckIsRUFBNEIsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FBNUI7QUFFQUosTUFBQUEsUUFBUSxDQUFDRSxNQUFUO0FBRUg7QUF4Q21CLEdBQXhCO0FBNENBLFNBQU9sQixTQUFQO0FBQ0gsQ0ExRUssQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbJy4uL3NyYy9pbmRleCddLCBmdW5jdGlvbiAodHQpIHtcblxuICAgIHZhciB0ZXN0Q2FzZXMgPSB7fTtcblxuICAgIHRlc3RDYXNlcy5tYXBwZWRMaXN0MSA9IHtcbiAgICAgICAgbGFiZWw6ICdNYXBwZWQgTGlzdCAxJyxcbiAgICAgICAgc2tpcDogZmFsc2UsXG4gICAgICAgIGV4ZWN1dGU6IGZ1bmN0aW9uIChjdHgpIHtcblxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICBvZmZzZXQxOiAxMCxcbiAgICAgICAgICAgICAgICBvZmZzZXQyOiAxMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0dC5pbml0UHJvcGVydHkob2JqLCAnb2Zmc2V0MScpO1xuICAgICAgICAgICAgdHQuaW5pdFByb3BlcnR5KG9iaiwgJ29mZnNldDInKTtcblxuICAgICAgICAgICAgdmFyIGxpc3QxID0gWzEsIDIsIDMsIDRdO1xuICAgICAgICAgICAgdmFyIGxpc3QyID0gdHQuY3JlYXRlTWFwcGVkTGlzdChsaXN0MSwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geCArIG9iai5nZXRPZmZzZXQxKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY3R4LmFzc2VydEVxdWFsc0xpc3QobGlzdDIsIFtdKTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IHR0LmNyZWF0ZUxpc3RPYnNlcnZlcihsaXN0Mik7XG4gICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzTGlzdChsaXN0MiwgWzExLCAxMiwgMTMsIDE0XSk7XG4gICAgICAgICAgICBvYnNlcnZlci5kZWxldGUoKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRlc3RDYXNlcy5tYXBwZWRMaXN0MiA9IHtcbiAgICAgICAgbGFiZWw6ICdNYXBwZWQgTGlzdCAyJyxcbiAgICAgICAgZXhlY3V0ZTogZnVuY3Rpb24gKGN0eCkge1xuXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIG9mZnNldDE6IDEwLFxuICAgICAgICAgICAgICAgIG9mZnNldDI6IDEwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHR0LmluaXRQcm9wZXJ0eShvYmosICdvZmZzZXQxJyk7XG4gICAgICAgICAgICB0dC5pbml0UHJvcGVydHkob2JqLCAnb2Zmc2V0MicpO1xuXG4gICAgICAgICAgICB2YXIgbGlzdDEgPSBbMSwgMiwgMywgNF07XG4gICAgICAgICAgICB2YXIgbGlzdDIgPSB0dC5jcmVhdGVNYXBwZWRMaXN0KGxpc3QxLCBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4ICsgb2JqLmdldE9mZnNldDEoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGxpc3QzID0gdHQuY3JlYXRlTWFwcGVkTGlzdChsaXN0MiwgZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geCArIG9iai5nZXRPZmZzZXQyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHNMaXN0KGxpc3QyLCBbXSk7XG4gICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzTGlzdChsaXN0MywgW10pO1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gdHQuY3JlYXRlTGlzdE9ic2VydmVyKGxpc3QzKTtcbiAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHNMaXN0KGxpc3QyLCBbMTEsIDEyLCAxMywgMTRdKTtcbiAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHNMaXN0KGxpc3QzLCBbMTExLCAxMTIsIDExMywgMTE0XSk7XG5cblxuICAgICAgICAgICAgbGlzdDEucHVzaCg1KTtcbiAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHNMaXN0KGxpc3QyLCBbMTEsIDEyLCAxMywgMTQsIDE1XSk7XG4gICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzTGlzdChsaXN0MywgWzExMSwgMTEyLCAxMTMsIDExNCwgMTE1XSk7XG5cblxuICAgICAgICAgICAgb2JqLnNldE9mZnNldDEoMjApO1xuICAgICAgICAgICAgY3R4LmFzc2VydEVxdWFsc0xpc3QobGlzdDIsIFsyMSwgMjIsIDIzLCAyNCwgMjVdKTtcbiAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHNMaXN0KGxpc3QzLCBbMTIxLCAxMjIsIDEyMywgMTI0LCAxMjVdKTtcblxuICAgICAgICAgICAgb2JqLnNldE9mZnNldDIoMjAwKTtcbiAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHNMaXN0KGxpc3QyLCBbMjEsIDIyLCAyMywgMjQsIDI1XSk7XG4gICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzTGlzdChsaXN0MywgWzIyMSwgMjIyLCAyMjMsIDIyNCwgMjI1XSk7XG5cbiAgICAgICAgICAgIG9ic2VydmVyLmRlbGV0ZSgpO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gdGVzdENhc2VzO1xufSk7XG5cblxuXG5cbiJdfQ==