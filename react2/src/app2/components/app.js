import React from "react";
import Item from "./item";
import { connect } from 'react-redux';
import Total from "./total";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('root');
        return <div>
            <h1>{this.props.data.label}</h1>
            <Total items= {this.props.data.items}/>
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

export default App;