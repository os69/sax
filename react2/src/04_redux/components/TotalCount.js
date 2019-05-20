import React from "react";

export default class TotalCount extends React.PureComponent {
    render() {
        console.log('render total count');
        let count = 0;
        for (let item of this.props.data.items) {
            for (let subItem of item.subItems) {
                count += subItem.count;
            }
        }
        return <span>{count}</span>;
    }
}