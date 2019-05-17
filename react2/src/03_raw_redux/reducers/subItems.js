import { INCREMENT } from '../actions/actions';
import subItemReducer from './subItem';

export default function subItems(state = [], action) {
    switch (action.type) {
        case INCREMENT:
            return state.map((subItem) => {
                return action.subItemId !== subItem.id ? subItem : subItemReducer(subItem, action);
            });
        default:
            return state;
    }
}
