import React from "react";
import SubItem from "./subitem";
import {connect} from "react-redux";

class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.data.label);
        return <li>
            {this.props.data.label}
            <ul>
                {this.props.data.subItems.map(subItem =>
                    <SubItem key={subItem.id} itemId={this.props.data.id} data={subItem}/>
                )}
            </ul>
        </li>
    }
}

Item = connect()(Item);

export default Item;