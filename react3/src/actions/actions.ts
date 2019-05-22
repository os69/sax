export const INCREMENT = "increment";

import Item from '../model/Item';

export interface IncrementAction {
    type: typeof INCREMENT,
    itemId: string,
    subItemId: string
}

export function increment(itemId: string, subItemId: string): IncrementAction{
    return {
        type: INCREMENT,
        itemId: itemId,
        subItemId: subItemId
    };
}

export type Action = IncrementAction;