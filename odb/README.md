# ODB: A Javascript Object Datatabase

## Installation

Load the library :
```HTML
<script src="odb.js" type="text/javascript"></script>
```

## Basic Usage

Create an empty database:
```javascript
var db = new odb.DB();
```
Store an object with key 'notebook' in the database:
```javascript
db.put('notebook', {
    title: 'Notebook',
    price: 10,
    keywords: ['computer', 'mobile']
});
```
The subobjects (in this example 'keywords') of the object are stored recursively in the database.

Get an object from the database:
```javascript
var notebook = db.get('notebook');
```
Dump the database to JSON:
```javascript
var json = JSON.stringify(db.toJson());
```
Create a new database and fill it with data from JSON
```javascript
db = new odb.DB({
    json: JSON.parse(json)
});
```
## Storing Objects with Circular References
Unlike JSON you can store objects with circular references in the object database. The database assigns ids to the objects. Internally the object database uses the ids for storing object references.
```javascript
// create empty database
var db = new odb.DB();

// circular object references
var o1 = {
    id: '1'
};
var o2 = {
    id: '2'
};
var o3 = {
    id: '3'
};
o1.p = o2;
o2.p = o3;
o3.p = o1;

// store o1 (and via recursion o2 and o3) in the database
db.put('o1', o1);
```
## Ids for the Objects 
The object database generates ids for the objects in the database. Instead of relying on the automatic id generation an object can provide its own id. In the object database constructor you can define the name of an object property which stores the id or the name of a method for getting the id.

### Getting the id from an Property
```javascript
// create empty database
// the id of an object is taken from the property 'id'
var db = new odb.DB({
    idProperty: 'id'
});

// create an object
var notebook = {
    id: '4711',
    price: 10
};

// store object in db, not necessary to provide the id here
db.put(notebook);

// get object from db
notebook = db.get('4711');
```

### Getting the ID via a Getter

```javascript
// create empty database
// the id of an object is taken by calling the getter myGetId
var db = new odb.DB({
    getId: 'myGetId'
});

// create an object
var notebook = {
    id: '4711',
    price: 10,
    myGetId: function() {
        return this.id;
    }
};

// store object in db, not necessary to provide the id here
db.put(notebook);

// get object from db
notebook = db.get('4711');
```

## Storing Class Instances in the Object Database
Besides simple objects like ``[1,2,3]`` or ``{a:1, b:2}`` typically you want to store 'instances of a class' = objects with a prototype hierarchy in the database. Here is a simple class definition:
```javascript
window.mylib = {};

window.mylib.Collection = function() {
    this.init.apply(this, arguments);
};
window.mylib.Collection.prototype = {
    type: 'mylib.Collection',
    init: function() {
        this.items = [];
    },
    add: function(item) {
        this.items.push(item);
    }
};
```
The prototype includes the property 'type'. This is needed for the object database in order to restore objects. The following snippet creates an instance of 'Collection' and stores the instance in the database:
```javascript
// create an instance of class Collection
var collection = new window.mylib.Collection();
collection.add(1);
collection.add(2);

// create database and store instance
var db = new odb.DB({
    typeProperty: 'type'
});
db.put('collection', collection);
```
When creating the database you can specify which property holds the type information. Instead of a property each object could provide the type information via a getter. 


