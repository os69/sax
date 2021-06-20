(function () {




    // =======================================================================
    // admin data
    // =======================================================================

  
        var getAdminData = function (obj) {
            var adminData = obj.__event__;
            if (adminData) {
                return adminData;
            }
            adminData = new AdminData(obj);
            obj.__event__ = adminData;
            return adminData;
        }

    // =======================================================================
    // public interface
    // =======================================================================

    var module = {

            registerEventHandler: function (sender, signal, receiver, handler) {
                getAdminData(sender).registerEventReceiver(sender, signal, receiver, handler);
                getAdminData(receiver).registerEventSender(sender, signal, receiver, handler);
            },

            unRegisterEventHandler: function (sender, signal, receiver, handler) {
                getAdminData(sender).unRegisterEventReceiver(sender, signal, receiver, handler);
                getAdminData(receiver).unRegisterEventSender(sender, signal, receiver, handler);

            },

            raiseEvent: function (sender, signal, message) {
                getAdminData(sender).raiseEvent(sender, signal, message);
            },

            delete: function (obj) {
                getAdminData(obj).delete(obj);
            }

        };


        var obj1 = {
            name: '1'
        }

    var obj2 = {
            name: '2',
            slot: function () {
                console.log('signal');
            }
        }

    module.registerEventHandler(obj1, 'hello', obj2, obj2.slot)

    module.delete(obj2);

        return module;

    }) ();