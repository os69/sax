import { INCREMENT } from '../actions/actions';
import subItemsReducer from './subItems';

export default function item(state = {}, action) {
    switch (action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                subItems: subItemsReducer(state.subItems, action)
            });
        default:
            return state;
    }
}
