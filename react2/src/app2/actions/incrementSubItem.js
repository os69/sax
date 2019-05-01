
import { INCREMENT_SUBITEM } from './actionTypes';

export default function incrementSubItem(itemId, subItemId) {
    return {
        type: INCREMENT_SUBITEM,
        itemId: itemId,
        subItemId: subItemId
    }
}