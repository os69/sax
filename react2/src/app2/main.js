import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/app";
import AppReducer from "./reducers/app";
import changeSubItem from "./actions/changeSubItem";

let data = {
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

const store = createStore(AppReducer, data);

ReactDOM.render(<Provider store={store}>
    <App data={data} />
</Provider>, document.querySelector("#root"));

/*window.data1 = data;
const store = createStore(AppReducer, data);
store.subscribe(() => {
    window.data2 = store.getState();;
})*/



/*store.dispatch(changeSubItem('1', '1-1', { label: 'new label' }));*/

