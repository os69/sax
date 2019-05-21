import React from "react";
import { pure } from "recompose";

function TotalCount({ data }) {
    console.log('render total count');
    let count = 0;
    for (let item of data.items) {
        for (let subItem of item.subItems) {
            count += subItem.count;
        }
    }
    return <span>{count}</span>;
}

export default pure(TotalCount);

