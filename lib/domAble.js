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

  class DOMNodeCollection {
    constructor(array){
      this.nodeEls = array;
    }

    html(string){
      if (typeof string === "undefined"){
        return this.nodeEls[0].innerHTML;
      }else {
        for (let i = 0; i < this.nodeEls.length; i++){
          this.nodeEls[i].innerHTML = string;
        }
      }
    }

    empty(){
      this.html("");
    }

    append(item){
      if (item instanceof DOMNodeCollection){
        for (let i = 0; i < this.nodeEls.length; i++){
          for (let j = 0; j < item.nodeEls.length; j++){
            this.nodeEls[i].innerHTML += item.nodeEls[j].outerHTML;
          }
        }
      } else if(item instanceof HTMLElement) {
        for (let i = 0; i < this.nodeEls.length; i++){
          this.nodeEls[i].innerHTML += item.outerHTML;
        }
      } else {
        for (let i = 0; i < this.nodeEls.length; i++){
          this.nodeEls[i].innerHTML += item;
        }
      }
    }

    addClass(string){
      function _addClasses(el, str) {
        const classArr = string.split(" ");
        classArr.forEach(klass => el.classList.add(klass));
      }

      if (typeof string === "string") {
        this.nodeEls.forEach (el => _addClasses(el, string));
      }
    }

    removeClass(string) {
      function _clearClasses(el) {
        while (el.classList.length > 0) {
          el.classList.remove(el.classList[0]);
        }
      }

      if (typeof string === "string" ) {
        this.nodeEls.forEach (el => el.classList.remove(string));
      } else if (string === undefined) {
        this.nodeEls.forEach (el => _clearClasses(el));
      }
    }

    children(){
      const allChildren = [];

      this.nodeEls.forEach (el => {
        const elChildren = [].slice.call(el.children);
        allChildren.push(elChildren);
      });
      allChildren.reduce((a, b) => a.concat(b));

      return new DOMNodeCollection(allChildren);
    }

    parent() {
      const allParents = [];

      this.nodeEls.forEach (el => {
        const elParent = el.parentNode;
        allParents.push(elParent);
      });

      return new DOMNodeCollection(allParents);
    }

    find(selector){
      if (!typeof selector === "string") return null;
      const list = [];

      this.nodeEls.forEach (el => {
        const elFound = [].slice.call(el.querySelectorAll(selector));
        list.push(elFound);
      });

      list.reduce((a, b) => a.concat(b));
      return new DOMNodeCollection(list[0]);
    }

    on(eventType, ...targetListener) {
      let [delegatedListener] = targetListener;

      if (targetListener.length > 1) {
        let [target, listener] = targetListener;

        delegatedListener = (e, nodeEl) => {
          if (_isMatch(e.target, target)){
            listener(e);
          }
        };
      }

      this.nodeEls.forEach (el => {
        el.addEventListener(eventType, delegatedListener);
      });
    }

    off(eventType, listener) {
      this.nodeEls.forEach (el => {
        el.removeEventListener(eventType, listener);
      });
    }

    _forEachNodeEl (callback){
      for (let i = 0; i < this.nodeEls.length; i++){
        callback(this.nodeEls[i]);
      }
    }

  //end Class DOMNodeCollection
  }


  function _isMatch(el, selector) {
	const p = Element.prototype;
	const f = p.matches || p.webkitMatchesSelector || p.msMatchesSelector;
	return f.call(el, selector);
  }

  window.$l = $l;

})();