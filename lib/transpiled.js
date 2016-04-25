/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	;(function () {
	  var $l = function $l(param) {
	    if (typeof param === "string") {
	      var list = document.querySelectorAll(param);
	      list = [].slice.call(list);
	      return new DOMNodeCollection(list);
	    } else if (param instanceof HTMLElement) {
	      return new DOMNodeCollection([param]);
	    } else if (typeof param === "function") {
	      document.addEventListener("DOMContentLoaded", param);
	    }
	  };
	
	  $l.isEmptyObject = function (obj) {
	    if (Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({})) {
	      return true;
	    }
	    return false;
	  };
	
	  $l.merge = function () {
	    for (var _len = arguments.length, objects = Array(_len), _key = 0; _key < _len; _key++) {
	      objects[_key] = arguments[_key];
	    }
	
	    if (objects.length <= 1) return objects;
	    var accum = objects[0];
	
	    for (var i = 1; i < objects.length; i++) {
	      if ($l.isEmptyObject(objects[i])) continue;
	
	      for (var j = 0; j < Object.keys(objects[i]).length; j++) {
	        var key = Object.keys(objects[i])[j];
	        accum[key] = objects[i][key];
	      }
	    }
	
	    return accum;
	  };
	
	  var DOMNodeCollection = function () {
	    function DOMNodeCollection(array) {
	      _classCallCheck(this, DOMNodeCollection);
	
	      this.nodeEls = array;
	    }
	
	    _createClass(DOMNodeCollection, [{
	      key: "html",
	      value: function html(string) {
	        if (typeof string === "undefined") {
	          return this.nodeEls[0].innerHTML;
	        } else {
	          for (var i = 0; i < this.nodeEls.length; i++) {
	            this.nodeEls[i].innerHTML = string;
	          }
	        }
	      }
	    }, {
	      key: "empty",
	      value: function empty() {
	        this.html("");
	      }
	    }, {
	      key: "append",
	      value: function append(item) {
	        if (item instanceof DOMNodeCollection) {
	          for (var i = 0; i < this.nodeEls.length; i++) {
	            for (var j = 0; j < item.nodeEls.length; j++) {
	              this.nodeEls[i].innerHTML += item.nodeEls[j].outerHTML;
	            }
	          }
	        } else if (item instanceof HTMLElement) {
	          for (var _i = 0; _i < this.nodeEls.length; _i++) {
	            this.nodeEls[_i].innerHTML += item.outerHTML;
	          }
	        } else {
	          for (var _i2 = 0; _i2 < this.nodeEls.length; _i2++) {
	            this.nodeEls[_i2].innerHTML += item;
	          }
	        }
	      }
	    }, {
	      key: "addClass",
	      value: function addClass(string) {
	        function _addClasses(el, str) {
	          var classArr = string.split(" ");
	          classArr.forEach(function (klass) {
	            return el.classList.add(klass);
	          });
	        }
	
	        if (typeof string === "string") {
	          this.nodeEls.forEach(function (el) {
	            return _addClasses(el, string);
	          });
	        }
	      }
	    }, {
	      key: "removeClass",
	      value: function removeClass(string) {
	        function _clearClasses(el) {
	          while (el.classList.length > 0) {
	            el.classList.remove(el.classList[0]);
	          }
	        }
	
	        if (typeof string === "string") {
	          this.nodeEls.forEach(function (el) {
	            return el.classList.remove(string);
	          });
	        } else if (string === undefined) {
	          this.nodeEls.forEach(function (el) {
	            return _clearClasses(el);
	          });
	        }
	      }
	    }, {
	      key: "children",
	      value: function children() {
	        var allChildren = [];
	
	        this.nodeEls.forEach(function (el) {
	          var elChildren = [].slice.call(el.children);
	          allChildren.push(elChildren);
	        });
	        allChildren.reduce(function (a, b) {
	          return a.concat(b);
	        });
	
	        return new DOMNodeCollection(allChildren);
	      }
	    }, {
	      key: "parent",
	      value: function parent() {
	        var allParents = [];
	
	        this.nodeEls.forEach(function (el) {
	          var elParent = el.parentNode;
	          allParents.push(elParent);
	        });
	
	        return new DOMNodeCollection(allParents);
	      }
	    }, {
	      key: "find",
	      value: function find(selector) {
	        if (!(typeof selector === "undefined" ? "undefined" : _typeof(selector)) === "string") return null;
	        var list = [];
	
	        this.nodeEls.forEach(function (el) {
	          var elFound = [].slice.call(el.querySelectorAll(selector));
	          list.push(elFound);
	        });
	
	        list.reduce(function (a, b) {
	          return a.concat(b);
	        });
	        return new DOMNodeCollection(list[0]);
	      }
	    }, {
	      key: "on",
	      value: function on(eventType) {
	        for (var _len2 = arguments.length, targetListener = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          targetListener[_key2 - 1] = arguments[_key2];
	        }
	
	        var delegatedListener = targetListener[0];
	
	
	        if (targetListener.length > 1) {
	          (function () {
	            var target = targetListener[0];
	            var listener = targetListener[1];
	
	
	            delegatedListener = function delegatedListener(e, nodeEl) {
	              if (_isMatch(e.target, target)) {
	                listener(e);
	              }
	            };
	          })();
	        }
	
	        this.nodeEls.forEach(function (el) {
	          el.addEventListener(eventType, delegatedListener);
	        });
	      }
	    }, {
	      key: "off",
	      value: function off(eventType, listener) {
	        this.nodeEls.forEach(function (el) {
	          el.removeEventListener(eventType, listener);
	        });
	      }
	    }, {
	      key: "_forEachNodeEl",
	      value: function _forEachNodeEl(callback) {
	        for (var i = 0; i < this.nodeEls.length; i++) {
	          callback(this.nodeEls[i]);
	        }
	      }
	
	      //end Class DOMNodeCollection
	
	    }]);
	
	    return DOMNodeCollection;
	  }();
	
	  function _isMatch(el, selector) {
	    var p = Element.prototype;
	    var f = p.matches || p.webkitMatchesSelector || p.msMatchesSelector;
	    return f.call(el, selector);
	  }
	
	  window.$l = $l;
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=transpiled.js.map