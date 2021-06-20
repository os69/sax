define(['../../../src/index', './Movement', './MovementBasic'], function (tt, Movement, MovementBasic) {

    var MovementCollection = tt.core.defineDerivedClass(Movement, {

        init: function (params) {
            Movement.prototype.init.apply(this, arguments);
            this.movements = params.movements || [];
        },

        createMovementBasic: function (params) {
            params.parent = this;
            var basicMovement = new MovementBasic(params);
            this.movements.push(basicMovement);
            return basicMovement;
        },

        createMovementCollection: function (params) {
            params.parent = this;
            var movementCollection = new MovementCollection(params);
            this.movements.push(movementCollection);
            return movementCollection;
        }

    });

    return MovementCollection;

});