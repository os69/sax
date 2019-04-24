let print = function (reactElement, containerNode) {
  if (!containerNode) {
    containerNode = document.createElement('div');
    document.body.appendChild(containerNode);
  }

  ReactDOM.render(reactElement, containerNode);
  return containerNode;
};

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick();
  }

  render() {
    return React.createElement("button", {
      onClick: this.onClick
    }, this.props.label);
  }

}

class ListElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return React.createElement("div", null, this.props.label, React.createElement(Button, {
      label: "add X",
      onClick: this.props.addX
    }));
  }

}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: 'Useless List x',
      items: [{
        label: 'Notebook'
      }, {
        label: 'Aircraft Carrier'
      }, {
        label: 'Cat'
      }]
    };
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.setState(state => {
      state = {
        items: state.items.slice()
      };
      state.items.splice(0, 1);
      return state;
    });
  }

  addX(item) {
    this.setState(state => {
      state = {
        items: state.items.slice()
      };
      var index = state.items.indexOf(item);
      state.items[index] = {
        label: item.label + 'X'
      };
      return state;
    });
  }

  render() {
    return React.createElement("div", null, React.createElement("h1", null, this.state.label), this.state.items.map(item => React.createElement(ListElement, {
      label: item.label,
      addX: () => this.addX(item)
    })), React.createElement(Button, {
      label: "delete",
      onClick: this.delete
    }));
  }

}

print(React.createElement(App, null));