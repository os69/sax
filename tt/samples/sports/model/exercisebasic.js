import { tt } from '../../../src/tt/tt';
import { Exercise } from './exercise';

export var ExerciseBasic = Exercise.derive({

    initProps: function (params) {
        Exercise.prototype.initProps.apply(this, arguments);
        this.movements = params.movements || [];
        this.helpUrl = params.helpUrl;
    },

    initTt: function () {
        Exercise.prototype.initTt.apply(this, arguments);
        tt.initProperty(this, 'movements');
        tt.initProperty(this, 'helpUrl');
    },

    addMovement: function (movement) {
        if (tt.core.hasObject(this.movements, movement)) {
            return;
        }
        this.movements.push(movement);
        movement.incUsageCounter();
    },

    removeMovement: function (movement) {
        if (!tt.core.hasObject(this.movements, movement)) {
            return;
        }
        tt.core.removeObject(this.movements, movement);
        movement.decUsageCounter();
    }

});

