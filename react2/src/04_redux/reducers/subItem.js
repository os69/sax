import { INCREMENT } from '../actions/actions';

export default function subItem(state = {}, action) {
    switch (action.type) {
        case INCREMENT:
            return Object.assign({}, state, { count: state.count + 1 });
        default:
            return state;
    }
}
