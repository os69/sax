// ===========================================================================
// utils
// ===========================================================================

let print = function (reactElement, containerNode) {

    if (!containerNode) {
        containerNode = document.createElement('div');
        document.body.appendChild(containerNode);
    }

    ReactDOM.render(
        reactElement,
        containerNode
    );

    return containerNode;
}

// ===========================================================================
// initial model
// ===========================================================================

const data = {
    id: 'root',
    label: 'label:root',
    items: [{
        id: '1',
        label: 'label:1',
        subItems: [{
            id: '1-1',
            label: 'label:1-1',
        }, {
            id: '1-2',
            label: 'label:1-2',
        }]
    }, {
        id: '2',
        label: 'label:2',
        subItems: [{
            id: '2-1',
            label: 'label:2-1',
        }, {
            id: '2-2',
            label: 'label:2-2',
        }]
    }]
}

// ===========================================================================
// action generators
// ===========================================================================

const CHANGE_SUBITEM_LABEL = 'CHANGE_SUBITEM_LABEL';

function changeSubItemLabel(itemId, subItemId, label) {
    return {
        type: CHANGE_SUBITEM_LABEL,
        itemId,
        subItemId,
        label
    };
}

// ===========================================================================
// reducers
// ===========================================================================

function subItemReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_SUBITEM_LABEL:
            return Object.assign({}, state, { label: action.label });
        default:
            return state;
    }
}

function subItemsReducer(state = [], action) {
    switch (action.type) {
        case CHANGE_SUBITEM_LABEL:
            return state.map((subItem) => {
                return action.subItemId !== subItem.id ? subItem : subItemReducer(subItem, action);
            });
        default:
            return state;
    }
}

function itemReducer(state = {}, action) {
    switch (action.type) {
        case CHANGE_SUBITEM_LABEL:
            return Object.assign({}, state, {
                subItems: subItemsReducer(state.subItems, action)
            });
        default:
            return state;
    }
}

function itemsReducer(state = [], action) {
    switch (action.type) {
        case CHANGE_SUBITEM_LABEL:
            return state.map((item) => {
                return item.id != action.itemId ? item : itemReducer(item, action)
            });
        default:
            return state;
    }
}

function appReducer(state = data, action) {
    switch (action.type) {
        case CHANGE_SUBITEM_LABEL:
            return Object.assign({}, state, {
                items: itemsReducer(state.items, action)
            });
        default:
            return state;
    }
}

// ===========================================================================
// react components
// ===========================================================================

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        this.props.onClick();
    }
    render() {
        return <button onClick={this.onClick}>{this.props.label}</button>
    }
}

AddXButton = ReactRedux.connect(null, (dispatch, ownProps) => {
    return {
        onClick: () => dispatch(changeSubItemLabel(ownProps.itemId, ownProps.subItemId, ownProps.newLabel)),
        label: 'add x'
    };
})(Button);

class SubItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <li>
            {this.props.data.label}
            <AddXButton itemId={this.props.parent.id} subItemId={this.props.data.id} newLabel={this.props.data.label + 'x'} />
        </li>
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <li>
            {this.props.data.label}
            <ul>
                {this.props.data.subItems.map((subItem) => {
                    return <SubItem key={subItem.id} data={subItem} parent={this.props.data} />
                })}
            </ul>
        </li>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            {this.props.data.label}
            <ul>
                {this.props.data.items.map((item) => {
                    return <Item key={item.id} data={item} />
                })}
            </ul>
        </div>;
    }
}

App = ReactRedux.connect((state) => {
    return { data: state };
}, )(App);

// ===========================================================================
// main
// ===========================================================================
const store = Redux.createStore(appReducer, data);
const Provider = ReactRedux.Provider;

print(<Provider store={store}>
    <App />
</Provider>);
