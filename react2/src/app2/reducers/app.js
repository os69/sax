import { CHANGE_SUBITEM, INCREMENT_SUBITEM } from '../actions/actionTypes';
import Items from './items';

export default function App(state = {}, action) {


    switch (action.type) {
        case CHANGE_SUBITEM:
        case INCREMENT_SUBITEM:
            console.log('reduce app');
            return Object.assign({}, state, {
                items: Items(state.items, action)
            });
        default:
            return state
    }
}