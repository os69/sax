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
        this.addX = this.addX.bind(this);
    }
    addX() {
        const oldSubItem = this.props.data;
        const newSubItem = { id: this.props.data.id + 'x' };
        this.props.onSubItemChanged(oldSubItem, newSubItem);
    }
    render() {
        return <li>
            {this.props.data.id}
            <Button label="add x" onClick={this.addX} />
        </li>
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.onSubItemChanged = this.onSubItemChanged.bind(this);
    }
    onSubItemChanged(oldSubItem, newSubItem) {
        const oldItem = this.props.data;
        const newItem = {
            id: this.props.data.id,
            subItems: this.props.data.subItems.map((subItem) => {
                return subItem === oldSubItem ? newSubItem : subItem;
            })
        };
        this.props.onItemChanged(oldItem, newItem);
    }
    render() {
        return <li>
            {this.props.data.id}
            <ul>
                {this.props.data.subItems.map((subItem) => {
                    return <SubItem key={subItem.id} data={subItem} onSubItemChanged={this.onSubItemChanged} />
                })}
            </ul>
        </li>
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.data;
        this.onItemChanged = this.onItemChanged.bind(this);
    }
    onItemChanged(oldItem, newItem) {
        this.setState((oldState) => {
            return {
                id: oldState.id,
                items: oldState.items.map((item) => {
                    return item == oldItem ? newItem : item;
                })
            };
        });
    }
    render() {
        return <div>
            {this.state.id}
            <ul>
                {this.state.items.map((item) => {
                    return <Item key={item.id} data={item} onItemChanged={this.onItemChanged} />
                })}
            </ul>
        </div>;
    }
}

const data = {
    id: 'root',
    items: [{
        id: '1',
        subItems: [{
            id: '1-1'
        }, {
            id: '1-2'
        }]
    }, {
        id: '2',
        subItems: [{
            id: '2-1'
        }, {
            id: '2-2'
        }]
    }]
}

print(<App data={data} />);