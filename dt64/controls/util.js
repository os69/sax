define(['../src/index'], function (tt) {

    return {

        createLabelTtNode: function (label) {
            return tt.createTtNode({
                type: 'span',
                text: label
            })
        },

        createIconTtNode: function (params) {
            return tt.createTtNode({
                type: 'span',
                click: params.click,
                css: ['icon'],
                children: [tt.createTtNode({
                    type: 'i',
                    css: params.icon
                })]
            })
        },

        createWidgetTtNode: function (params) {
            return tt.createTtNode({
                type: 'article',
                css: ['message'],
                children: [
                    tt.createTtNode({
                        type: 'div',
                        css: ['message-header'],
                        children: [
                            tt.createTtNode({
                                type: 'p',
                                text: params.header
                            }),
                            tt.createTtNode({
                                type: 'button',
                                css: ['delete']
                            })
                        ]
                    }),
                    tt.createTtNode({
                        type: 'div',
                        css: ['message-body'],
                        children: params.body
                    })
                ]
            })
        }

    };

});