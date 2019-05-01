import React from "react";
import Button from "./button";

import { connect } from 'react-redux';
import incrementSubItem from '../actions/incrementSubItem';


class IncrementButton extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Button onClick={this.props.increment} label="add 1" />
    }
}


function mapDispatchToProps(dispatch, ownProps) {
    return {
        increment: () => dispatch(incrementSubItem(ownProps.itemId, ownProps.subItemId))
    }
}
IncrementButton = connect(null, mapDispatchToProps)(IncrementButton);

export default IncrementButton;
