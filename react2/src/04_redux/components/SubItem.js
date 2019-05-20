import React from "react";
import Button from "./Button";
import { increment } from "../actions/actions";
import { connect } from 'react-redux';
import item from "../reducers/item";

export default class SubItem extends React.PureComponent {
    render() {
        console.log(this.props.data.label);
        return <li>
            {this.props.data.label}: {this.props.data.count}
            <Button label="increment" onClick={() => this.props.increment(this.props.itemId, this.props.data.id)} />
        </li>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: (itemId, subItemId) => dispatch(increment(itemId, subItemId))
    }
}

SubItem = connect(null, mapDispatchToProps)(SubItem);