import React from "react";

export default class TotalCount extends React.Component {
    constructor(props) {
        super(props);
    }
   /* shouldComponentUpdate(nextProps, nextState) {
        return this.props.data != nextProps.data;
    }*/
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