import { Action, INCREMENT } from '../actions/actions';
import Container from '../model/Container';
import itemsReducer from './itemsReducer';

export default function containerReducer(state: Container, action: Action): Container {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                items: itemsReducer(state.items, action)
            }
        default:
            return state;
    }
}
