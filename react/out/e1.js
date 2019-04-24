let delayed = function (cmd) {
  setTimeout(cmd, 2000);
};

let print = function (reactElement, containerNode) {
  if (!containerNode) {
    containerNode = document.createElement('div');
    document.body.appendChild(containerNode);
  }

  ReactDOM.render(reactElement, containerNode);
  return containerNode;
};

let a = 1;
print(React.createElement("h1", null, "test ", a, " test"));

function Welcome1(props) {
  return React.createElement("b", null, "Hello, ", props.name);
}

print(React.createElement(Welcome1, {
  name: "Sally"
}));

class Welcome2 extends React.Component {
  render() {
    return React.createElement("b", null, this.props.name);
  }

}

print(React.createElement(Welcome2, {
  name: "Susan"
}));

class NameValue extends React.Component {
  render() {
    return React.createElement("div", null, this.props.name, " : ", this.props.value, " ");
  }

}

class Person extends React.Component {
  render() {
    return React.createElement("div", null, React.createElement(NameValue, {
      name: "First Name",
      value: this.props.firstName
    }), React.createElement(NameValue, {
      name: "Last Name",
      value: this.props.lastName
    }));
  }

}

print(React.createElement(Person, {
  firstName: "Sally",
  lastName: "Spring"
}));

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.timeID = this.setState({
      time: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return React.createElement(NameValue, {
      name: "time",
      value: this.state.time.toString()
    });
  }

}

let clockElement = React.createElement(Clock, null);
let containerNode = print(clockElement);
/*delayed(() => { 
    print(clockElement);
})*/