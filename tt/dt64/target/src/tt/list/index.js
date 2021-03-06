"use strict";

define(['../../core/core', '../../core/event', './MappedListManager', './FilteredListManager', './initList'], function (core, event, MappedListManager, FilteredListManager, initList) {
  var module = {};
  module.initList = initList.initList;

  module.createMappedList = function (list, map) {
    module.initList(list);
    var mappedList = [];
    module.initList(mappedList);
    event.getEventData(mappedList).mappedListManager = new MappedListManager({
      list: list,
      map: map,
      targetList: mappedList
    });
    return mappedList;
  };

  module.createFilteredList = function (list, filter) {
    module.initList(list);
    var filteredList = [];
    module.initList(filteredList);
    event.getEventData(filteredList).filteredListManager = new FilteredListManager({
      list: list,
      filter: filter,
      targetList: filteredList
    });
    return filteredList;
  };

  var ListObserver = core.defineClass({
    init: function init(params) {
      event.addEventHandler(params.list, 'splice', this, this.changed);
      event.addEventHandler(params.list, 'push', this, this.changed);
    },
    changed: function changed() {// console.log(arguments);
    },
    delete: function _delete() {
      event.delete(this);
    }
  });

  module.createListObserver = function (list) {
    return new ListObserver({
      list: list
    });
  };

  return module;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90dC9saXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmluZSIsImNvcmUiLCJldmVudCIsIk1hcHBlZExpc3RNYW5hZ2VyIiwiRmlsdGVyZWRMaXN0TWFuYWdlciIsImluaXRMaXN0IiwibW9kdWxlIiwiY3JlYXRlTWFwcGVkTGlzdCIsImxpc3QiLCJtYXAiLCJtYXBwZWRMaXN0IiwiZ2V0RXZlbnREYXRhIiwibWFwcGVkTGlzdE1hbmFnZXIiLCJ0YXJnZXRMaXN0IiwiY3JlYXRlRmlsdGVyZWRMaXN0IiwiZmlsdGVyIiwiZmlsdGVyZWRMaXN0IiwiZmlsdGVyZWRMaXN0TWFuYWdlciIsIkxpc3RPYnNlcnZlciIsImRlZmluZUNsYXNzIiwiaW5pdCIsInBhcmFtcyIsImFkZEV2ZW50SGFuZGxlciIsImNoYW5nZWQiLCJkZWxldGUiLCJjcmVhdGVMaXN0T2JzZXJ2ZXIiXSwibWFwcGluZ3MiOiI7O0FBQUFBLE1BQU0sQ0FBQyxDQUFDLGlCQUFELEVBQW9CLGtCQUFwQixFQUF3QyxxQkFBeEMsRUFBK0QsdUJBQS9ELEVBQXdGLFlBQXhGLENBQUQsRUFBd0csVUFBVUMsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUJDLGlCQUF2QixFQUEwQ0MsbUJBQTFDLEVBQStEQyxRQUEvRCxFQUF5RTtBQUVuTCxNQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUVBQSxFQUFBQSxNQUFNLENBQUNELFFBQVAsR0FBa0JBLFFBQVEsQ0FBQ0EsUUFBM0I7O0FBRUFDLEVBQUFBLE1BQU0sQ0FBQ0MsZ0JBQVAsR0FBMEIsVUFBVUMsSUFBVixFQUFnQkMsR0FBaEIsRUFBcUI7QUFDM0NILElBQUFBLE1BQU0sQ0FBQ0QsUUFBUCxDQUFnQkcsSUFBaEI7QUFDQSxRQUFJRSxVQUFVLEdBQUcsRUFBakI7QUFDQUosSUFBQUEsTUFBTSxDQUFDRCxRQUFQLENBQWdCSyxVQUFoQjtBQUNBUixJQUFBQSxLQUFLLENBQUNTLFlBQU4sQ0FBbUJELFVBQW5CLEVBQStCRSxpQkFBL0IsR0FBbUQsSUFBSVQsaUJBQUosQ0FBc0I7QUFDckVLLE1BQUFBLElBQUksRUFBRUEsSUFEK0Q7QUFFckVDLE1BQUFBLEdBQUcsRUFBRUEsR0FGZ0U7QUFHckVJLE1BQUFBLFVBQVUsRUFBRUg7QUFIeUQsS0FBdEIsQ0FBbkQ7QUFLQSxXQUFPQSxVQUFQO0FBQ0gsR0FWRDs7QUFZQUosRUFBQUEsTUFBTSxDQUFDUSxrQkFBUCxHQUE0QixVQUFVTixJQUFWLEVBQWdCTyxNQUFoQixFQUF3QjtBQUNoRFQsSUFBQUEsTUFBTSxDQUFDRCxRQUFQLENBQWdCRyxJQUFoQjtBQUNBLFFBQUlRLFlBQVksR0FBRyxFQUFuQjtBQUNBVixJQUFBQSxNQUFNLENBQUNELFFBQVAsQ0FBZ0JXLFlBQWhCO0FBQ0FkLElBQUFBLEtBQUssQ0FBQ1MsWUFBTixDQUFtQkssWUFBbkIsRUFBaUNDLG1CQUFqQyxHQUF1RCxJQUFJYixtQkFBSixDQUF3QjtBQUMzRUksTUFBQUEsSUFBSSxFQUFFQSxJQURxRTtBQUUzRU8sTUFBQUEsTUFBTSxFQUFFQSxNQUZtRTtBQUczRUYsTUFBQUEsVUFBVSxFQUFFRztBQUgrRCxLQUF4QixDQUF2RDtBQUtBLFdBQU9BLFlBQVA7QUFDSCxHQVZEOztBQVlBLE1BQUlFLFlBQVksR0FBR2pCLElBQUksQ0FBQ2tCLFdBQUwsQ0FBaUI7QUFDaENDLElBQUFBLElBQUksRUFBRSxjQUFVQyxNQUFWLEVBQWtCO0FBQ3BCbkIsTUFBQUEsS0FBSyxDQUFDb0IsZUFBTixDQUFzQkQsTUFBTSxDQUFDYixJQUE3QixFQUFtQyxRQUFuQyxFQUE2QyxJQUE3QyxFQUFtRCxLQUFLZSxPQUF4RDtBQUNBckIsTUFBQUEsS0FBSyxDQUFDb0IsZUFBTixDQUFzQkQsTUFBTSxDQUFDYixJQUE3QixFQUFtQyxNQUFuQyxFQUEyQyxJQUEzQyxFQUFpRCxLQUFLZSxPQUF0RDtBQUNILEtBSitCO0FBS2hDQSxJQUFBQSxPQUFPLEVBQUUsbUJBQVksQ0FDbEI7QUFDRixLQVArQjtBQVFoQ0MsSUFBQUEsTUFBTSxFQUFFLG1CQUFZO0FBQ2hCdEIsTUFBQUEsS0FBSyxDQUFDc0IsTUFBTixDQUFhLElBQWI7QUFDSDtBQVYrQixHQUFqQixDQUFuQjs7QUFhQWxCLEVBQUFBLE1BQU0sQ0FBQ21CLGtCQUFQLEdBQTRCLFVBQVVqQixJQUFWLEVBQWdCO0FBQ3hDLFdBQU8sSUFBSVUsWUFBSixDQUFpQjtBQUFFVixNQUFBQSxJQUFJLEVBQUVBO0FBQVIsS0FBakIsQ0FBUDtBQUNILEdBRkQ7O0FBSUEsU0FBT0YsTUFBUDtBQUVILENBakRLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi9jb3JlL2NvcmUnLCAnLi4vLi4vY29yZS9ldmVudCcsICcuL01hcHBlZExpc3RNYW5hZ2VyJywgJy4vRmlsdGVyZWRMaXN0TWFuYWdlcicsICcuL2luaXRMaXN0J10sIGZ1bmN0aW9uIChjb3JlLCBldmVudCwgTWFwcGVkTGlzdE1hbmFnZXIsIEZpbHRlcmVkTGlzdE1hbmFnZXIsIGluaXRMaXN0KSB7XG5cbiAgICB2YXIgbW9kdWxlID0ge307XG5cbiAgICBtb2R1bGUuaW5pdExpc3QgPSBpbml0TGlzdC5pbml0TGlzdDtcblxuICAgIG1vZHVsZS5jcmVhdGVNYXBwZWRMaXN0ID0gZnVuY3Rpb24gKGxpc3QsIG1hcCkge1xuICAgICAgICBtb2R1bGUuaW5pdExpc3QobGlzdCk7XG4gICAgICAgIHZhciBtYXBwZWRMaXN0ID0gW107XG4gICAgICAgIG1vZHVsZS5pbml0TGlzdChtYXBwZWRMaXN0KTtcbiAgICAgICAgZXZlbnQuZ2V0RXZlbnREYXRhKG1hcHBlZExpc3QpLm1hcHBlZExpc3RNYW5hZ2VyID0gbmV3IE1hcHBlZExpc3RNYW5hZ2VyKHtcbiAgICAgICAgICAgIGxpc3Q6IGxpc3QsXG4gICAgICAgICAgICBtYXA6IG1hcCxcbiAgICAgICAgICAgIHRhcmdldExpc3Q6IG1hcHBlZExpc3RcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtYXBwZWRMaXN0O1xuICAgIH07XG5cbiAgICBtb2R1bGUuY3JlYXRlRmlsdGVyZWRMaXN0ID0gZnVuY3Rpb24gKGxpc3QsIGZpbHRlcikge1xuICAgICAgICBtb2R1bGUuaW5pdExpc3QobGlzdCk7XG4gICAgICAgIHZhciBmaWx0ZXJlZExpc3QgPSBbXTtcbiAgICAgICAgbW9kdWxlLmluaXRMaXN0KGZpbHRlcmVkTGlzdCk7XG4gICAgICAgIGV2ZW50LmdldEV2ZW50RGF0YShmaWx0ZXJlZExpc3QpLmZpbHRlcmVkTGlzdE1hbmFnZXIgPSBuZXcgRmlsdGVyZWRMaXN0TWFuYWdlcih7XG4gICAgICAgICAgICBsaXN0OiBsaXN0LFxuICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgICAgICB0YXJnZXRMaXN0OiBmaWx0ZXJlZExpc3RcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmaWx0ZXJlZExpc3Q7XG4gICAgfTtcblxuICAgIHZhciBMaXN0T2JzZXJ2ZXIgPSBjb3JlLmRlZmluZUNsYXNzKHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgZXZlbnQuYWRkRXZlbnRIYW5kbGVyKHBhcmFtcy5saXN0LCAnc3BsaWNlJywgdGhpcywgdGhpcy5jaGFuZ2VkKTtcbiAgICAgICAgICAgIGV2ZW50LmFkZEV2ZW50SGFuZGxlcihwYXJhbXMubGlzdCwgJ3B1c2gnLCB0aGlzLCB0aGlzLmNoYW5nZWQpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXZlbnQuZGVsZXRlKHRoaXMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBtb2R1bGUuY3JlYXRlTGlzdE9ic2VydmVyID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0T2JzZXJ2ZXIoeyBsaXN0OiBsaXN0IH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtb2R1bGU7XG5cbn0pO1xuIl19