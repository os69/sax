import React from "react";
import Item from "./Item";
import TotalCount from "./TotalCount"
import store from '../store';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        store.register(this);
        window.appComponent = this;
    }
    /*shouldComponentUpdate(nextProps, nextState) {
        return this.state != nextState;
    }*/
    render() {
        console.log('root');
        return <div>
            <h1>{this.state.label}</h1>
            <b>Total Count: <TotalCount data={this.state} /></b>
            <ul>
                {this.state.items.map(item =>
                    <Item key={item.id} data={item} />
                )}
            </ul>
        </div>
    }
}