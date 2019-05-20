import React from "react";
import SubItem from "./SubItem";

export default class Item extends React.PureComponent {
    render() {
        console.log(this.props.data.label);
        return <li>
            {this.props.data.label}
            <ul>
                {this.props.data.subItems.map(subItem =>
                    <SubItem key={subItem.id} itemId={this.props.data.id} data={subItem} />
                )}
            </ul>
        </li>
    }
}