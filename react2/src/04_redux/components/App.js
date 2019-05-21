import React from "react";
import { connect } from 'react-redux';
import Item from "./Item";
import TotalCount from "./TotalCount"

export default class App extends React.PureComponent {
    render() {
        console.log('root');
        return <div>
            <h1>{this.props.data.label}</h1>
            <b>Total Count: <TotalCount data={this.props.data} /></b>
            <ul>
                {this.props.data.items.map(item =>
                    <Item key={item.id} data={item} />
                )}
            </ul>
        </div>
    }
}

const mapStateToProps = function (state) {
    return { data: state };
}
App = connect(mapStateToProps)(App);
