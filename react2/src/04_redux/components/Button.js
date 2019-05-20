import React from "react";

export default class Button extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.onClick();
    }
    render() {
        return <button onClick={this.onClick}>{this.props.label}</button>
    }
}
