import React from "react";
import IncrementButton from './incrementButton';
import {connect} from "react-redux";

class SubItem extends React.Component {
    constructor(props) {
        super(props);
        this.increment = this.increment.bind(this);
    }
    increment() {
        this.props.dispatch(changeSubItem(this.props.itemId, this.props.data.id, { count: this.props.data.count + 1 }));
    }
    render() {
        console.log(this.props.data.label);
        return <li>
            {this.props.data.label} {this.props.data.count}
            <IncrementButton itemId={this.props.itemId} subItemId={this.props.data.id} oldCount={this.props.data.count} />
        </li>
    }
}

SubItem = connect()(SubItem);

export default SubItem;