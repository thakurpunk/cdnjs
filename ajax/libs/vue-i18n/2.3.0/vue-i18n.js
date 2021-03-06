/*!
 * vue-i18n v2.3.0
 * (c) 2015 kazuya kawaguchi
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-i18n"] = factory();
	else
		root["vue-i18n"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = install;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _extend = __webpack_require__(1);

	var _extend2 = _interopRequireDefault(_extend);

	/**
	 * install
	 *
	 * @param {Object} Vue
	 * @param {Object} opts
	 */

	function install(Vue) {
	  var opts = arguments.length <= 1 || arguments[1] === undefined ? { lang: 'en', locales: {} } : arguments[1];

	  defineConfig(Vue.config, opts.lang);
	  (0, _extend2['default'])(Vue, opts.locales);
	}

	/**
	 * defineConfig
	 *
	 * This function define `lang` property to `Vue.config`.
	 *
	 * @param {Object} config
	 * @param {String} lang
	 * @private
	 */

	function defineConfig(config, lang) {
	  Object.defineProperty(config, 'lang', {
	    get: function get() {
	      return lang;
	    },
	    set: function set(val) {
	      lang = val;
	    }
	  });
	}

	/**
	 * install automaticlly 
	 */

	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(install);
	}
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _format = __webpack_require__(2);

	var _format2 = _interopRequireDefault(_format);

	var _compare = __webpack_require__(3);

	var _compare2 = _interopRequireDefault(_compare);

	/**
	 * extend
	 * 
	 * @param {Vue} Vue
	 * @param {Object} locales
	 * @return {Vue}
	 */

	exports['default'] = function (Vue, locales) {
	  var getPath = Vue.version && (0, _compare2['default'])('1.0.8', Vue.version) === -1 ? Vue.parsers.path.getPath : Vue.parsers.path.get;
	  var util = Vue.util;

	  function getVal(key, lang, args) {
	    var value = key;
	    try {
	      var val = getPath(locales[lang], key) || locales[lang][key];
	      value = (args ? (0, _format2['default'])(val, args) : val) || key;
	    } catch (e) {
	      value = key;
	    }
	    return value;
	  }

	  /**
	   * $t
	   *
	   * @param {String} key
	   * @param {Array} ...args
	   * @return {String}
	   */

	  Vue.prototype.$t = function (key) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (!key) {
	      return '';
	    }

	    var language = Vue.config.lang;
	    if (args.length === 1) {
	      if (util.isObject(args[0]) || util.isArray(args[0])) {
	        args = args[0];
	      } else if (typeof args[0] === 'string') {
	        language = args[0];
	      }
	    } else if (args.length === 2) {
	      if (typeof args[0] === 'string') {
	        language = args[0];
	      }
	      if (util.isObject(args[1]) || util.isArray(args[1])) {
	        args = args[1];
	      }
	    }

	    return getVal(key, language, args);
	  };

	  return Vue;
	};

	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 *  String format template
	 *  - Inspired:  
	 *    https://github.com/Matt-Esch/string-template/index.js
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var RE_NARGS = /\{([0-9a-zA-Z]+)\}/g;

	/**
	 * template
	 *  
	 * @param {String} string
	 * @param {Array} ...args
	 * @return {String}
	 */

	exports['default'] = function (string) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  if (args.length === 1 && typeof args[0] === 'object') {
	    args = args[0];
	  }

	  if (!args || !args.hasOwnProperty) {
	    args = {};
	  }

	  return string.replace(RE_NARGS, function (match, i, index) {
	    var result = undefined;

	    if (string[index - 1] === '{' && string[index + match.length] === '}') {
	      return i;
	    } else {
	      result = args.hasOwnProperty(i) ? args[i] : null;
	      if (result === null || result === undefined) {
	        return '';
	      }

	      return result;
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Version compare
	 * - Inspired:
	 *   https://github.com/omichelsen/compare-versions
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var PATCH_PATTERN = /-([\w-.]+)/;

	function split(v) {
	  var temp = v.split('.');
	  var arr = temp.splice(0, 2);
	  arr.push(temp.join('.'));
	  return arr;
	}

	/**
	 * compare
	 *
	 * @param {String} v1
	 * @param {String} v2
	 * @return {Number}
	 */

	exports['default'] = function (v1, v2) {
	  var s1 = split(v1);
	  var s2 = split(v2);

	  for (var i = 0; i < 3; i++) {
	    var n1 = parseInt(s1[i] || 0, 10);
	    var n2 = parseInt(s2[i] || 0, 10);

	    if (n1 > n2) {
	      return 1;
	    }
	    if (n2 > n1) {
	      return -1;
	    }
	  }

	  if ((s1[2] + s2[2] + '').indexOf('-') > -1) {
	    var p1 = (PATCH_PATTERN.exec(s1[2]) || [''])[0];
	    var p2 = (PATCH_PATTERN.exec(s2[2]) || [''])[0];

	    if (p1 === '') {
	      return 1;
	    }
	    if (p2 === '') {
	      return -1;
	    }
	    if (p1 > p2) {
	      return 1;
	    }
	    if (p2 > p1) {
	      return -1;
	    }
	  }

	  return 0;
	};

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;