# domAble
A simple and light library to manipulate the DOM.

##### [ES6 Library can be reached here](https://github.com/Vadimvf/domAble/blob/master/lib/domAble.js)
See it in use!
[Play the Zynth!][Zynth]
[Zynth]: http://vadimvf.github.io/Zynth/

##Methods

###$d
$d
```javascript
  const collection = $d("div");
  -> DOMNodeCollection {0: div#keyboard.group, 1: div#controller.group, 2: div#keys, length: 3}
  
  // collection is the created DOMNodeCollection
  // "div" is the DOM element being collected
  
  const collection = $d(".klass");
  -> DOMNodeCollection {0: div.klass, 1: li.klass, length: 2}
  
  // ".klass" is one or more CSS selectors separated by commas
  
  $d(function(){});
  
  // passing in a function will add an event listener to the document body
  // document.addEventListener("DOMContentLoaded", funktion);
  
```

$d.isEmptyObject
```javascript
  let obj = {};
  
  $d.isEmptyObject(obj);
  -> true
  
  // obj is an Object
  // returns a boolean
```

$d.merge
```javascript

```

$d.isMatch
```javascript
  //a quick polyfill for matches
  
  $d.isMatch(el, selector);
  -> false
  
  //el is a DOM element
  //selector is a string to match against
  //returns a boolean
```

###DOMNodeCollection

getHTML
```javascript
  let collection = $d('p');
  
  collection.getHTML();
  -> ["one", "two", "two is three"]
  
  //returns an array of the innerHTML for each element in the collection
```

setHTML
```javascript
  collection.setHTML("All paragraphs now have text!");
  -> collection
  
  //DANGEROUS
  collection.setHTML("<li></li>");
  -> collection
  
  //Sets the innerHTML for each element. 
  //Can be dangerous if taken from user input (user can add a script tage) 
```

empty
```javascript
  collection.empty();
  -> collection
  
  //empties the innerHTML for each element in the collection
```

append
```javascript
  collection.append(otherCollection);
  -> collection
  
  collection.append(HTMLElement);
  -> collection
  
  collection.append(string);
  -> collection

```

addClass
```javascript
  collection.addClass(string);
  -> collection

```

id
```javascript
  collection.addClass(id);
  -> collection
```

removeClass
```javascript
  let string = "klassOne klassTwo klassThree";
  collection.addClass(string);
  -> collection
```

children
```javascript
  collection.children();
  -> DOMNodeCollection
```

parent
```javascript
  collection.parent();
  -> DOMNodeCollection
```

find
```javascript
  collection.find(selector);
  -> DOMNodeCollection
```

on
```javascript
  let listener = $(#container).on("click", "li.button", funktion);
  -> function(){}
  
  
```

off
```javascript
  $(#container).off("click", listener);

```

each
```javascript
  collection.each(callback);
  -> collection
```

convertAll
```javascript
  collection.convertAll();
  -> collection
```
