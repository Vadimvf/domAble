;(() => {
  const $l = param => {
    if (typeof param === "string"){
      let list = document.querySelectorAll(param);
      list = [].slice.call(list);
      return new DOMNodeCollection(list);
    } else if (param instanceof HTMLElement){
      return new DOMNodeCollection([param]);
    } else if (typeof param === "function") {
      document.addEventListener("DOMContentLoaded", param);
    }
  };

  $l.isEmptyObject = obj => {
    if (Object.keys(obj).length === 0
        && JSON.stringify(obj) === JSON.stringify({})){
          return true;
        }
    return false;
  };


  $l.merge = (...objects) => {
    if (objects.length <= 1) return objects;
    const accum = objects[0];

    for (let i = 1; i < objects.length; i++){
      if ($l.isEmptyObject(objects[i])) continue;

      for (let j = 0; j < Object.keys(objects[i]).length; j++){
        let key = Object.keys(objects[i])[j];
        accum[key] = objects[i][key];
      }
    }

    return accum;
  };

  $l.isMatch = (el, selector) => {
  	const elProto = Element.prototype;
  	const func = elProto.matches ||
                 elProto.webkitMatchesSelector ||
                 elProto.msMatchesSelector;
  	return func.call(el, selector);
  };

  class DOMNodeCollection {
    constructor(array){
      for (let i = 0; i < array.length; i++) this[i] = array[i];
      this.length = array.length;
    }

    each(callback){
      for (let i = 0; i < this.length; i++){
        callback(this[i]);
      }
    }

    html(string){
      if (typeof string === "undefined"){
        return this[0].innerHTML;
      } else {
        this.each(el => el.innerHTML = string);
      }
    }

    empty(){
      this.html("");
    }

    append(item){
      const _setInner = html => this.each(el => el.innerHTML += html);

      if (item instanceof DOMNodeCollection){
        item.each(innerEl => _setInner(innerEl.outerHTML));
      } else if (item instanceof HTMLElement){
        _setInner(item.outerHTML);
      } else {
        _setInner(item);
      }
    }

    addClass(string){
      function _addClasses(el, str) {
        const classArr = string.split(" ");
        classArr.forEach(klass => el.classList.add(klass));
      }

      if (typeof string === "string") {
        this.each(el => _addClasses(el, string));
      }
    }

    removeClass(classes) {
      const _remove = (el, classes) => {
        classes.forEach(klass => el.classList.remove(klass));
      };

      if (typeof classes === "string") {
        classes = classes.split(" ");
        this.each(el => _remove(el, classes));

      } else if (classes === undefined) {
        this.each(el => _remove(el, el.classList));
      }
    }

    children(){
      const allChildren = [];

      this.each(el => {
        const elChildren = [].slice.call(el.children);
        allChildren.push(elChildren);
      });

      return new DOMNodeCollection(allChildren);
    }

    parent() {
      const allParents = [];

      this.each (el => {
        const elParent = el.parentNode;
        allParents.push(elParent);
      });

      return new DOMNodeCollection(allParents);
    }

    find(selector){
      if (!(typeof selector === "string")) return null;
      const list = [];

      this.each (el => {
        const elFound = [].slice.call(el.querySelectorAll(selector));
        list.push(elFound);
      });

      list.reduce((a, b) => a.concat(b));
      return new DOMNodeCollection(list);
    }

    on(eventType, ...targetListener) {
      let [delegatedListener] = targetListener;

      if (targetListener.length > 1) {
        let [target, listener] = targetListener;

        delegatedListener = (e, nodeEl) => {
          if ($l.isMatch(e.target, target)) listener(e);
        };
      }

      this.each (el => el.addEventListener(eventType, delegatedListener));
    }

    off(eventType, listener) {
      this.each (el => el.removeEventListener(eventType, listener));
    }

    convertAll(){
      for (let i = 0; i< Object.keys(this).length-1; i++){
        let key = Object.keys(this)[i];
        this[key] = $l(this[key]);
      }
    }

  //end Class DOMNodeCollection
  }

  window.$l = $l;

})();
