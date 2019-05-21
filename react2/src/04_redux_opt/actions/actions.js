
export const INCREMENT = 'INCREMENT';

export function increment(itemId, subItemId) {
    return {
        type: INCREMENT,
        itemId,
        subItemId,
    };
}
