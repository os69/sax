export function DummyListFilter() {
    this.init.apply(this, arguments);
}

DummyListFilter.prototype = {
    init: function () {
        this.visibility = []
    },
    setVisibility: function (index, visibility) {
        this.visibility[index] = visibility;
    }
}


