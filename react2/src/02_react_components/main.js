import React from "react";
import ReactDOM from "react-dom";

// ===========================================================================
// convenience for ReactDOM.render
// ===========================================================================
const print = function (reactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(reactElement, container);
}

// ===========================================================================
// hello world 
// ===========================================================================
print(<h1>Hello World!</h1>);

// ===========================================================================
// hello world with a component
// ===========================================================================

class HelloWorld extends React.Component {
    render() {
        return <h1>Hello World!</h1>;
    }
}

print(<HelloWorld />);

// ===========================================================================
// hello world with parameters
// ===========================================================================

class HelloWorld2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h1>Hello {this.props.name}!</h1>;
    }
}

print(<HelloWorld2 name="Universe" />);

const text = 'Universe';
print(<HelloWorld2 name={text.toLocaleLowerCase()} />);

// ===========================================================================
// components rendering components
// ===========================================================================

class PurchaseOrder extends React.Component {
    render() {
        return <div>
            <h1>{this.props.purchaseOrder.label}</h1>
            <ul>
                {this.props.purchaseOrder.items.map(item => <PurchaseOrderItem key={item.position} item={item} />)}
            </ul>
        </div>
    }
}

class PurchaseOrderItem extends React.Component {
    render() {
        return <li>{this.props.item.position} {this.props.item.label}</li>
    }
}

const purchaseOrder = {
    label: 'My Order',
    items: [
        { position: 10, label: 'notebook' },
        { position: 20, label: 'aircraft carrier' },
        { position: 30, label: 'cat' }]
}
print(<PurchaseOrder purchaseOrder={purchaseOrder} />);

// ===========================================================================
// state
// ===========================================================================

class SalesOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.salesOrder;
        window.salesOrderComponent = this;
    }
    render() {
        console.log('render sales order', this.state.label);
        return <div>
            <h1>{this.state.label}</h1>
            <ul>
                {this.state.items.map(item => <SalesOrderItem key={item.position} item={item} />)}
            </ul>
        </div>
    }
}

class SalesOrderItem extends React.Component {
    render() {
        console.log('render sales order item', this.props.item.label);
        return <li><FormattedNumber number={this.props.item.position} /> {this.props.item.label}</li>
    }

}
class FormattedNumber extends React.Component {
   /* shouldComponentUpdate(nextProps, nextState) {
        
    }*/
    render() {
        console.log('render formatted number', this.props.number);
        return <span>{this.props.number}</span>;
    }
}

const salesOrder = {
    label: 'My Order',
    items: [
        { position: 10, label: 'notebook' },
        { position: 20, label: 'aircraft carrier' },
        { position: 30, label: 'cat' }]
}
print(<SalesOrder salesOrder={salesOrder} />);
console.log('change');
salesOrder.label = 'Changed Label';
window.salesOrderComponent.setState(salesOrder);