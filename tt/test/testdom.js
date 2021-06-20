import { ttdom as tt } from '../src/dom/ttdom';
import { defineTest } from './runner/tester';

export var tests = defineTest('dom test', function (ctx) {

    var model = {
        label: '1',
        children: [
            { label: '1-1' },
            { label: '1-2' }
        ]
    };

    var createModelNode = function (model) {
        tt.initProperty(model, 'label', 'settergetter');
        return tt.createTtNode({
            type: 'div',
            children: [
                tt.createTtNode({
                    type: 'div',
                    text: function () { return model.getLabel(); }
                }),
                tt.createTtNode({
                    type: 'ul',
                    children: tt.createMappedList(model.children, function (child) {
                        tt.initProperty(child, 'label', 'settergetter');
                        return tt.createTtNode({
                            type: 'li',
                            text: function () { return child.getLabel(); }
                        });
                    })
                })
            ]
        })
    };

    var rootNode = createModelNode(model);
    document.body.appendChild(rootNode.getDomNode());

    model.children.push({ label: '1-3' });

    rootNode.delete();

});

