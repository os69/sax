import SubItem from './SubItem';

export default interface Item {
    id : string,
    label: string,
    subItems: SubItem[]
}