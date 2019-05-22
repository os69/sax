import { Action, INCREMENT } from '../actions/actions';
import Item from '../model/Item';
import subItemsReducer from './subItemsReducer';

export default function itemReducer(state: Item, action: Action): Item {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                subItems: subItemsReducer(state.subItems,action)
            }
        default:
            return state;
    }
}
