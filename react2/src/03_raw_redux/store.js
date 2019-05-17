export default {
    init: function (rootReducer, initialState) {
        this.state = initialState;
        this.rootReducer = rootReducer;
    },
    register: function (component) {
        this.component = component;
    },
    dispatch: function (event) {
        this.state = this.rootReducer(this.state, event);
        this.component.setState(this.state);
    }
}