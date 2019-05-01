import React from "react";
import SubItem from "./subitem";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props.data.label);
        return <li>
            {this.props.data.label}
            <ul>
                {this.props.data.subItems.map(item =>
                    <SubItem key={item.id} data={item} />
                )}
            </ul>
        </li>
    }
}