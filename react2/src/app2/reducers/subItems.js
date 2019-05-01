import { CHANGE_SUBITEM , INCREMENT_SUBITEM} from '../actions/actionTypes';
import SubItem from './subItem';

export default function SubItems(state = {}, action) {
    switch (action.type) {
        case CHANGE_SUBITEM:
        case INCREMENT_SUBITEM:
        console.log('reduce subitems'); 
        
            return state.map(subItem => {
                return subItem.id === action.subItemId ? SubItem(subItem, action) : subItem;
            });
        default:
            return state;
    }
}