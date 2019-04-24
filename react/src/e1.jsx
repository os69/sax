


let delayed = function (cmd) {
    setTimeout(cmd, 2000);
};

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


let a = 1;
print(<h1>test {a} test</h1>)


function Welcome1(props) {
    return <b>Hello, {props.name}</b>;
}

print(<Welcome1 name="Sally" />)

class Welcome2 extends React.Component {
    render() {
        return <b>{this.props.name}</b>
    }
}

print(<Welcome2 name="Susan" />);

class NameValue extends React.Component {
    render() {
        return <div>{this.props.name} : {this.props.value} </div>
    }
}

class Person extends React.Component {
    render() {
        return <div>
            <NameValue name="First Name" value={this.props.firstName} />
            <NameValue name="Last Name" value={this.props.lastName} />
        </div>
    }
}

print(<Person firstName="Sally" lastName="Spring" />)

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: new Date() };
    }
    componentDidMount() {
        setInterval(() => this.tick(), 1000);
    }
    tick() {
        this.timeID = this.setState({ time: new Date() });
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    render() {
        return <NameValue name="time" value={this.state.time.toString()}/>
    }
}


let clockElement = <Clock />;
let containerNode = print(clockElement);

/*delayed(() => { 
    print(clockElement);
})*/

