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

class ListElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = props;
    }
    render() {
        return <div>
            {this.props.label}
            <Button label="add X" onClick={this.props.addX} />
        </div>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: 'Useless List x',
            items: [{ label: 'Notebook' }, { label: 'Aircraft Carrier' }, { label: 'Cat' }]
        };
        this.delete = this.delete.bind(this);
    }
    delete() {
        this.setState((state) => {
            state = { items: state.items.slice() };
            state.items.splice(0, 1);
            return state;
        });
    }
    addX(item) {
        this.setState((state) => {
            state = { items: state.items.slice() };
            var index = state.items.indexOf(item);
            state.items[index] = { label: item.label + 'X' };
            return state;
        });
    }
    render() {
        return <div>
            <h1>{this.state.label}</h1>
            {this.state.items.map((item) => <ListElement label={item.label} addX={() => this.addX(item)} />)}
            <Button label="delete" onClick={this.delete} />
        </div>;
    }
}

print(<App />);