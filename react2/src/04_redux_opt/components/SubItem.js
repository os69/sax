import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from "./Button";
import { increment } from "../actions/actions";

function SubItem({ data, increment, itemId }) {
    console.log(data.label);
    return <li>
        {data.label}: {data.count}
        <Button label="increment" onClick={() => increment(itemId, data.id)} />
    </li>
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ increment }, dispatch)
}

export default connect(null, mapDispatchToProps)(SubItem);