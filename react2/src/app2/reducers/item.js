import { CHANGE_SUBITEM, INCREMENT_SUBITEM } from '../actions/actionTypes';
import SubItems from './subItems';

export default function Item(state = {}, action) {
    switch (action.type) {
        case CHANGE_SUBITEM:
        case INCREMENT_SUBITEM:
        console.log('reduce item');
            return Object.assign({}, state, {
                subItems: SubItems(state.subItems, action)
            });
        default:
            return state
    }
}