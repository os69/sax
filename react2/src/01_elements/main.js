import React from "react";
import ReactDOM from "react-dom";

// ===========================================================================
// hello world
// ===========================================================================

const container = document.createElement('div');
document.body.appendChild(container);

const element = <b>Hello World!</b>;
ReactDOM.render(element, container);


// ===========================================================================
// convenience for ReactDOM.render
// ===========================================================================

const print = function (reactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(reactElement, container);
}

// ===========================================================================
// hello world using convenience
// ===========================================================================

print(<b>Hello World using convenience function!</b>);

// ===========================================================================
// create react element manually
// ===========================================================================

print(React.createElement('b', { style: { 'fontSize': '20px' } },
    'Hello World',
    ' with manually created react elements'))

// ===========================================================================
// nesting
// ===========================================================================

print(
    <div>
        Sales Order
        <ul>
            <li>10 notebook</li>
            <li>20 aircraft carrier</li>
            <li>20 cat</li>
        </ul>
    </div>);

// ===========================================================================
// nesting and manually create react elements
// ===========================================================================

const list =
    React.createElement('div', {},
        'Sales Order with manually created react elements',
        React.createElement('ul', {},
            React.createElement('li', {}, '10 notebook'),
            React.createElement('li', {}, '20 aircraft carrier'),
            React.createElement('li', {}, '30 cat')));
print(list);

// ===========================================================================
// mix jsx and js
// ===========================================================================

const calculateSum = function (a, b) {
    return a + b;
}
print(<b>value={calculateSum(10, 20)}</b>)

// ===========================================================================
// does not work: combine by + 
// ===========================================================================

const element1 = <b>1</b>;
const element2 = <b>2</b>;
const element3 = element1 + element2;
print(element1);
print(element2);
print(element3);

// ===========================================================================
// instead
// ===========================================================================

const children = [<li>10</li>, <li>20</li>];
print(<ul>{children}</ul>)

// ===========================================================================
// typical usage
// ===========================================================================

const items = [{
    label: 'notebook',
    position: 10
}, {
    label: 'aircraft carrier',
    position: 20
}];
print(<ul>
    {items.map(item =>
        <li>{item.position + ' ' + item.label}</li>)}
</ul>);

// ===========================================================================
// shadow dom delta update
// ===========================================================================

const salesOrder0 =
    <div>
        Sales Order
        <ul>
            <li>10 notebook</li>
            <li>20 aircraft carrier</li>
            <li>20 dog</li>
        </ul>
    </div>

const salesOrder1 =
    <div>
        Sales Order
        <ul>
            <li>10 notebook</li>
            <li>20 aircraft carrier</li>
            <li>20 cat</li>
        </ul>
    </div>

const salesOrderNode = document.createElement('div');
document.body.appendChild(salesOrderNode);
ReactDOM.render(salesOrder0, salesOrderNode);

window.updateSalesOrder = function () {
    ReactDOM.render(salesOrder1, salesOrderNode);
}

