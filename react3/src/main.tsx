import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import Container from './model/Container';
import { createStore } from 'redux';
import appReducer from './reducers/appReducer';
import { Provider } from "react-redux";
import { increment } from './actions/actions';
import { Action } from './actions/actions';

const container: Container = {
    id: 'root',
    label: 'Root',
    items: [
        {
            id: '1',
            label: 'Item 1',
            subItems: [
                {
                    id: '1-1',
                    label: 'Subitem 1-1',
                    count: 1
                },
                {
                    id: '1-2',
                    label: 'Subitem 1-2',
                    count: 1
                }
            ]
        },
        {
            id: '2',
            label: 'Item 2',
            subItems: [
                {
                    id: '2-1',
                    label: 'Subitem 2-1',
                    count: 1
                },
                {
                    id: '2-2',
                    label: 'Subitem 2-2',
                    count: 1
                }
            ]
        }
    ]
}

const store = createStore<Container,Action,any,any>(appReducer, container);

const node = document.createElement('div');
document.body.appendChild(node);
render(<Provider store={store}>
    <App />
</Provider>, node);

console.log('change');
store.dispatch(increment('2', '2-1'));

