# React Elements

## jsx

*Jsx* ist *Javascript* with embedded *XML*. 
```jsx
const reactElement = <h1>Hello World!</h1>;
```
*Jsx* ist converted (transpiled) by *Babel* to pure *Javascript*:
```jsx
const reactElement = React.createElement("h1",{},"Hello World!");
```

## React Element

*React.createElement* returns a *React Element* which is a structure describing how to build the DOM:

```js
 { 
     type: 'h1',
     props: {    
         children: 'Hello world!'
    }
}
```

## Nesting

Typically *React Elements* are nested:
```jsx
const reactElement = 
    <ul>
        <li>1</li>
        <li>2</li>
    </ul>
```

*Babel* transpiles this to nested *createElements* instruction which create a nested tree structure.


componentes
pure
state
presentational
class, functional
higher order 
hooks



