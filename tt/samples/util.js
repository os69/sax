import { ttdom as tt } from '../../tt/src/dom/ttdom';

export var util = {

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
    },

    createInputTtNode: function (params) {
        return tt.createTtNode({
            type: 'div',
            css: ['field'],
            children: [
                tt.createTtNode({
                    type: 'label',
                    css: ['label'],
                    text: params.label
                }),
                tt.createTtNode({
                    type: 'div',
                    css: ['control'],
                    children: [tt.createTtNode({
                        type: 'input',
                        css: ['input'],
                        disabled: params.disabled,
                        value: params.value,
                        change: params.change
                    })]
                })]
        });
    }
};

