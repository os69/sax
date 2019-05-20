import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import appReducer from './reducers/app';
import { increment } from './actions/actions';
import store from './store';

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
// bad example: state change calls render method of all sub components
// ===========================================================================

function test1() {

    // create container
    const container = document.createElement('div');
    document.body.appendChild(container);

    // initial rendering
    ReactDOM.render(<App data={data} />, container);

    // change data and rerender
    data.items[1].subItems[0].count = 2;
    window.appComponent.setState(data);;
}

// ===========================================================================
// example for state change using immutable model
// ===========================================================================

function test2() {
    console.log(data);
    const incrementEvent = increment('2', '2-1');
    const changedData = appReducer(data, incrementEvent);
    console.log(changedData);
}

// ===========================================================================
// state change using immutable model + ui update
// ===========================================================================

function test3() {

    // create container
    const container = document.createElement('div');
    document.body.appendChild(container);

    // init store
    store.init(appReducer, data);

    // initial rendering
    ReactDOM.render(<App data={data} />, container);

    // change data and rerender
    const incrementEvent = increment('2', '2-1');
    store.dispatch(incrementEvent);

    // - use pure component
    // - increment button
}

test3();



