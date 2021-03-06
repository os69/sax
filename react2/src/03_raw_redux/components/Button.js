import React from "react";

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.onClick();
    }
   /* shouldComponentUpdate(nextProps, nextState) {
        return this.props.data != nextProps.data;
    }    */
    render() {
        return <button onClick={this.onClick}>{this.props.label}</button>
    }
}
