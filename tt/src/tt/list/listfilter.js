import { core } from "../../core/core";

// a true    0
// b false   1
// c false   1
// d true    1

export var ListFilter = function () {
    this.init.apply(this, arguments);
}

ListFilter.prototype = {

    init: function (params) {
        this.list = params.list;
        this.filteredList = params.filteredList || [];
        this.adminList = [];
        var index = 0;
        for (var i = 0; i < params.visibility.length; ++i) {
            var element = this.list[i];
            var visibilityElement = params.visibility[i];
            this.adminList.push({ index: index, visibility: visibilityElement });
            if (visibilityElement) {
                this.filteredList.push(element);
                index += 1;
            }
        }
    },

    setVisibility: function (index, visibility) {
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

    getFilteredList: function () {
        return this.filteredList;
    },

    splice: function (index, numDel, insertElements, insertElementsVisibility) {

        var i, admin;

        // fill defaults insertElements
        if (!insertElements) {
            insertElements = [];
        }

        // fill defaults for insertElementsVisibility
        if (!insertElementsVisibility) {
            insertElementsVisibility = [];
            for (i = 0; i < insertElements.length; ++i) {
                insertElementsVisibility.push(true);
            }
        }

        // calculate 
        // - numDelFiltered  : number of elements for deletion into filtered list
        // - indexDelFiltered: index for deletion in filtered list
        var numDelFiltered = 0
        var indexDelFiltered;
        for (var i = 0; i < numDel; ++i) {
            admin = this.adminList[index + i];
            if (admin.visibility) {
                numDelFiltered += 1;
                if (indexDelFiltered === undefined) {
                    indexDelFiltered = admin.index;
                }
            }
        }

        // calculate 
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
            insAdmin.push({ index: insertIndex, visibility: visibility });
            if (visibility) {
                insertIndex += 1;
                numInsFiltered += 1;
                insFiltered.push(element);
            }
        }

        // update filtered list
        if (indexDelFiltered !== undefined && indexInsFiltered !== indexDelFiltered) {
            throw 'programm error';
        }
        core.splice(this.filteredList, indexInsFiltered, numDelFiltered, insFiltered);

        // update admin list
        core.splice(this.adminList, index, numDel, insAdmin);
        for (i = index + insertElements.length; i < this.adminList.length; ++i) {
            admin = this.adminList[i];
            admin.index += numInsFiltered - numDelFiltered;
        }

        // update real list
        //core.splice(this.list, index, numDel, insertElements);

    }
}

