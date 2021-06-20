
export function ObjectManager() {
    this.init.apply(this, arguments);
}

ObjectManager.prototype = {
    init: function () {
        this.objMap = {}
    },
    getObject: function (id) {
        return this.objMap[id];
    },
    registerObject: function (id, obj) {
        this.objMap[id] = obj;
    },
    deleteObject: function (id) {
        delete this.objMap[id];
    }
}

