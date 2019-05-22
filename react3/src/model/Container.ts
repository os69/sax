import Item from './Item';

export default interface Container{
    id: string,
    label : string,
    items: Item[]
}