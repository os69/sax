import React, { FunctionComponent } from 'react';
import ContainerModel from '../model/Container';
import Item from './Item';
import { pure } from 'recompose';

const Container: FunctionComponent<{
    container: ContainerModel;
}> = (props) => {
    console.log('container', props.container.label);
    return <div>
        <h1>{props.container.label}</h1>
        <ul>{props.container.items.map(item => <Item key={item.id} item={item} />)}</ul>
    </div>;
};

export default pure(Container);