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

class SubItem extends React.Component {
    constructor(props) {
        super(props);
        this.addXToLabel = this.addXToLabel.bind(this);
    }
    addXToLabel() {
        store.dispatch(changeSubItemLabel(this.props.parent.id, this.props.data.id, this.props.data.label + 'x'));
    }
    render() {
        return <li>
            {this.props.data.label}
            <Button label="add x to label" onClick={this.addXToLabel} />
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
        this.state = props.data;
        store.subscribe(() => {
            this.setState(store.getState());
        });
    }
    render() {
        return <div>
            {this.state.label}
            <ul>
                {this.state.items.map((item) => {
                    return <Item key={item.id} data={item} />
                })}
            </ul>
        </div>;
    }
}


// ===========================================================================
// main
// ===========================================================================

/*const action = changeSubItemLabel('2', '2-1', 'x');
const newData = appReducer(data, action);
console.log(newData);*/


const store = Redux.createStore(appReducer);

print(<App data={data} />);
