import React, { FunctionComponent } from 'react';
import ItemModel from '../model/Item';
import SubItem from './SubItem';
import { pure } from "recompose";

const Item: FunctionComponent<{
    item: ItemModel
}> = (props) => {
    console.log('item', props.item.label);
    return <li>
        <h1>{props.item.label}</h1>
        <ul>{props.item.subItems.map(subItem => <SubItem key={subItem.id} subItem={subItem} />)}</ul>
    </li>;
};

export default pure(Item);