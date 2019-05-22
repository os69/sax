import React, { FunctionComponent } from 'react';
import SubItemModel from '../model/SubItem';
import { pure } from "recompose";

const SubItem: FunctionComponent<{
    subItem: SubItemModel
}> = (props) => {
    console.log('app', props.subItem.label);
    return <li>{props.subItem.label}:{props.subItem.count}</li>;
};

export default pure(SubItem);