var propertyCollectors = [];

export function PropertyCollector() {
    this.init.apply(this, arguments);
};

PropertyCollector.prototype = {
    init: function (params) {
        this.addCallback = params.addCallback;
        this.properties = [];
    },
    addProperty: function (property) {
        for (var i = 0; i < this.properties.length; ++i) {
            var checkProperty = this.properties[i];
            if (checkProperty.obj === property.obj && checkProperty.propertyName === property.propertyName) {
                return;
            }
        }
        if (this.addCallback) {
            this.addCallback(property);
        }
        this.properties.push(property);
    },
    getProperties: function () {
        return this.properties;
    },
    stop: function () {
        if (propertyCollectors.length === 0) {
            throw 'program error';
        }
        if (propertyCollectors[propertyCollectors.length - 1] !== this) {
            throw 'program error';
        }
        propertyCollectors.pop();
        return this.getProperties();
    }
};

var notify = true;

PropertyCollector.stopNotify = function () {
    notify = false;
}

PropertyCollector.startNotify = function () {
    notify = true;
}

PropertyCollector.notify = function (property) {
    if (!notify) {
        return;
    }
    if (propertyCollectors.length === 0) {
        return;
    }
    var propertyCollector = propertyCollectors[propertyCollectors.length - 1];
    propertyCollector.addProperty(property);
};

PropertyCollector.create = function (params) {
    var propertyCollector = new PropertyCollector(params);
    propertyCollectors.push(propertyCollector);
    return propertyCollector;
};



