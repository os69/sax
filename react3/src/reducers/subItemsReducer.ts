import { Action, INCREMENT } from '../actions/actions';
import SubItem from '../model/SubItem';
import subItemReducer from './subItemReducer';

export default function subItemsReducer(state: SubItem[], action: Action): SubItem[] {
    switch (action.type) {
        case INCREMENT:
            return state.map(subItem => action.subItemId === subItem.id ? subItemReducer(subItem, action) : subItem);
        default:
            return state;
    }
}
