import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

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

const container = document.createElement('div');
document.body.appendChild(container);
ReactDOM.render(<App data={data}/>, container);

import appReducer from './reducers/app';
import { increment } from './actions/actions';

import store from './store';

store.init(appReducer, data);
//const changedState = appReducer(data, increment('2', '2-1'));
//console.log(changedState);

