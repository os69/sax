import React from "react";
import { pure } from 'recompose';
import SubItem from "./SubItem";

function Item({ data }) {
    console.log(data.label);
    return <li>
        {data.label}
        <ul>
            {data.subItems.map(subItem =>
                <SubItem key={subItem.id} itemId={data.id} data={subItem} />
            )}
        </ul>
    </li>
}

export default pure(Item);