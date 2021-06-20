define(['../src/index'], function (tt) {

    var testCases = {};

    // =======================================================================
    // dom 1
    // =======================================================================

    testCases.dom1 = {
        label: 'Dom 1',
        execute: function (ctx) {

            var model = {
                label: '1',
                children: [
                    { label: '1-1' },
                    { label: '1-2' }
                ]
            };

            var createModelNode = function (model) {
                tt.initProperty(model, 'label');
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
                                tt.initProperty(child, 'label');
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
            
        }
    };

    return testCases;
});




