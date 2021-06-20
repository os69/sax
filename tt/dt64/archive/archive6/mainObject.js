define(['../../core/event'], function (event) {

    var module = {

        deleteObject: function (obj) {
            var eventData = event._getEventData(obj);
            if (eventData.properties) {
                for (var propertyName in eventData.properties) {
                    var property = eventData.properties[propertyName];
                    event.delete(property);
                }
            }
            event.delete(obj);
        },

        createDict: function () {
            return {
                __dict: true
            };
        }

    };

    return module;

});