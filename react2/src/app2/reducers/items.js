import { CHANGE_SUBITEM, INCREMENT_SUBITEM } from '../actions/actionTypes';
import Item from './item';

export default function Items(state = {}, action) {
    switch (action.type) {
        case CHANGE_SUBITEM:
        case INCREMENT_SUBITEM:
        console.log('reduce items');
            return state.map(item => {
                return item.id === action.itemId ? Item(item, action) : item;
            });
        default:
            return state;
    }
}