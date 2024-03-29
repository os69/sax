import React from "react";
import Button from "./Button";
import { increment } from "../actions/actions";
import store from "../store";

export default class SubItem extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
    }
    increment() {
        console.log('increment');
        store.dispatch(increment(this.props.itemId, this.props.data.id));
    }
 /*   shouldComponentUpdate(nextProps, nextState) {
        return this.props.data != nextProps.data;
    }    */
    render() {
        console.log(this.props.data.label);
        return <li>
            {this.props.data.label}: {this.props.data.count}
            <Button label="increment" onClick={this.increment} />
        </li>
    }
}