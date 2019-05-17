import React from "react";
import ReactDOM from "react-dom";

// ===========================================================================
// hello world
// ===========================================================================

// jsx is javascript with embedded XML (HTML).
// babel transpiler transform jsx to React.createElement("b",{},"Hello World!");

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
// switch from js to xml and back to js
// ===========================================================================

// switch from js to xml: just write the xml tag <b>..</b>
// switch form xml to js: write {}
// nesting possible js -> xml -> js -> xml ...

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
}, {
    label: 'cat',
    position: 30
}];
print(<ul>
    {items.map(item =>
        <li>{item.position + ' ' + item.label}</li>)}
</ul>);

// ===========================================================================
// shadow dom delta update
// ===========================================================================

// the tree of react elements is like a shadow dom
// when updating the real dom only the deltas are rendered

const purchaseOrder1 =
    <div>
        Sales Order
        <ul>
            <li>10 notebook</li>
            <li>20 aircraft carrier</li>
            <li>30 dog</li>
        </ul>
    </div>

const purchaseOrder2 =
    <div>
        Sales Order
        <ul>
            <li>10 notebook</li>
            <li>20 aircraft carrier</li>
            <li>30 cat</li>
        </ul>
    </div>

const purchaseOrderNode = document.createElement('div');
document.body.appendChild(purchaseOrderNode);

ReactDOM.render(purchaseOrder1, purchaseOrderNode);

window.updatePurchaseOrder = function () {
    ReactDOM.render(purchaseOrder2, purchaseOrderNode);
}