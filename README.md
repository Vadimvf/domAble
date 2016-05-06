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
  ->DOMNodeCollection {0: div#keyboard.group, 1: div#controller.group, 2: div#keys, length: 3}
  // collection is the created DOMNodeCollection
  // "div" is the DOM element being collected
  
  const collection = $d(".klass");
  ->DOMNodeCollection {0: div.klass, 1: li.klass, length: 2}
  // ".klass" is one or more CSS selectors separated by commas
  
  $d(function(){});
  // passing in a function will add an event listener to the document body
  // document.addEventListener("DOMContentLoaded", funktion);
  
```

$d.isEmptyObject
```javascript
  let obj = {};
  
  $d.isEmptyObject(obj);
  ->true
  // obj is an Object
  // returns a boolean
```

$d.merge
```javascript

```

$d.isMatch
```javascript

```

###DOMNodeCollection

each
```javascript

```

getHTML
```javascript

```

setHTML
```javascript

```

empty
```javascript

```

append
```javascript

```

addClass
```javascript

```

id
```javascript

```

removeClass
```javascript

```

children
```javascript

```

parent
```javascript

```

find
```javascript

```

on
```javascript

```

off
```javascript

```

convertAll
```javascript

```
