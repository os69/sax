import { INCREMENT } from '../actions/actions';
import itemsReducer from './items';

export default function app(state, action) {
    switch (action.type) {
        case INCREMENT:
            return Object.assign({}, state, {
                items: itemsReducer(state.items, action)
            });
        default:
            return state;
    }
}
