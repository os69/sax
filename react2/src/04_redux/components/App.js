import React from "react";
import Item from "./Item";
import TotalCount from "./TotalCount"
import { connect } from 'react-redux';

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
