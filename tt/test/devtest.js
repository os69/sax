import { ttdom as tt } from '../src/dom/ttdom';
import { defineTest } from './runner/tester';

export var tests = defineTest('dev test: serialization', function (ctx) {


    var count = 0;
    var a = {
        name: 'a'
    };

    var b = {
        name: 'b',
        handler: function (signal, message) {
            console.log('received');
        }
    };

    tt.event.addEventHandler(a, 'hello', b, b.handler);
    tt.event.raiseEvent(a, 'hello', 13);

});

