import { Action, INCREMENT } from '../actions/actions';
import Container from '../model/Container';
import containerReducer from './containerReducer';
import { Reducer } from 'redux';

/*export default function appReducer(state: Container, action: Action): Container {
    switch (action.type) {
        case INCREMENT:
            return containerReducer(state, action);
        default:
            return state;
    }
}*/

const appReducer : Reducer<Container, Action> = (state,action) => {
    switch (action.type) {
        case INCREMENT:
            return containerReducer(state, action);
        default:
            return state;
    }
};

export default appReducer;