//import actionTypes from './actionTypes';
import { CHANGE_SUBITEM } from './actionTypes';



export default function changeSubItem(itemId, subItemId, subItemData) {
    return {
        type: CHANGE_SUBITEM,
        itemId: itemId,
        subItemId: subItemId,
        subItemData: subItemData
    }
}