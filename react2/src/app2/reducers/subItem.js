import { CHANGE_SUBITEM, INCREMENT_SUBITEM } from '../actions/actionTypes';

export default function SubItem(state = {}, action) {
    switch (action.type) {
        case CHANGE_SUBITEM:
            console.log('reduce subitem');
            return Object.assign({}, state, action.subItemData);
        case INCREMENT_SUBITEM:
            return Object.assign({}, state, { count: state.count + 1 });
        default:
            return state
    }
}