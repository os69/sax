import React from "react";
import Item from "./item";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
        window.root = this;
    }
    render() {
        console.log('root');
        return <div>
            <h1>{this.state.data.label}</h1>            
            <ul>
                {this.state.data.items.map(item => 
                    <Item key={item.id} data={item} />
                )}
            </ul>
        </div>
    }
}