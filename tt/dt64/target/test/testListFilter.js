"use strict";

define(['../src/index', '../src/tt/list/ListFilter'], function (tt, ListFilter) {
  var testCases = {};
  testCases.listFilter1 = {
    label: 'List Filter 1',
    execute: function execute(ctx) {
      var str = function str(list) {
        return JSON.stringify(list);
      };

      var rnd = function rnd(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
      };

      var testList = function testList(list, visibility, spliceArgs) {
        var copyList = list.slice();
        var copyVisibility = visibility.slice(); // (1) apply splice to input lists and  (2) create filtered list

        var list1 = list.slice();
        tt.core.splice(list1, spliceArgs[0], spliceArgs[1], spliceArgs[2]);
        var visibility1 = visibility.slice();
        tt.core.splice(visibility1, spliceArgs[0], spliceArgs[1], spliceArgs[3]);
        var listFilter1 = new ListFilter({
          list: list1,
          visibility: visibility1
        }); // (1) create filtered list from input lists and (2) apply splice to filtered list

        var listFilter2 = new ListFilter({
          list: list,
          visibility: visibility
        });
        tt.core.splice(list, spliceArgs[0], spliceArgs[1], spliceArgs[2]);
        listFilter2.splice.apply(listFilter2, spliceArgs); // check lists

        ctx.assertEquals(listFilter1.list.length, listFilter2.list.length);

        for (var i = 0; i < listFilter1.list.length; ++i) {
          ctx.assertEquals(listFilter1.list[i], listFilter2.list[i]);
        } // check filtered lists


        ctx.assertEquals(listFilter1.filteredList.length, listFilter2.filteredList.length);

        for (i = 0; i < listFilter1.filteredList.length; ++i) {
          ctx.assertEquals(listFilter1.filteredList[i], listFilter2.filteredList[i]);
        } // check admin lists


        ctx.assertEquals(listFilter1.adminList.length, listFilter2.adminList.length);

        for (i = 0; i < listFilter1.adminList.length; ++i) {
          var admin1 = listFilter1.adminList[i];
          var admin2 = listFilter2.adminList[i];
          ctx.assertEquals(admin1.index, admin2.index);
          ctx.assertEquals(admin1.visibility, admin2.visibility);
        }
        /*console.log('--');
        console.log('list  :', str(copyList), str(copyVisibility));
        console.log('splice:', str(spliceArgs));
        console.log('result list        :', str(listFilter2.list));
        console.log('result adminList   :', str(listFilter2.adminList));
        console.log('result filteredList:', str(listFilter2.filteredList));*/

      };

      var createRndVisibility = function createRndVisibility(length) {
        var visibility = [];

        for (var j = 0; j < length; ++j) {
          if (rnd(0, 1) === 1) {
            visibility.push(true);
          } else {
            visibility.push(false);
          }
        }

        return visibility;
      };

      var createRndInsert = function createRndInsert() {
        var length = rnd(0, 4);
        var insert = ['A', 'B', 'C', 'D'].slice(0, length);
        return insert;
      };

      testList([1, 2, 3, 4], [true, true, true, true], [0, 1, ['A'], [true]]);
      testList([1, 2, 3, 4], [true, false, true, false], [0, 1, ['A'], [true]]);
      testList([1, 2, 3, 4], [true, true, true, true], [0, 0, ['A'], [true]]);
      testList([1, 2, 3, 4], [true, false, true, false], [0, 0, ['A'], [true]]);

      for (var i = 0; i < 10; ++i) {
        // list
        var list = [1, 2, 3, 4]; // random visibility

        var visibility = createRndVisibility(list.length); // random index

        var index = rnd(0, list.length); // random deletes

        var numDel = rnd(0, list.length - index); // random insertion list

        var insertList = createRndInsert();
        var insertVisibility = createRndVisibility(insertList.length); // test                    

        testList(list, visibility, [index, numDel, insertList, insertVisibility]);
      }
    }
  };
  return testCases;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Rlc3QvdGVzdExpc3RGaWx0ZXIuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwidHQiLCJMaXN0RmlsdGVyIiwidGVzdENhc2VzIiwibGlzdEZpbHRlcjEiLCJsYWJlbCIsImV4ZWN1dGUiLCJjdHgiLCJzdHIiLCJsaXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsInJuZCIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInRlc3RMaXN0IiwidmlzaWJpbGl0eSIsInNwbGljZUFyZ3MiLCJjb3B5TGlzdCIsInNsaWNlIiwiY29weVZpc2liaWxpdHkiLCJsaXN0MSIsImNvcmUiLCJzcGxpY2UiLCJ2aXNpYmlsaXR5MSIsImxpc3RGaWx0ZXIyIiwiYXBwbHkiLCJhc3NlcnRFcXVhbHMiLCJsZW5ndGgiLCJpIiwiZmlsdGVyZWRMaXN0IiwiYWRtaW5MaXN0IiwiYWRtaW4xIiwiYWRtaW4yIiwiaW5kZXgiLCJjcmVhdGVSbmRWaXNpYmlsaXR5IiwiaiIsInB1c2giLCJjcmVhdGVSbmRJbnNlcnQiLCJpbnNlcnQiLCJudW1EZWwiLCJpbnNlcnRMaXN0IiwiaW5zZXJ0VmlzaWJpbGl0eSJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsY0FBRCxFQUFpQiwyQkFBakIsQ0FBRCxFQUFnRCxVQUFVQyxFQUFWLEVBQWNDLFVBQWQsRUFBMEI7QUFFNUUsTUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBRUFBLEVBQUFBLFNBQVMsQ0FBQ0MsV0FBVixHQUF3QjtBQUNwQkMsSUFBQUEsS0FBSyxFQUFFLGVBRGE7QUFFcEJDLElBQUFBLE9BQU8sRUFDSCxpQkFBVUMsR0FBVixFQUFlO0FBRVgsVUFBSUMsR0FBRyxHQUFHLFNBQU5BLEdBQU0sQ0FBVUMsSUFBVixFQUFnQjtBQUN0QixlQUFPQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUYsSUFBZixDQUFQO0FBQ0gsT0FGRDs7QUFJQSxVQUFJRyxHQUFHLEdBQUcsU0FBTkEsR0FBTSxDQUFVQyxHQUFW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QXBCLENBQWYsRUFBMkMsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLENBQUMsR0FBRCxDQUFQLEVBQWMsQ0FBQyxJQUFELENBQWQsQ0FBM0MsQ0FBUjs7QUFFQSxXQUFLLElBQUljLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsRUFBcEIsRUFBd0IsRUFBRUEsQ0FBMUIsRUFBNkI7QUFFekI7QUFDQSxZQUFJdkIsSUFBSSxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixDQUFYLENBSHlCLENBS3pCOztBQUNBLFlBQUlVLFVBQVUsR0FBR21CLG1CQUFtQixDQUFDN0IsSUFBSSxDQUFDc0IsTUFBTixDQUFwQyxDQU55QixDQVF6Qjs7QUFDQSxZQUFJTSxLQUFLLEdBQUd6QixHQUFHLENBQUMsQ0FBRCxFQUFJSCxJQUFJLENBQUNzQixNQUFULENBQWYsQ0FUeUIsQ0FXekI7O0FBQ0EsWUFBSVksTUFBTSxHQUFHL0IsR0FBRyxDQUFDLENBQUQsRUFBSUgsSUFBSSxDQUFDc0IsTUFBTCxHQUFjTSxLQUFsQixDQUFoQixDQVp5QixDQWN6Qjs7QUFDQSxZQUFJTyxVQUFVLEdBQUdILGVBQWUsRUFBaEM7QUFDQSxZQUFJSSxnQkFBZ0IsR0FBR1AsbUJBQW1CLENBQUNNLFVBQVUsQ0FBQ2IsTUFBWixDQUExQyxDQWhCeUIsQ0FrQnpCOztBQUNBYixRQUFBQSxRQUFRLENBQUNULElBQUQsRUFBT1UsVUFBUCxFQUFtQixDQUFDa0IsS0FBRCxFQUFRTSxNQUFSLEVBQWdCQyxVQUFoQixFQUE0QkMsZ0JBQTVCLENBQW5CLENBQVI7QUFDSDtBQUNKO0FBekdlLEdBQXhCO0FBNEdBLFNBQU8xQyxTQUFQO0FBQ0gsQ0FqSEssQ0FBTiIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbJy4uL3NyYy9pbmRleCcsICcuLi9zcmMvdHQvbGlzdC9MaXN0RmlsdGVyJ10sIGZ1bmN0aW9uICh0dCwgTGlzdEZpbHRlcikge1xuXG4gICAgdmFyIHRlc3RDYXNlcyA9IHt9O1xuXG4gICAgdGVzdENhc2VzLmxpc3RGaWx0ZXIxID0ge1xuICAgICAgICBsYWJlbDogJ0xpc3QgRmlsdGVyIDEnLFxuICAgICAgICBleGVjdXRlOlxuICAgICAgICAgICAgZnVuY3Rpb24gKGN0eCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShsaXN0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcm5kID0gZnVuY3Rpb24gKG1pbiwgbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgdGVzdExpc3QgPSBmdW5jdGlvbiAobGlzdCwgdmlzaWJpbGl0eSwgc3BsaWNlQXJncykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3B5TGlzdCA9IGxpc3Quc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvcHlWaXNpYmlsaXR5ID0gdmlzaWJpbGl0eS5zbGljZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vICgxKSBhcHBseSBzcGxpY2UgdG8gaW5wdXQgbGlzdHMgYW5kICAoMikgY3JlYXRlIGZpbHRlcmVkIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3QxID0gbGlzdC5zbGljZSgpO1xuICAgICAgICAgICAgICAgICAgICB0dC5jb3JlLnNwbGljZShsaXN0MSwgc3BsaWNlQXJnc1swXSwgc3BsaWNlQXJnc1sxXSwgc3BsaWNlQXJnc1syXSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2aXNpYmlsaXR5MSA9IHZpc2liaWxpdHkuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdHQuY29yZS5zcGxpY2UodmlzaWJpbGl0eTEsIHNwbGljZUFyZ3NbMF0sIHNwbGljZUFyZ3NbMV0sIHNwbGljZUFyZ3NbM10pO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGlzdEZpbHRlcjEgPSBuZXcgTGlzdEZpbHRlcih7IGxpc3Q6IGxpc3QxLCB2aXNpYmlsaXR5OiB2aXNpYmlsaXR5MSB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyAoMSkgY3JlYXRlIGZpbHRlcmVkIGxpc3QgZnJvbSBpbnB1dCBsaXN0cyBhbmQgKDIpIGFwcGx5IHNwbGljZSB0byBmaWx0ZXJlZCBsaXN0XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaXN0RmlsdGVyMiA9IG5ldyBMaXN0RmlsdGVyKHsgbGlzdDogbGlzdCwgdmlzaWJpbGl0eTogdmlzaWJpbGl0eSB9KTtcbiAgICAgICAgICAgICAgICAgICAgdHQuY29yZS5zcGxpY2UobGlzdCwgc3BsaWNlQXJnc1swXSwgc3BsaWNlQXJnc1sxXSwgc3BsaWNlQXJnc1syXSk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RGaWx0ZXIyLnNwbGljZS5hcHBseShsaXN0RmlsdGVyMiwgc3BsaWNlQXJncyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2hlY2sgbGlzdHNcbiAgICAgICAgICAgICAgICAgICAgY3R4LmFzc2VydEVxdWFscyhsaXN0RmlsdGVyMS5saXN0Lmxlbmd0aCwgbGlzdEZpbHRlcjIubGlzdC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RGaWx0ZXIxLmxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHMobGlzdEZpbHRlcjEubGlzdFtpXSwgbGlzdEZpbHRlcjIubGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBmaWx0ZXJlZCBsaXN0c1xuICAgICAgICAgICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzKGxpc3RGaWx0ZXIxLmZpbHRlcmVkTGlzdC5sZW5ndGgsIGxpc3RGaWx0ZXIyLmZpbHRlcmVkTGlzdC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdEZpbHRlcjEuZmlsdGVyZWRMaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzKGxpc3RGaWx0ZXIxLmZpbHRlcmVkTGlzdFtpXSwgbGlzdEZpbHRlcjIuZmlsdGVyZWRMaXN0W2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFkbWluIGxpc3RzXG4gICAgICAgICAgICAgICAgICAgIGN0eC5hc3NlcnRFcXVhbHMobGlzdEZpbHRlcjEuYWRtaW5MaXN0Lmxlbmd0aCwgbGlzdEZpbHRlcjIuYWRtaW5MaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0RmlsdGVyMS5hZG1pbkxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhZG1pbjEgPSBsaXN0RmlsdGVyMS5hZG1pbkxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYWRtaW4yID0gbGlzdEZpbHRlcjIuYWRtaW5MaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmFzc2VydEVxdWFscyhhZG1pbjEuaW5kZXgsIGFkbWluMi5pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguYXNzZXJ0RXF1YWxzKGFkbWluMS52aXNpYmlsaXR5LCBhZG1pbjIudmlzaWJpbGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvKmNvbnNvbGUubG9nKCctLScpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbGlzdCAgOicsIHN0cihjb3B5TGlzdCksIHN0cihjb3B5VmlzaWJpbGl0eSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3BsaWNlOicsIHN0cihzcGxpY2VBcmdzKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQgbGlzdCAgICAgICAgOicsIHN0cihsaXN0RmlsdGVyMi5saXN0KSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN1bHQgYWRtaW5MaXN0ICAgOicsIHN0cihsaXN0RmlsdGVyMi5hZG1pbkxpc3QpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Jlc3VsdCBmaWx0ZXJlZExpc3Q6Jywgc3RyKGxpc3RGaWx0ZXIyLmZpbHRlcmVkTGlzdCkpOyovXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY3JlYXRlUm5kVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpc2liaWxpdHkgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJuZCgwLCAxKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkucHVzaCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eS5wdXNoKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmlzaWJpbGl0eTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY3JlYXRlUm5kSW5zZXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gcm5kKDAsIDQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0ID0gWydBJywgJ0InLCAnQycsICdEJ10uc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluc2VydDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0ZXN0TGlzdChbMSwgMiwgMywgNF0sIFt0cnVlLCB0cnVlLCB0cnVlLCB0cnVlXSwgWzAsIDEsIFsnQSddLCBbdHJ1ZV1dKTtcbiAgICAgICAgICAgICAgICB0ZXN0TGlzdChbMSwgMiwgMywgNF0sIFt0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2VdLCBbMCwgMSwgWydBJ10sIFt0cnVlXV0pO1xuXG4gICAgICAgICAgICAgICAgdGVzdExpc3QoWzEsIDIsIDMsIDRdLCBbdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZV0sIFswLCAwLCBbJ0EnXSwgW3RydWVdXSk7XG4gICAgICAgICAgICAgICAgdGVzdExpc3QoWzEsIDIsIDMsIDRdLCBbdHJ1ZSwgZmFsc2UsIHRydWUsIGZhbHNlXSwgWzAsIDAsIFsnQSddLCBbdHJ1ZV1dKTtcblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTA7ICsraSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxpc3RcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBbMSwgMiwgMywgNF07XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZG9tIHZpc2liaWxpdHlcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZpc2liaWxpdHkgPSBjcmVhdGVSbmRWaXNpYmlsaXR5KGxpc3QubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByYW5kb20gaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcm5kKDAsIGxpc3QubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByYW5kb20gZGVsZXRlc1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtRGVsID0gcm5kKDAsIGxpc3QubGVuZ3RoIC0gaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhbmRvbSBpbnNlcnRpb24gbGlzdFxuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0TGlzdCA9IGNyZWF0ZVJuZEluc2VydCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0VmlzaWJpbGl0eSA9IGNyZWF0ZVJuZFZpc2liaWxpdHkoaW5zZXJ0TGlzdC5sZW5ndGgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlc3QgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0ZXN0TGlzdChsaXN0LCB2aXNpYmlsaXR5LCBbaW5kZXgsIG51bURlbCwgaW5zZXJ0TGlzdCwgaW5zZXJ0VmlzaWJpbGl0eV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRlc3RDYXNlcztcbn0pO1xuXG5cblxuXG4iXX0=