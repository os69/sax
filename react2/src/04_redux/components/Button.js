import React from "react";

export default class Button extends React.PureComponent {
    render() {
        return <button onClick={this.props.onClick}>{this.props.label}</button>
    }
}
