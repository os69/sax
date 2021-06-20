import { defineTest } from './runner/tester';
import { tt } from '../src/tt/tt';

export var tests = defineTest('Calculated Property', function () {

    defineTest('property 1', function (ctx) {
        var obj = {
            a: 1
        }
        tt.initProperty(obj, 'a', 'settergetter');
        var oA = new tt.createPropertyObserver(obj, 'a');
        obj.setA(2);
        oA.delete();
    });

    defineTest('calculated property 1', function (ctx) {
        var o1 = { a: 1 };
        tt.initProperty(o1, 'a', 'settergetter');

        var o2 = {};
        tt.createCalculatedProperty(o2, 'b', function () {
            return o1.getA() + 10;
        }, 'settergetter');

        var o3 = {};
        tt.createCalculatedProperty(o3, 'c', function () {
            return o2.getB() + 100;
        }, 'settergetter');

        var o3Observer = tt.createPropertyObserver(o3, 'c');
        ctx.assertEquals(o3.c, 111, 'c=111');
        o1.setA(2);
        ctx.assertEquals(o3.c, 112, 'c=112');
        o3Observer.delete();

    });

    defineTest('calculated property 2', function (ctx) {

        var model = { firstName: 'Sally', lastName: 'Spring' };
        tt.initProperty(model, 'firstName', 'property');
        tt.initProperty(model, 'lastName', 'property');
        tt.createCalculatedProperty(model, 'name', () => {
            return model.firstName + ' ' + model.lastName;
        });

        var nameObserver = tt.createPropertyObserver(model, 'name');
        ctx.assertEquals(model.name, 'Sally Spring', 'name=Sally Spring');
        model.firstName = 'Susan';
        ctx.assertEquals(model.name, 'Susan Spring', 'name=Susan Spring');
        nameObserver.delete();

    });



});



