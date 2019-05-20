import { INCREMENT } from '../actions/actions';
import itemReducer from './item';

export default function items(state = [], action) {
    switch (action.type) {
        case INCREMENT:
            return state.map((item) => {
                return item.id != action.itemId ? item : itemReducer(item, action)
            });
        default:
            return state;
    }
}
