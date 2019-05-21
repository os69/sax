import React from "react";
import { connect } from 'react-redux';
import Item from "./Item";
import TotalCount from "./TotalCount"

function App({ data }) {
    console.log('root');
    return <div>
        <h1>{data.label}</h1>
        <b>Total Count: <TotalCount data={data} /></b>
        <ul>
            {data.items.map(item =>
                <Item key={item.id} data={item} />
            )}
        </ul>
    </div>
}

const mapStateToProps = function (state) {
    return { data: state };
}

export default connect(mapStateToProps)(App);
