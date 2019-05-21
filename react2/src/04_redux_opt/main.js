import { createStore } from "redux";
import AppReducer from "./reducers/app";
import { increment } from './actions/actions';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";

// ===========================================================================
// data model
// ===========================================================================
const data = {
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

// ===========================================================================
// redux data store
// ===========================================================================
const store = createStore(AppReducer, data);

// ===========================================================================
// react render
// ===========================================================================

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, container);

