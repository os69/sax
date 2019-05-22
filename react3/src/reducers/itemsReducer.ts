import { Action, INCREMENT } from '../actions/actions';
import Item from '../model/Item';
import itemReducer from './itemReducer';

export default function itemsReducer(state: Item[], action: Action): Item[] {
    switch (action.type) {
        case INCREMENT:
            return state.map(item => action.itemId === item.id ? itemReducer(item, action) : item);
        default:
            return state;
    }
}
