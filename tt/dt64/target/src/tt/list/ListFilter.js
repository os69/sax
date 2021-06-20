"use strict";

define(['../../core/core'], function (core) {
  // a true    0
  // b false   1
  // c false   1
  // d true    1
  var ListFilter = function ListFilter() {
    this.init.apply(this, arguments);
  };

  ListFilter.prototype = {
    init: function init(params) {
      this.list = params.list;
      this.filteredList = params.filteredList || [];
      this.adminList = [];
      var index = 0;

      for (var i = 0; i < params.visibility.length; ++i) {
        var element = this.list[i];
        var visibilityElement = params.visibility[i];
        this.adminList.push({
          index: index,
          visibility: visibilityElement
        });

        if (visibilityElement) {
          this.filteredList.push(element);
          index += 1;
        }
      }
    },
    setVisibility: function setVisibility(index, visibility) {
      var admin = this.adminList[index];

      if (admin.visibility === visibility) {
        return;
      }

      if (visibility) {
        admin.visibility = true;
        this.filteredList.splice(admin.index, 0, this.list[index]);

        for (var i = index + 1; i < this.adminList.length; ++i) {
          admin = this.adminList[i];
          admin.index += 1;
        }
      } else {
        admin.visibility = false;
        this.filteredList.splice(admin.index, 1);

        for (var i = index + 1; i < this.adminList.length; ++i) {
          admin = this.adminList[i];
          admin.index -= 1;
        }
      }
    },
    getFilteredList: function getFilteredList() {
      return this.filteredList;
    },
    splice: function splice(index, numDel, insertElements, insertElementsVisibility) {
      var i, admin; // fill defaults insertElements

      if (!insertElements) {
        insertElements = [];
      } // fill defaults for insertElementsVisibility


      if (!insertElementsVisibility) {
        insertElementsVisibility = [];

        for (i = 0; i < insertElements.length; ++i) {
          insertElementsVisibility.push(true);
        }
      } // calculate 
      // - numDelFiltered  : number of elements for deletion into filtered list
      // - indexDelFiltered: index for deletion in filtered list


      var numDelFiltered = 0;
      var indexDelFiltered;

      for (var i = 0; i < numDel; ++i) {
        admin = this.adminList[index + i];

        if (admin.visibility) {
          numDelFiltered += 1;

          if (indexDelFiltered === undefined) {
            indexDelFiltered = admin.index;
          }
        }
      } // calculate 
      // - numInsFiltered    : number of elements for insertion into filtered list
      // - insFiltered       : insertion elements into filtered list
      // - indexInsFiltered  : insertion index into filtered list
      // - insAdmin          : insertion elements into admin list


      var insFiltered = [];
      var numInsFiltered = 0;
      var indexInsFiltered = 0;
      var insAdmin = [];
      var insertIndex = 0;

      if (this.adminList.length > 0) {
        if (index < this.adminList.length) {
          admin = this.adminList[index];
          insertIndex = admin.index;
        } else {
          admin = this.adminList[this.adminList.length - 1];
          insertIndex = admin.visibility ? admin.index + 1 : admin.index;
        }
      }

      indexInsFiltered = insertIndex;

      for (i = 0; i < insertElements.length; ++i) {
        var element = insertElements[i];
        var visibility = insertElementsVisibility[i];
        insAdmin.push({
          index: insertIndex,
          visibility: visibility
        });

        if (visibility) {
          insertIndex += 1;
          numInsFiltered += 1;
          insFiltered.push(element);
        }
      } // update filtered list


      if (indexDelFiltered !== undefined && indexInsFiltered !== indexDelFiltered) {
        throw 'programm error';
      }

      core.splice(this.filteredList, indexInsFiltered, numDelFiltered, insFiltered); // update admin list

      core.splice(this.adminList, index, numDel, insAdmin);

      for (i = index + insertElements.length; i < this.adminList.length; ++i) {
        admin = this.adminList[i];
        admin.index += numInsFiltered - numDelFiltered;
      } // update real list
      //core.splice(this.list, index, numDel, insertElements);

    }
  };
  return ListFilter;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90dC9saXN0L0xpc3RGaWx0ZXIuanMiXSwibmFtZXMiOlsiZGVmaW5lIiwiY29yZSIsIkxpc3RGaWx0ZXIiLCJpbml0IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJwcm90b3R5cGUiLCJwYXJhbXMiLCJsaXN0IiwiZmlsdGVyZWRMaXN0IiwiYWRtaW5MaXN0IiwiaW5kZXgiLCJpIiwidmlzaWJpbGl0eSIsImxlbmd0aCIsImVsZW1lbnQiLCJ2aXNpYmlsaXR5RWxlbWVudCIsInB1c2giLCJzZXRWaXNpYmlsaXR5IiwiYWRtaW4iLCJzcGxpY2UiLCJnZXRGaWx0ZXJlZExpc3QiLCJudW1EZWwiLCJpbnNlcnRFbGVtZW50cyIsImluc2VydEVsZW1lbnRzVmlzaWJpbGl0eSIsIm51bURlbEZpbHRlcmVkIiwiaW5kZXhEZWxGaWx0ZXJlZCIsInVuZGVmaW5lZCIsImluc0ZpbHRlcmVkIiwibnVtSW5zRmlsdGVyZWQiLCJpbmRleEluc0ZpbHRlcmVkIiwiaW5zQWRtaW4iLCJpbnNlcnRJbmRleCJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsTUFBTSxDQUFDLENBQUMsaUJBQUQsQ0FBRCxFQUFzQixVQUFVQyxJQUFWLEVBQWdCO0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBRUEsTUFBSUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBWTtBQUN6QixTQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0JDLFNBQXRCO0FBQ0gsR0FGRDs7QUFJQUgsRUFBQUEsVUFBVSxDQUFDSSxTQUFYLEdBQXVCO0FBRW5CSCxJQUFBQSxJQUFJLEVBQUUsY0FBVUksTUFBVixFQUFrQjtBQUNwQixXQUFLQyxJQUFMLEdBQVlELE1BQU0sQ0FBQ0MsSUFBbkI7QUFDQSxXQUFLQyxZQUFMLEdBQW9CRixNQUFNLENBQUNFLFlBQVAsSUFBdUIsRUFBM0M7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsVUFBSUMsS0FBSyxHQUFHLENBQVo7O0FBQ0Es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LElBQWVrQixjQUFjLEdBQUdKLGNBQWhDO0FBQ0gsT0E1RXNFLENBOEV2RTtBQUNBOztBQUVIO0FBN0hrQixHQUF2QjtBQWdJQSxTQUFPdkIsVUFBUDtBQUNILENBNUlLLENBQU4iLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoWycuLi8uLi9jb3JlL2NvcmUnXSwgZnVuY3Rpb24gKGNvcmUpIHtcblxuICAgIC8vIGEgdHJ1ZSAgICAwXG4gICAgLy8gYiBmYWxzZSAgIDFcbiAgICAvLyBjIGZhbHNlICAgMVxuICAgIC8vIGQgdHJ1ZSAgICAxXG5cbiAgICB2YXIgTGlzdEZpbHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgTGlzdEZpbHRlci5wcm90b3R5cGUgPSB7XG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdGhpcy5saXN0ID0gcGFyYW1zLmxpc3Q7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdCA9IHBhcmFtcy5maWx0ZXJlZExpc3QgfHwgW107XG4gICAgICAgICAgICB0aGlzLmFkbWluTGlzdCA9IFtdO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLnZpc2liaWxpdHkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXMubGlzdFtpXTtcbiAgICAgICAgICAgICAgICB2YXIgdmlzaWJpbGl0eUVsZW1lbnQgPSBwYXJhbXMudmlzaWJpbGl0eVtpXTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkbWluTGlzdC5wdXNoKHsgaW5kZXg6IGluZGV4LCB2aXNpYmlsaXR5OiB2aXNpYmlsaXR5RWxlbWVudCB9KTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZExpc3QucHVzaChlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0VmlzaWJpbGl0eTogZnVuY3Rpb24gKGluZGV4LCB2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICB2YXIgYWRtaW4gPSB0aGlzLmFkbWluTGlzdFtpbmRleF07XG4gICAgICAgICAgICBpZiAoYWRtaW4udmlzaWJpbGl0eSA9PT0gdmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgYWRtaW4udmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZExpc3Quc3BsaWNlKGFkbWluLmluZGV4LCAwLCB0aGlzLmxpc3RbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gaW5kZXggKyAxOyBpIDwgdGhpcy5hZG1pbkxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRtaW4gPSB0aGlzLmFkbWluTGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYWRtaW4uaW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFkbWluLnZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkTGlzdC5zcGxpY2UoYWRtaW4uaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCArIDE7IGkgPCB0aGlzLmFkbWluTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBhZG1pbiA9IHRoaXMuYWRtaW5MaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBhZG1pbi5pbmRleCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBnZXRGaWx0ZXJlZExpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkTGlzdDtcbiAgICAgICAgfSxcblxuICAgICAgICBzcGxpY2U6IGZ1bmN0aW9uIChpbmRleCwgbnVtRGVsLCBpbnNlcnRFbGVtZW50cywgaW5zZXJ0RWxlbWVudHNWaXNpYmlsaXR5KSB7XG5cbiAgICAgICAgICAgIHZhciBpLCBhZG1pbjtcblxuICAgICAgICAgICAgLy8gZmlsbCBkZWZhdWx0cyBpbnNlcnRFbGVtZW50c1xuICAgICAgICAgICAgaWYgKCFpbnNlcnRFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGluc2VydEVsZW1lbnRzID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGZpbGwgZGVmYXVsdHMgZm9yIGluc2VydEVsZW1lbnRzVmlzaWJpbGl0eVxuICAgICAgICAgICAgaWYgKCFpbnNlcnRFbGVtZW50c1Zpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRFbGVtZW50c1Zpc2liaWxpdHkgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5zZXJ0RWxlbWVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0RWxlbWVudHNWaXNpYmlsaXR5LnB1c2godHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgXG4gICAgICAgICAgICAvLyAtIG51bURlbEZpbHRlcmVkICA6IG51bWJlciBvZiBlbGVtZW50cyBmb3IgZGVsZXRpb24gaW50byBmaWx0ZXJlZCBsaXN0XG4gICAgICAgICAgICAvLyAtIGluZGV4RGVsRmlsdGVyZWQ6IGluZGV4IGZvciBkZWxldGlvbiBpbiBmaWx0ZXJlZCBsaXN0XG4gICAgICAgICAgICB2YXIgbnVtRGVsRmlsdGVyZWQgPSAwXG4gICAgICAgICAgICB2YXIgaW5kZXhEZWxGaWx0ZXJlZDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtRGVsOyArK2kpIHtcbiAgICAgICAgICAgICAgICBhZG1pbiA9IHRoaXMuYWRtaW5MaXN0W2luZGV4ICsgaV07XG4gICAgICAgICAgICAgICAgaWYgKGFkbWluLnZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtRGVsRmlsdGVyZWQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4RGVsRmlsdGVyZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhEZWxGaWx0ZXJlZCA9IGFkbWluLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxjdWxhdGUgXG4gICAgICAgICAgICAvLyAtIG51bUluc0ZpbHRlcmVkICAgIDogbnVtYmVyIG9mIGVsZW1lbnRzIGZvciBpbnNlcnRpb24gaW50byBmaWx0ZXJlZCBsaXN0XG4gICAgICAgICAgICAvLyAtIGluc0ZpbHRlcmVkICAgICAgIDogaW5zZXJ0aW9uIGVsZW1lbnRzIGludG8gZmlsdGVyZWQgbGlzdFxuICAgICAgICAgICAgLy8gLSBpbmRleEluc0ZpbHRlcmVkICA6IGluc2VydGlvbiBpbmRleCBpbnRvIGZpbHRlcmVkIGxpc3RcbiAgICAgICAgICAgIC8vIC0gaW5zQWRtaW4gICAgICAgICAgOiBpbnNlcnRpb24gZWxlbWVudHMgaW50byBhZG1pbiBsaXN0XG4gICAgICAgICAgICB2YXIgaW5zRmlsdGVyZWQgPSBbXTtcbiAgICAgICAgICAgIHZhciBudW1JbnNGaWx0ZXJlZCA9IDA7XG4gICAgICAgICAgICB2YXIgaW5kZXhJbnNGaWx0ZXJlZCA9IDA7XG4gICAgICAgICAgICB2YXIgaW5zQWRtaW4gPSBbXTtcblxuICAgICAgICAgICAgdmFyIGluc2VydEluZGV4ID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmFkbWluTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgdGhpcy5hZG1pbkxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkbWluID0gdGhpcy5hZG1pbkxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbmRleCA9IGFkbWluLmluZGV4O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFkbWluID0gdGhpcy5hZG1pbkxpc3RbdGhpcy5hZG1pbkxpc3QubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIGluc2VydEluZGV4ID0gYWRtaW4udmlzaWJpbGl0eSA/IGFkbWluLmluZGV4ICsgMSA6IGFkbWluLmluZGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4SW5zRmlsdGVyZWQgPSBpbnNlcnRJbmRleDtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluc2VydEVsZW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBpbnNlcnRFbGVtZW50c1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgdmlzaWJpbGl0eSA9IGluc2VydEVsZW1lbnRzVmlzaWJpbGl0eVtpXTtcbiAgICAgICAgICAgICAgICBpbnNBZG1pbi5wdXNoKHsgaW5kZXg6IGluc2VydEluZGV4LCB2aXNpYmlsaXR5OiB2aXNpYmlsaXR5IH0pO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIG51bUluc0ZpbHRlcmVkICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIGluc0ZpbHRlcmVkLnB1c2goZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZmlsdGVyZWQgbGlzdFxuICAgICAgICAgICAgaWYgKGluZGV4RGVsRmlsdGVyZWQgIT09IHVuZGVmaW5lZCAmJiBpbmRleEluc0ZpbHRlcmVkICE9PSBpbmRleERlbEZpbHRlcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ3Byb2dyYW1tIGVycm9yJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvcmUuc3BsaWNlKHRoaXMuZmlsdGVyZWRMaXN0LCBpbmRleEluc0ZpbHRlcmVkLCBudW1EZWxGaWx0ZXJlZCwgaW5zRmlsdGVyZWQpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgYWRtaW4gbGlzdFxuICAgICAgICAgICAgY29yZS5zcGxpY2UodGhpcy5hZG1pbkxpc3QsIGluZGV4LCBudW1EZWwsIGluc0FkbWluKTtcbiAgICAgICAgICAgIGZvciAoaSA9IGluZGV4ICsgaW5zZXJ0RWxlbWVudHMubGVuZ3RoOyBpIDwgdGhpcy5hZG1pbkxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBhZG1pbiA9IHRoaXMuYWRtaW5MaXN0W2ldO1xuICAgICAgICAgICAgICAgIGFkbWluLmluZGV4ICs9IG51bUluc0ZpbHRlcmVkIC0gbnVtRGVsRmlsdGVyZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSByZWFsIGxpc3RcbiAgICAgICAgICAgIC8vY29yZS5zcGxpY2UodGhpcy5saXN0LCBpbmRleCwgbnVtRGVsLCBpbnNlcnRFbGVtZW50cyk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBMaXN0RmlsdGVyO1xufSk7XG4iXX0=