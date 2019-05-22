import { Action, INCREMENT } from '../actions/actions';
import SubItem from '../model/SubItem';

export default function subItemReducer(state: SubItem, action: Action): SubItem {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state;
    }
}
