/******/ (function(modules) { // webpackBootstrap
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

	var _keys = __webpack_require__(1);

	var _keys2 = _interopRequireDefault(_keys);

	var _promise = __webpack_require__(36);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator2 = __webpack_require__(70);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _extends2 = __webpack_require__(71);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(78);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	var _common = __webpack_require__(79);

	var _messaging = __webpack_require__(105);

	var _cssOff = __webpack_require__(106);

	var _cssOff2 = _interopRequireDefault(_cssOff);

	var _cssOffSmall = __webpack_require__(107);

	var _cssOffSmall2 = _interopRequireDefault(_cssOffSmall);

	var _cssOn = __webpack_require__(108);

	var _cssOn2 = _interopRequireDefault(_cssOn);

	var _cssOnSmall = __webpack_require__(109);

	var _cssOnSmall2 = _interopRequireDefault(_cssOnSmall);

	var _helpers = __webpack_require__(110);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}

	var _sendMessage = (0, _helpers.apiToPromise)(chrome.tabs.sendMessage); /*
	                                                                        
	                                                                        	RES is released under the GPL. However, I do ask a favor (obviously I don't/can't require it, I ask out of courtesy):
	                                                                        
	                                                                        	Because RES auto updates and is hosted from a central server, I humbly request that if you intend to distribute your own
	                                                                        	modified Reddit Enhancement Suite, you name it something else and make it very clear to your users that it's your own
	                                                                        	branch and isn't related to mine.
	                                                                        
	                                                                        	RES is updated very frequently, and I get lots of tech support questions/requests from people on outdated versions. If
	                                                                        	you're distributing RES via your own means, those recipients won't always be on the latest and greatest, which makes
	                                                                        	it harder for me to debug things and understand (at least with browsers that auto-update) whether or not people are on
	                                                                        	a current version of RES.
	                                                                        
	                                                                        	I can't legally hold you to any of this - I'm just asking out of courtesy.
	                                                                        
	                                                                        	Thanks, I appreciate your consideration.  Without further ado, the all-important GPL Statement:
	                                                                        
	                                                                        	This program is free software: you can redistribute it and/or modify
	                                                                        	it under the terms of the GNU General Public License as published by
	                                                                        	the Free Software Foundation, either version 3 of the License, or
	                                                                        	(at your option) any later version.
	                                                                        
	                                                                        	This program is distributed in the hope that it will be useful,
	                                                                        	but WITHOUT ANY WARRANTY; without even the implied warranty of
	                                                                        	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	                                                                        	GNU General Public License for more details.
	                                                                        
	                                                                        	You should have received a copy of the GNU General Public License
	                                                                        	along with this program.  If not, see <http://www.gnu.org/licenses/>.
	                                                                        
	                                                                        */

	/* eslint-env webextensions */

	var _createMessageHandler = (0, _messaging.createMessageHandler)((type, _ref17, _ref18) => {
		var transaction = _ref17.transaction;
		var isResponse = _ref17.isResponse;
		var obj = (0, _objectWithoutProperties3.default)(_ref17, ['transaction', 'isResponse']);
		var sendResponse = _ref18.sendResponse;
		var tabId = _ref18.tabId;

		if (isResponse) {
			sendResponse(obj);
		} else {
			_sendMessage(tabId, (0, _extends3.default)({}, obj, { type })).then(obj => {
				_handleMessage(type, (0, _extends3.default)({}, obj, { transaction, isResponse: true }));
			});
		}
	});

	var _handleMessage = _createMessageHandler._handleMessage;
	var sendMessage = _createMessageHandler.sendMessage;
	var addListener = _createMessageHandler.addListener;

	chrome.runtime.onMessage.addListener((_ref, sender, sendResponse) => {
		var type = _ref.type;
		var obj = (0, _objectWithoutProperties3.default)(_ref, ['type']);
		return _handleMessage(type, obj, (0, _extends3.default)({}, sender.tab, { sendResponse }));
	});

	// Listeners

	(0, _common.addCommonBackgroundListeners)(addListener);

	addListener('ajax', (() => {
		var _ref3 = (0, _asyncToGenerator3.default)(function* (_ref2) {
			var method = _ref2.method;
			var url = _ref2.url;
			var headers = _ref2.headers;
			var data = _ref2.data;
			var credentials = _ref2.credentials;

			var request = new XMLHttpRequest();

			var load = _promise2.default.race([new _promise2.default(function (resolve) {
				return request.onload = resolve;
			}), new _promise2.default(function (resolve) {
				return request.onerror = resolve;
			}).then(function () {
				throw new Error(`XHR error - url: ${ url }`);
			})]);

			request.open(method, url, true);

			for (var name in headers) {
				request.setRequestHeader(name, headers[name]);
			}

			if (credentials) {
				request.withCredentials = true;
			}

			request.send(data);

			yield load;

			// Only store `status`, `responseText` and `responseURL` fields
			return {
				status: request.status,
				responseText: request.responseText,
				responseURL: request.responseURL
			};
		});

		return function (_x) {
			return _ref3.apply(this, arguments);
		};
	})());

	addListener('permissions', _ref4 => {
		var operation = _ref4.operation;
		var permissions = _ref4.permissions;
		var origins = _ref4.origins;

		switch (operation) {
			case 'contains':
				return (0, _helpers.apiToPromise)(chrome.permissions.contains)({ permissions, origins });
			case 'request':
				return (0, _helpers.apiToPromise)(chrome.permissions.request)({ permissions, origins });
			case 'remove':
				return (0, _helpers.apiToPromise)(chrome.permissions.remove)({ permissions, origins });
			default:
				throw new Error(`Invalid permissions operation: ${ operation }`);
		}
	});

	(0, _asyncToGenerator3.default)(function* () {
		var _context;

		var _set = (0, _helpers.apiToPromise)((_context = chrome.storage.local).set.bind(_context));
		var set = function (key, value) {
			return _set({ [key]: value });
		};

		var MIGRATED_TO_CHROME_STORAGE = 'MIGRATED_TO_CHROME_STORAGE';

		if (localStorage.getItem(MIGRATED_TO_CHROME_STORAGE) !== MIGRATED_TO_CHROME_STORAGE) {
			yield _promise2.default.all((0, _keys2.default)(localStorage).map((() => {
				var _ref6 = (0, _asyncToGenerator3.default)(function* (key) {
					try {
						yield set(key, JSON.parse(localStorage.getItem(key)));
						console.log(key);
					} catch (e) {
						yield set(key, localStorage.getItem(key));
						console.warn(key);
					}
				});

				return function (_x2) {
					return _ref6.apply(this, arguments);
				};
			})()));
			localStorage.setItem(MIGRATED_TO_CHROME_STORAGE, MIGRATED_TO_CHROME_STORAGE);
		}
	})();

	addListener('deleteCookies', cookies => cookies.forEach(_ref7 => {
		var url = _ref7.url;
		var name = _ref7.name;
		return chrome.cookies.remove({ url, name });
	}));

	addListener('openNewTabs', (_ref8, _ref9) => {
		var urls = _ref8.urls;
		var focusIndex = _ref8.focusIndex;
		var tabId = _ref9.id;
		var currentIndex = _ref9.index;

		urls.forEach((url, i) => chrome.tabs.create({
			url,
			selected: i === focusIndex,
			index: ++currentIndex,
			openerTabId: tabId
		}));
	});

	addListener('addURLToHistory', url => {
		chrome.history.addUrl({ url });
	});

	addListener('isURLVisited', (() => {
		var _ref10 = (0, _asyncToGenerator3.default)(function* (url) {
			return (yield (0, _helpers.apiToPromise)(chrome.history.getVisits)({ url })).length > 0;
		});

		return function (_x3) {
			return _ref10.apply(this, arguments);
		};
	})());

	chrome.pageAction.onClicked.addListener(_ref11 => {
		var tabId = _ref11.id;
		return sendMessage('pageActionClick', undefined, { tabId });
	});

	addListener('pageAction', (_ref12, _ref13) => {
		var operation = _ref12.operation;
		var state = _ref12.state;
		var tabId = _ref13.id;

		switch (operation) {
			case 'show':
				chrome.pageAction.show(tabId);
				chrome.pageAction.setIcon({
					tabId,
					path: {
						19: state ? _cssOnSmall2.default : _cssOffSmall2.default,
						38: state ? _cssOn2.default : _cssOff2.default
					}
				});
				break;
			case 'hide':
			case 'destroy':
				chrome.pageAction.hide(tabId);
				break;
			default:
				throw new Error(`Invalid pageAction operation: ${ operation }`);
		}
	});

	addListener('multicast', (() => {
		var _ref15 = (0, _asyncToGenerator3.default)(function* (request, _ref14) {
			var tabId = _ref14.id;
			var incognito = _ref14.incognito;
			return _promise2.default.all((yield (0, _helpers.apiToPromise)(chrome.tabs.query)({ url: '*://*.reddit.com/*', status: 'complete' })).filter(function (tab) {
				return tab.id !== tabId && tab.incognito === incognito;
			}).map(function (_ref16) {
				var tabId = _ref16.id;
				return sendMessage('multicast', request, { tabId });
			}));
		});

		return function (_x4, _x5) {
			return _ref15.apply(this, arguments);
		};
	})());

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(2),__esModule:true};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);module.exports=__webpack_require__(23).Object.keys;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject=__webpack_require__(4),$keys=__webpack_require__(6);__webpack_require__(21)('keys',function(){return function keys(it){return $keys(toObject(it));};});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined=__webpack_require__(5);module.exports=function(it){return Object(defined(it));};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports=function(it){if(it==undefined)throw TypeError("Can't call method on  "+it);return it;};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys=__webpack_require__(7),enumBugKeys=__webpack_require__(20);module.exports=Object.keys||function keys(O){return $keys(O,enumBugKeys);};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var has=__webpack_require__(8),toIObject=__webpack_require__(9),arrayIndexOf=__webpack_require__(12)(false),IE_PROTO=__webpack_require__(16)('IE_PROTO');module.exports=function(object,names){var O=toIObject(object),i=0,result=[],key;for(key in O)if(key!=IE_PROTO)has(O,key)&&result.push(key);// Don't enum bug & hidden keys
		while(names.length>i)if(has(O,key=names[i++])){~arrayIndexOf(result,key)||result.push(key);}return result;};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var hasOwnProperty={}.hasOwnProperty;module.exports=function(it,key){return hasOwnProperty.call(it,key);};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject=__webpack_require__(10),defined=__webpack_require__(5);module.exports=function(it){return IObject(defined(it));};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof=__webpack_require__(11);module.exports=Object('z').propertyIsEnumerable(0)?Object:function(it){return cof(it)=='String'?it.split(''):Object(it);};

/***/ },
/* 11 */
/***/ function(module, exports) {

	var toString={}.toString;module.exports=function(it){return toString.call(it).slice(8,-1);};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject=__webpack_require__(9),toLength=__webpack_require__(13),toIndex=__webpack_require__(15);module.exports=function(IS_INCLUDES){return function($this,el,fromIndex){var O=toIObject($this),length=toLength(O.length),index=toIndex(fromIndex,length),value;// Array#includes uses SameValueZero equality algorithm
	if(IS_INCLUDES&&el!=el)while(length>index){value=O[index++];if(value!=value)return true;// Array#toIndex ignores holes, Array#includes - not
		}else for(;length>index;index++)if(IS_INCLUDES||index in O){if(O[index]===el)return IS_INCLUDES||index||0;}return!IS_INCLUDES&&-1;};};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger=__webpack_require__(14),min=Math.min;module.exports=function(it){return it>0?min(toInteger(it),0x1fffffffffffff):0;// pow(2, 53) - 1 == 9007199254740991
		};

/***/ },
/* 14 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil=Math.ceil,floor=Math.floor;module.exports=function(it){return isNaN(it=+it)?0:(it>0?floor:ceil)(it);};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger=__webpack_require__(14),max=Math.max,min=Math.min;module.exports=function(index,length){index=toInteger(index);return index<0?max(index+length,0):min(index,length);};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var shared=__webpack_require__(17)('keys'),uid=__webpack_require__(19);module.exports=function(key){return shared[key]||(shared[key]=uid(key));};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__(18),SHARED='__core-js_shared__',store=global[SHARED]||(global[SHARED]={});module.exports=function(key){return store[key]||(store[key]={});};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global=module.exports=typeof window!='undefined'&&window.Math==Math?window:typeof self!='undefined'&&self.Math==Math?self:Function('return this')();if(typeof __g=='number')__g=global;// eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports) {

	var id=0,px=Math.random();module.exports=function(key){return'Symbol('.concat(key===undefined?'':key,')_',(++id+px).toString(36));};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports='constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export=__webpack_require__(22),core=__webpack_require__(23),fails=__webpack_require__(32);module.exports=function(KEY,exec){var fn=(core.Object||{})[KEY]||Object[KEY],exp={};exp[KEY]=exec(fn);$export($export.S+$export.F*fails(function(){fn(1);}),'Object',exp);};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__(18),core=__webpack_require__(23),ctx=__webpack_require__(24),hide=__webpack_require__(26),PROTOTYPE='prototype';var $export=function(type,name,source){var IS_FORCED=type&$export.F,IS_GLOBAL=type&$export.G,IS_STATIC=type&$export.S,IS_PROTO=type&$export.P,IS_BIND=type&$export.B,IS_WRAP=type&$export.W,exports=IS_GLOBAL?core:core[name]||(core[name]={}),expProto=exports[PROTOTYPE],target=IS_GLOBAL?global:IS_STATIC?global[name]:(global[name]||{})[PROTOTYPE],key,own,out;if(IS_GLOBAL)source=name;for(key in source){// contains in native
	own=!IS_FORCED&&target&&target[key]!==undefined;if(own&&key in exports)continue;// export native or passed
	out=own?target[key]:source[key];// prevent global pollution for namespaces
	exports[key]=IS_GLOBAL&&typeof target[key]!='function'?source[key]// bind timers to global for call from export context
	:IS_BIND&&own?ctx(out,global)// wrap global constructors for prevent change them in library
	:IS_WRAP&&target[key]==out?function(C){var F=function(a,b,c){if(this instanceof C){switch(arguments.length){case 0:return new C();case 1:return new C(a);case 2:return new C(a,b);}return new C(a,b,c);}return C.apply(this,arguments);};F[PROTOTYPE]=C[PROTOTYPE];return F;// make static versions for prototype methods
	}(out):IS_PROTO&&typeof out=='function'?ctx(Function.call,out):out;// export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	if(IS_PROTO){(exports.virtual||(exports.virtual={}))[key]=out;// export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	if(type&$export.R&&expProto&&!expProto[key])hide(expProto,key,out);}}};// type bitmap
	$export.F=1;// forced
	$export.G=2;// global
	$export.S=4;// static
	$export.P=8;// proto
	$export.B=16;// bind
	$export.W=32;// wrap
	$export.U=64;// safe
	$export.R=128;// real proto method for `library` 
	module.exports=$export;

/***/ },
/* 23 */
/***/ function(module, exports) {

	var core=module.exports={version:'2.4.0'};if(typeof __e=='number')__e=core;// eslint-disable-line no-undef

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction=__webpack_require__(25);module.exports=function(fn,that,length){aFunction(fn);if(that===undefined)return fn;switch(length){case 1:return function(a){return fn.call(that,a);};case 2:return function(a,b){return fn.call(that,a,b);};case 3:return function(a,b,c){return fn.call(that,a,b,c);};}return function()/* ...args */{return fn.apply(that,arguments);};};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports=function(it){if(typeof it!='function')throw TypeError(it+' is not a function!');return it;};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var dP=__webpack_require__(27),createDesc=__webpack_require__(35);module.exports=__webpack_require__(31)?function(object,key,value){return dP.f(object,key,createDesc(1,value));}:function(object,key,value){object[key]=value;return object;};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__(28),IE8_DOM_DEFINE=__webpack_require__(30),toPrimitive=__webpack_require__(34),dP=Object.defineProperty;exports.f=__webpack_require__(31)?Object.defineProperty:function defineProperty(O,P,Attributes){anObject(O);P=toPrimitive(P,true);anObject(Attributes);if(IE8_DOM_DEFINE)try{return dP(O,P,Attributes);}catch(e){/* empty */}if('get'in Attributes||'set'in Attributes)throw TypeError('Accessors not supported!');if('value'in Attributes)O[P]=Attributes.value;return O;};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__(29);module.exports=function(it){if(!isObject(it))throw TypeError(it+' is not an object!');return it;};

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports=function(it){return typeof it==='object'?it!==null:typeof it==='function';};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports=!__webpack_require__(31)&&!__webpack_require__(32)(function(){return Object.defineProperty(__webpack_require__(33)('div'),'a',{get:function(){return 7;}}).a!=7;});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports=!__webpack_require__(32)(function(){return Object.defineProperty({},'a',{get:function(){return 7;}}).a!=7;});

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports=function(exec){try{return!!exec();}catch(e){return true;}};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__(29),document=__webpack_require__(18).document// in old IE typeof document.createElement is 'object'
		,is=isObject(document)&&isObject(document.createElement);module.exports=function(it){return is?document.createElement(it):{};};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject=__webpack_require__(29);// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports=function(it,S){if(!isObject(it))return it;var fn,val;if(S&&typeof(fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;if(typeof(fn=it.valueOf)=='function'&&!isObject(val=fn.call(it)))return val;if(!S&&typeof(fn=it.toString)=='function'&&!isObject(val=fn.call(it)))return val;throw TypeError("Can't convert object to primitive value");};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports=function(bitmap,value){return{enumerable:!(bitmap&1),configurable:!(bitmap&2),writable:!(bitmap&4),value:value};};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(37),__esModule:true};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);__webpack_require__(39);__webpack_require__(52);__webpack_require__(56);module.exports=__webpack_require__(23).Promise;

/***/ },
/* 38 */
/***/ function(module, exports) {

	

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var $at=__webpack_require__(40)(true);// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(41)(String,'String',function(iterated){this._t=String(iterated);// target
	this._i=0;// next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	},function(){var O=this._t,index=this._i,point;if(index>=O.length)return{value:undefined,done:true};point=$at(O,index);this._i+=point.length;return{value:point,done:false};});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger=__webpack_require__(14),defined=__webpack_require__(5);// true  -> String#at
	// false -> String#codePointAt
	module.exports=function(TO_STRING){return function(that,pos){var s=String(defined(that)),i=toInteger(pos),l=s.length,a,b;if(i<0||i>=l)return TO_STRING?'':undefined;a=s.charCodeAt(i);return a<0xd800||a>0xdbff||i+1===l||(b=s.charCodeAt(i+1))<0xdc00||b>0xdfff?TO_STRING?s.charAt(i):a:TO_STRING?s.slice(i,i+2):(a-0xd800<<10)+(b-0xdc00)+0x10000;};};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var LIBRARY=__webpack_require__(42),$export=__webpack_require__(22),redefine=__webpack_require__(43),hide=__webpack_require__(26),has=__webpack_require__(8),Iterators=__webpack_require__(44),$iterCreate=__webpack_require__(45),setToStringTag=__webpack_require__(49),getPrototypeOf=__webpack_require__(51),ITERATOR=__webpack_require__(50)('iterator'),BUGGY=!([].keys&&'next'in[].keys())// Safari has buggy iterators w/o `next`
	,FF_ITERATOR='@@iterator',KEYS='keys',VALUES='values';var returnThis=function(){return this;};module.exports=function(Base,NAME,Constructor,next,DEFAULT,IS_SET,FORCED){$iterCreate(Constructor,NAME,next);var getMethod=function(kind){if(!BUGGY&&kind in proto)return proto[kind];switch(kind){case KEYS:return function keys(){return new Constructor(this,kind);};case VALUES:return function values(){return new Constructor(this,kind);};}return function entries(){return new Constructor(this,kind);};};var TAG=NAME+' Iterator',DEF_VALUES=DEFAULT==VALUES,VALUES_BUG=false,proto=Base.prototype,$native=proto[ITERATOR]||proto[FF_ITERATOR]||DEFAULT&&proto[DEFAULT],$default=$native||getMethod(DEFAULT),$entries=DEFAULT?!DEF_VALUES?$default:getMethod('entries'):undefined,$anyNative=NAME=='Array'?proto.entries||$native:$native,methods,key,IteratorPrototype;// Fix native
	if($anyNative){IteratorPrototype=getPrototypeOf($anyNative.call(new Base()));if(IteratorPrototype!==Object.prototype){// Set @@toStringTag to native iterators
	setToStringTag(IteratorPrototype,TAG,true);// fix for some old engines
	if(!LIBRARY&&!has(IteratorPrototype,ITERATOR))hide(IteratorPrototype,ITERATOR,returnThis);}}// fix Array#{values, @@iterator}.name in V8 / FF
	if(DEF_VALUES&&$native&&$native.name!==VALUES){VALUES_BUG=true;$default=function values(){return $native.call(this);};}// Define iterator
	if((!LIBRARY||FORCED)&&(BUGGY||VALUES_BUG||!proto[ITERATOR])){hide(proto,ITERATOR,$default);}// Plug for library
		Iterators[NAME]=$default;Iterators[TAG]=returnThis;if(DEFAULT){methods={values:DEF_VALUES?$default:getMethod(VALUES),keys:IS_SET?$default:getMethod(KEYS),entries:$entries};if(FORCED)for(key in methods){if(!(key in proto))redefine(proto,key,methods[key]);}else $export($export.P+$export.F*(BUGGY||VALUES_BUG),NAME,methods);}return methods;};

/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports=true;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__(26);

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports={};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var create=__webpack_require__(46),descriptor=__webpack_require__(35),setToStringTag=__webpack_require__(49),IteratorPrototype={};// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
		__webpack_require__(26)(IteratorPrototype,__webpack_require__(50)('iterator'),function(){return this;});module.exports=function(Constructor,NAME,next){Constructor.prototype=create(IteratorPrototype,{next:descriptor(1,next)});setToStringTag(Constructor,NAME+' Iterator');};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject=__webpack_require__(28),dPs=__webpack_require__(47),enumBugKeys=__webpack_require__(20),IE_PROTO=__webpack_require__(16)('IE_PROTO'),Empty=function(){/* empty */},PROTOTYPE='prototype';// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict=function(){// Thrash, waste and sodomy: IE GC bug
	var iframe=__webpack_require__(33)('iframe'),i=enumBugKeys.length,lt='<',gt='>',iframeDocument;iframe.style.display='none';__webpack_require__(48).appendChild(iframe);iframe.src='javascript:';// eslint-disable-line no-script-url
	// createDict = iframe.contentWindow.Object;
	// html.removeChild(iframe);
	iframeDocument=iframe.contentWindow.document;iframeDocument.open();iframeDocument.write(lt+'script'+gt+'document.F=Object'+lt+'/script'+gt);iframeDocument.close();createDict=iframeDocument.F;while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];return createDict();};module.exports=Object.create||function create(O,Properties){var result;if(O!==null){Empty[PROTOTYPE]=anObject(O);result=new Empty();Empty[PROTOTYPE]=null;// add "__proto__" for Object.getPrototypeOf polyfill
		result[IE_PROTO]=O;}else result=createDict();return Properties===undefined?result:dPs(result,Properties);};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var dP=__webpack_require__(27),anObject=__webpack_require__(28),getKeys=__webpack_require__(6);module.exports=__webpack_require__(31)?Object.defineProperties:function defineProperties(O,Properties){anObject(O);var keys=getKeys(Properties),length=keys.length,i=0,P;while(length>i)dP.f(O,P=keys[i++],Properties[P]);return O;};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__(18).document&&document.documentElement;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var def=__webpack_require__(27).f,has=__webpack_require__(8),TAG=__webpack_require__(50)('toStringTag');module.exports=function(it,tag,stat){if(it&&!has(it=stat?it:it.prototype,TAG))def(it,TAG,{configurable:true,value:tag});};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var store=__webpack_require__(17)('wks'),uid=__webpack_require__(19),Symbol=__webpack_require__(18).Symbol,USE_SYMBOL=typeof Symbol=='function';var $exports=module.exports=function(name){return store[name]||(store[name]=USE_SYMBOL&&Symbol[name]||(USE_SYMBOL?Symbol:uid)('Symbol.'+name));};$exports.store=store;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has=__webpack_require__(8),toObject=__webpack_require__(4),IE_PROTO=__webpack_require__(16)('IE_PROTO'),ObjectProto=Object.prototype;module.exports=Object.getPrototypeOf||function(O){O=toObject(O);if(has(O,IE_PROTO))return O[IE_PROTO];if(typeof O.constructor=='function'&&O instanceof O.constructor){return O.constructor.prototype;}return O instanceof Object?ObjectProto:null;};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);var global=__webpack_require__(18),hide=__webpack_require__(26),Iterators=__webpack_require__(44),TO_STRING_TAG=__webpack_require__(50)('toStringTag');for(var collections=['NodeList','DOMTokenList','MediaList','StyleSheetList','CSSRuleList'],i=0;i<5;i++){var NAME=collections[i],Collection=global[NAME],proto=Collection&&Collection.prototype;if(proto&&!proto[TO_STRING_TAG])hide(proto,TO_STRING_TAG,NAME);Iterators[NAME]=Iterators.Array;}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var addToUnscopables=__webpack_require__(54),step=__webpack_require__(55),Iterators=__webpack_require__(44),toIObject=__webpack_require__(9);// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports=__webpack_require__(41)(Array,'Array',function(iterated,kind){this._t=toIObject(iterated);// target
	this._i=0;// next index
	this._k=kind;// kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	},function(){var O=this._t,kind=this._k,index=this._i++;if(!O||index>=O.length){this._t=undefined;return step(1);}if(kind=='keys')return step(0,index);if(kind=='values')return step(0,O[index]);return step(0,[index,O[index]]);},'values');// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
		Iterators.Arguments=Iterators.Array;addToUnscopables('keys');addToUnscopables('values');addToUnscopables('entries');

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports=function(){/* empty */};

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports=function(done,value){return{value:value,done:!!done};};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var LIBRARY=__webpack_require__(42),global=__webpack_require__(18),ctx=__webpack_require__(24),classof=__webpack_require__(57),$export=__webpack_require__(22),isObject=__webpack_require__(29),aFunction=__webpack_require__(25),anInstance=__webpack_require__(58),forOf=__webpack_require__(59),speciesConstructor=__webpack_require__(63),task=__webpack_require__(64).set,microtask=__webpack_require__(66)(),PROMISE='Promise',TypeError=global.TypeError,process=global.process,$Promise=global[PROMISE],process=global.process,isNode=classof(process)=='process',empty=function(){/* empty */},Internal,GenericPromiseCapability,Wrapper;var USE_NATIVE=!!function(){try{// correct subclassing with @@species support
	var promise=$Promise.resolve(1),FakePromise=(promise.constructor={})[__webpack_require__(50)('species')]=function(exec){exec(empty,empty);};// unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	return(isNode||typeof PromiseRejectionEvent=='function')&&promise.then(empty)instanceof FakePromise;}catch(e){/* empty */}}();// helpers
	var sameConstructor=function(a,b){// with library wrapper special case
	return a===b||a===$Promise&&b===Wrapper;};var isThenable=function(it){var then;return isObject(it)&&typeof(then=it.then)=='function'?then:false;};var newPromiseCapability=function(C){return sameConstructor($Promise,C)?new PromiseCapability(C):new GenericPromiseCapability(C);};var PromiseCapability=GenericPromiseCapability=function(C){var resolve,reject;this.promise=new C(function($$resolve,$$reject){if(resolve!==undefined||reject!==undefined)throw TypeError('Bad Promise constructor');resolve=$$resolve;reject=$$reject;});this.resolve=aFunction(resolve);this.reject=aFunction(reject);};var perform=function(exec){try{exec();}catch(e){return{error:e};}};var notify=function(promise,isReject){if(promise._n)return;promise._n=true;var chain=promise._c;microtask(function(){var value=promise._v,ok=promise._s==1,i=0;var run=function(reaction){var handler=ok?reaction.ok:reaction.fail,resolve=reaction.resolve,reject=reaction.reject,domain=reaction.domain,result,then;try{if(handler){if(!ok){if(promise._h==2)onHandleUnhandled(promise);promise._h=1;}if(handler===true)result=value;else{if(domain)domain.enter();result=handler(value);if(domain)domain.exit();}if(result===reaction.promise){reject(TypeError('Promise-chain cycle'));}else if(then=isThenable(result)){then.call(result,resolve,reject);}else resolve(result);}else reject(value);}catch(e){reject(e);}};while(chain.length>i)run(chain[i++]);// variable length - can't use forEach
	promise._c=[];promise._n=false;if(isReject&&!promise._h)onUnhandled(promise);});};var onUnhandled=function(promise){task.call(global,function(){var value=promise._v,abrupt,handler,console;if(isUnhandled(promise)){abrupt=perform(function(){if(isNode){process.emit('unhandledRejection',value,promise);}else if(handler=global.onunhandledrejection){handler({promise:promise,reason:value});}else if((console=global.console)&&console.error){console.error('Unhandled promise rejection',value);}});// Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	promise._h=isNode||isUnhandled(promise)?2:1;}promise._a=undefined;if(abrupt)throw abrupt.error;});};var isUnhandled=function(promise){if(promise._h==1)return false;var chain=promise._a||promise._c,i=0,reaction;while(chain.length>i){reaction=chain[i++];if(reaction.fail||!isUnhandled(reaction.promise))return false;}return true;};var onHandleUnhandled=function(promise){task.call(global,function(){var handler;if(isNode){process.emit('rejectionHandled',promise);}else if(handler=global.onrejectionhandled){handler({promise:promise,reason:promise._v});}});};var $reject=function(value){var promise=this;if(promise._d)return;promise._d=true;promise=promise._w||promise;// unwrap
	promise._v=value;promise._s=2;if(!promise._a)promise._a=promise._c.slice();notify(promise,true);};var $resolve=function(value){var promise=this,then;if(promise._d)return;promise._d=true;promise=promise._w||promise;// unwrap
	try{if(promise===value)throw TypeError("Promise can't be resolved itself");if(then=isThenable(value)){microtask(function(){var wrapper={_w:promise,_d:false};// wrap
	try{then.call(value,ctx($resolve,wrapper,1),ctx($reject,wrapper,1));}catch(e){$reject.call(wrapper,e);}});}else{promise._v=value;promise._s=1;notify(promise,false);}}catch(e){$reject.call({_w:promise,_d:false},e);// wrap
	}};// constructor polyfill
	if(!USE_NATIVE){// 25.4.3.1 Promise(executor)
	$Promise=function Promise(executor){anInstance(this,$Promise,PROMISE,'_h');aFunction(executor);Internal.call(this);try{executor(ctx($resolve,this,1),ctx($reject,this,1));}catch(err){$reject.call(this,err);}};Internal=function Promise(executor){this._c=[];// <- awaiting reactions
	this._a=undefined;// <- checked in isUnhandled reactions
	this._s=0;// <- state
	this._d=false;// <- done
	this._v=undefined;// <- value
	this._h=0;// <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	this._n=false;// <- notify
	};Internal.prototype=__webpack_require__(67)($Promise.prototype,{// 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	then:function then(onFulfilled,onRejected){var reaction=newPromiseCapability(speciesConstructor(this,$Promise));reaction.ok=typeof onFulfilled=='function'?onFulfilled:true;reaction.fail=typeof onRejected=='function'&&onRejected;reaction.domain=isNode?process.domain:undefined;this._c.push(reaction);if(this._a)this._a.push(reaction);if(this._s)notify(this,false);return reaction.promise;},// 25.4.5.1 Promise.prototype.catch(onRejected)
	'catch':function(onRejected){return this.then(undefined,onRejected);}});PromiseCapability=function(){var promise=new Internal();this.promise=promise;this.resolve=ctx($resolve,promise,1);this.reject=ctx($reject,promise,1);};}$export($export.G+$export.W+$export.F*!USE_NATIVE,{Promise:$Promise});__webpack_require__(49)($Promise,PROMISE);__webpack_require__(68)(PROMISE);Wrapper=__webpack_require__(23)[PROMISE];// statics
	$export($export.S+$export.F*!USE_NATIVE,PROMISE,{// 25.4.4.5 Promise.reject(r)
	reject:function reject(r){var capability=newPromiseCapability(this),$$reject=capability.reject;$$reject(r);return capability.promise;}});$export($export.S+$export.F*(LIBRARY||!USE_NATIVE),PROMISE,{// 25.4.4.6 Promise.resolve(x)
	resolve:function resolve(x){// instanceof instead of internal slot check because we should fix it without replacement native Promise core
	if(x instanceof $Promise&&sameConstructor(x.constructor,this))return x;var capability=newPromiseCapability(this),$$resolve=capability.resolve;$$resolve(x);return capability.promise;}});$export($export.S+$export.F*!(USE_NATIVE&&__webpack_require__(69)(function(iter){$Promise.all(iter)['catch'](empty);})),PROMISE,{// 25.4.4.1 Promise.all(iterable)
	all:function all(iterable){var C=this,capability=newPromiseCapability(C),resolve=capability.resolve,reject=capability.reject;var abrupt=perform(function(){var values=[],index=0,remaining=1;forOf(iterable,false,function(promise){var $index=index++,alreadyCalled=false;values.push(undefined);remaining++;C.resolve(promise).then(function(value){if(alreadyCalled)return;alreadyCalled=true;values[$index]=value;--remaining||resolve(values);},reject);});--remaining||resolve(values);});if(abrupt)reject(abrupt.error);return capability.promise;},// 25.4.4.4 Promise.race(iterable)
		race:function race(iterable){var C=this,capability=newPromiseCapability(C),reject=capability.reject;var abrupt=perform(function(){forOf(iterable,false,function(promise){C.resolve(promise).then(capability.resolve,reject);});});if(abrupt)reject(abrupt.error);return capability.promise;}});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof=__webpack_require__(11),TAG=__webpack_require__(50)('toStringTag')// ES3 wrong here
	,ARG=cof(function(){return arguments;}())=='Arguments';// fallback for IE11 Script Access Denied error
	var tryGet=function(it,key){try{return it[key];}catch(e){/* empty */}};module.exports=function(it){var O,T,B;return it===undefined?'Undefined':it===null?'Null'// @@toStringTag case
	:typeof(T=tryGet(O=Object(it),TAG))=='string'?T// builtinTag case
	:ARG?cof(O)// ES3 arguments fallback
		:(B=cof(O))=='Object'&&typeof O.callee=='function'?'Arguments':B;};

/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports=function(it,Constructor,name,forbiddenField){if(!(it instanceof Constructor)||forbiddenField!==undefined&&forbiddenField in it){throw TypeError(name+': incorrect invocation!');}return it;};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var ctx=__webpack_require__(24),call=__webpack_require__(60),isArrayIter=__webpack_require__(61),anObject=__webpack_require__(28),toLength=__webpack_require__(13),getIterFn=__webpack_require__(62),BREAK={},RETURN={};var exports=module.exports=function(iterable,entries,fn,that,ITERATOR){var iterFn=ITERATOR?function(){return iterable;}:getIterFn(iterable),f=ctx(fn,that,entries?2:1),index=0,length,step,iterator,result;if(typeof iterFn!='function')throw TypeError(iterable+' is not iterable!');// fast case for arrays with default iterator
		if(isArrayIter(iterFn))for(length=toLength(iterable.length);length>index;index++){result=entries?f(anObject(step=iterable[index])[0],step[1]):f(iterable[index]);if(result===BREAK||result===RETURN)return result;}else for(iterator=iterFn.call(iterable);!(step=iterator.next()).done;){result=call(iterator,f,step.value,entries);if(result===BREAK||result===RETURN)return result;}};exports.BREAK=BREAK;exports.RETURN=RETURN;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject=__webpack_require__(28);module.exports=function(iterator,fn,value,entries){try{return entries?fn(anObject(value)[0],value[1]):fn(value);// 7.4.6 IteratorClose(iterator, completion)
		}catch(e){var ret=iterator['return'];if(ret!==undefined)anObject(ret.call(iterator));throw e;}};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators=__webpack_require__(44),ITERATOR=__webpack_require__(50)('iterator'),ArrayProto=Array.prototype;module.exports=function(it){return it!==undefined&&(Iterators.Array===it||ArrayProto[ITERATOR]===it);};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var classof=__webpack_require__(57),ITERATOR=__webpack_require__(50)('iterator'),Iterators=__webpack_require__(44);module.exports=__webpack_require__(23).getIteratorMethod=function(it){if(it!=undefined)return it[ITERATOR]||it['@@iterator']||Iterators[classof(it)];};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject=__webpack_require__(28),aFunction=__webpack_require__(25),SPECIES=__webpack_require__(50)('species');module.exports=function(O,D){var C=anObject(O).constructor,S;return C===undefined||(S=anObject(C)[SPECIES])==undefined?D:aFunction(S);};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var ctx=__webpack_require__(24),invoke=__webpack_require__(65),html=__webpack_require__(48),cel=__webpack_require__(33),global=__webpack_require__(18),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE='onreadystatechange',defer,channel,port;var run=function(){var id=+this;if(queue.hasOwnProperty(id)){var fn=queue[id];delete queue[id];fn();}};var listener=function(event){run.call(event.data);};// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask||!clearTask){setTask=function setImmediate(fn){var args=[],i=1;while(arguments.length>i)args.push(arguments[i++]);queue[++counter]=function(){invoke(typeof fn=='function'?fn:Function(fn),args);};defer(counter);return counter;};clearTask=function clearImmediate(id){delete queue[id];};// Node.js 0.8-
	if(__webpack_require__(11)(process)=='process'){defer=function(id){process.nextTick(ctx(run,id,1));};// Browsers with MessageChannel, includes WebWorkers
	}else if(MessageChannel){channel=new MessageChannel();port=channel.port2;channel.port1.onmessage=listener;defer=ctx(port.postMessage,port,1);// Browsers with postMessage, skip WebWorkers
	// IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	}else if(global.addEventListener&&typeof postMessage=='function'&&!global.importScripts){defer=function(id){global.postMessage(id+'','*');};global.addEventListener('message',listener,false);// IE8-
	}else if(ONREADYSTATECHANGE in cel('script')){defer=function(id){html.appendChild(cel('script'))[ONREADYSTATECHANGE]=function(){html.removeChild(this);run.call(id);};};// Rest old browsers
		}else{defer=function(id){setTimeout(ctx(run,id,1),0);};}}module.exports={set:setTask,clear:clearTask};

/***/ },
/* 65 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports=function(fn,args,that){var un=that===undefined;switch(args.length){case 0:return un?fn():fn.call(that);case 1:return un?fn(args[0]):fn.call(that,args[0]);case 2:return un?fn(args[0],args[1]):fn.call(that,args[0],args[1]);case 3:return un?fn(args[0],args[1],args[2]):fn.call(that,args[0],args[1],args[2]);case 4:return un?fn(args[0],args[1],args[2],args[3]):fn.call(that,args[0],args[1],args[2],args[3]);}return fn.apply(that,args);};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__(18),macrotask=__webpack_require__(64).set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode=__webpack_require__(11)(process)=='process';module.exports=function(){var head,last,notify;var flush=function(){var parent,fn;if(isNode&&(parent=process.domain))parent.exit();while(head){fn=head.fn;head=head.next;try{fn();}catch(e){if(head)notify();else last=undefined;throw e;}}last=undefined;if(parent)parent.enter();};// Node.js
	if(isNode){notify=function(){process.nextTick(flush);};// browsers with MutationObserver
	}else if(Observer){var toggle=true,node=document.createTextNode('');new Observer(flush).observe(node,{characterData:true});// eslint-disable-line no-new
	notify=function(){node.data=toggle=!toggle;};// environments with maybe non-completely correct, but existent Promise
	}else if(Promise&&Promise.resolve){var promise=Promise.resolve();notify=function(){promise.then(flush);};// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	}else{notify=function(){// strange IE + webpack dev server bug - use .call(global)
		macrotask.call(global,flush);};}return function(fn){var task={fn:fn,next:undefined};if(last)last.next=task;if(!head){head=task;notify();}last=task;};};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var hide=__webpack_require__(26);module.exports=function(target,src,safe){for(var key in src){if(safe&&target[key])target[key]=src[key];else hide(target,key,src[key]);}return target;};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var global=__webpack_require__(18),core=__webpack_require__(23),dP=__webpack_require__(27),DESCRIPTORS=__webpack_require__(31),SPECIES=__webpack_require__(50)('species');module.exports=function(KEY){var C=typeof core[KEY]=='function'?core[KEY]:global[KEY];if(DESCRIPTORS&&C&&!C[SPECIES])dP.f(C,SPECIES,{configurable:true,get:function(){return this;}});};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR=__webpack_require__(50)('iterator'),SAFE_CLOSING=false;try{var riter=[7][ITERATOR]();riter['return']=function(){SAFE_CLOSING=true;};Array.from(riter,function(){throw 2;});}catch(e){/* empty */}module.exports=function(exec,skipClosing){if(!skipClosing&&!SAFE_CLOSING)return false;var safe=false;try{var arr=[7],iter=arr[ITERATOR]();iter.next=function(){return{done:safe=true};};arr[ITERATOR]=function(){return iter;};exec(arr);}catch(e){/* empty */}return safe;};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";exports.__esModule=true;var _promise=__webpack_require__(36);var _promise2=_interopRequireDefault(_promise);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=function(fn){return function(){var gen=fn.apply(this,arguments);return new _promise2.default(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{return _promise2.default.resolve(value).then(function(value){return step("next",value);},function(err){return step("throw",err);});}}return step("next");});};};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";exports.__esModule=true;var _assign=__webpack_require__(72);var _assign2=_interopRequireDefault(_assign);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=_assign2.default||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(73),__esModule:true};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(74);module.exports=__webpack_require__(23).Object.assign;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export=__webpack_require__(22);$export($export.S+$export.F,'Object',{assign:__webpack_require__(75)});

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys=__webpack_require__(6),gOPS=__webpack_require__(76),pIE=__webpack_require__(77),toObject=__webpack_require__(4),IObject=__webpack_require__(10),$assign=Object.assign;// should work with symbols and should have deterministic property order (V8 bug)
	module.exports=!$assign||__webpack_require__(32)(function(){var A={},B={},S=Symbol(),K='abcdefghijklmnopqrst';A[S]=7;K.split('').forEach(function(k){B[k]=k;});return $assign({},A)[S]!=7||Object.keys($assign({},B)).join('')!=K;})?function assign(target,source){// eslint-disable-line no-unused-vars
		var T=toObject(target),aLen=arguments.length,index=1,getSymbols=gOPS.f,isEnum=pIE.f;while(aLen>index){var S=IObject(arguments[index++]),keys=getSymbols?getKeys(S).concat(getSymbols(S)):getKeys(S),length=keys.length,j=0,key;while(length>j)if(isEnum.call(S,key=keys[j++]))T[key]=S[key];}return T;}:$assign;

/***/ },
/* 76 */
/***/ function(module, exports) {

	exports.f=Object.getOwnPropertySymbols;

/***/ },
/* 77 */
/***/ function(module, exports) {

	exports.f={}.propertyIsEnumerable;

/***/ },
/* 78 */
/***/ function(module, exports) {

	"use strict";exports.__esModule=true;exports.default=function(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _promise = __webpack_require__(36);

	var _promise2 = _interopRequireDefault(_promise);

	var _slicedToArray2 = __webpack_require__(80);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _map = __webpack_require__(87);

	var _map2 = _interopRequireDefault(_map);

	exports.addCommonBackgroundListeners = addCommonBackgroundListeners;

	var _Cache = __webpack_require__(100);

	var _Cache2 = _interopRequireDefault(_Cache);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addCommonBackgroundListeners(addListener) {
		var session = new _map2.default();

		addListener('session', _ref => {
			var _ref2 = (0, _slicedToArray3.default)(_ref, 3);

			var operation = _ref2[0];
			var key = _ref2[1];
			var value = _ref2[2];

			switch (operation) {
				case 'get':
					return session.get(key);
				case 'set':
					session.set(key, value);
					break;
				case 'delete':
					return session.delete(key);
				case 'has':
					return session.has(key);
				case 'clear':
					return session.clear();
				default:
					throw new Error(`Invalid session operation: ${ operation }`);
			}
		});

		var cache = new _Cache2.default();

		addListener('XHRCache', _ref3 => {
			var _ref4 = (0, _slicedToArray3.default)(_ref3, 3);

			var operation = _ref4[0];
			var key = _ref4[1];
			var value = _ref4[2];

			switch (operation) {
				case 'set':
					return cache.set(key, value);
				case 'check':
					return cache.get(key, value);
				case 'delete':
					return cache.delete(key);
				case 'clear':
					return cache.clear();
				default:
					throw new Error(`Invalid XHRCache operation: ${ operation }`);
			}
		});

		var waiting = new _map2.default();

		addListener('authFlow', _ref5 => {
			var operation = _ref5.operation;
			var id = _ref5.id;
			var token = _ref5.token;

			switch (operation) {
				case 'start':
					if (waiting.has(id)) {
						throw new Error(`Auth handler for id: ${ id } already exists.`);
					}
					return new _promise2.default((resolve, reject) => waiting.set(id, { resolve, reject }));
				case 'complete':
					if (!waiting.has(id)) {
						console.error(`No auth handler for id: ${ id } (sent token: ${ token }).`);
						return false;
					}
					waiting.get(id).resolve(token);
					waiting.delete(id);
					return true;
				case 'cancel':
					if (!waiting.has(id)) {
						console.error(`No auth handler for id: ${ id } (attempted cancellation).`);
						return false;
					}
					waiting.get(id).reject(new Error('Auth flow cancelled.'));
					waiting.delete(id);
					return true;
				default:
					throw new Error(`Invalid authFlow operation: ${ operation }`);
			}
		});
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";exports.__esModule=true;var _isIterable2=__webpack_require__(81);var _isIterable3=_interopRequireDefault(_isIterable2);var _getIterator2=__webpack_require__(84);var _getIterator3=_interopRequireDefault(_getIterator2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=(0,_getIterator3.default)(arr),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break;}}catch(err){_d=true;_e=err;}finally{try{if(!_n&&_i["return"])_i["return"]();}finally{if(_d)throw _e;}}return _arr;}return function(arr,i){if(Array.isArray(arr)){return arr;}else if((0,_isIterable3.default)(Object(arr))){return sliceIterator(arr,i);}else{throw new TypeError("Invalid attempt to destructure non-iterable instance");}};}();

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(82),__esModule:true};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);__webpack_require__(39);module.exports=__webpack_require__(83);

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var classof=__webpack_require__(57),ITERATOR=__webpack_require__(50)('iterator'),Iterators=__webpack_require__(44);module.exports=__webpack_require__(23).isIterable=function(it){var O=Object(it);return O[ITERATOR]!==undefined||'@@iterator'in O||Iterators.hasOwnProperty(classof(O));};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(85),__esModule:true};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);__webpack_require__(39);module.exports=__webpack_require__(86);

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__(28),get=__webpack_require__(62);module.exports=__webpack_require__(23).getIterator=function(it){var iterFn=get(it);if(typeof iterFn!='function')throw TypeError(it+' is not iterable!');return anObject(iterFn.call(it));};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(88),__esModule:true};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(38);__webpack_require__(39);__webpack_require__(52);__webpack_require__(89);__webpack_require__(97);module.exports=__webpack_require__(23).Map;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var strong=__webpack_require__(90);// 23.1 Map Objects
	module.exports=__webpack_require__(92)('Map',function(get){return function Map(){return get(this,arguments.length>0?arguments[0]:undefined);};},{// 23.1.3.6 Map.prototype.get(key)
	get:function get(key){var entry=strong.getEntry(this,key);return entry&&entry.v;},// 23.1.3.9 Map.prototype.set(key, value)
		set:function set(key,value){return strong.def(this,key===0?0:key,value);}},strong,true);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var dP=__webpack_require__(27).f,create=__webpack_require__(46),redefineAll=__webpack_require__(67),ctx=__webpack_require__(24),anInstance=__webpack_require__(58),defined=__webpack_require__(5),forOf=__webpack_require__(59),$iterDefine=__webpack_require__(41),step=__webpack_require__(55),setSpecies=__webpack_require__(68),DESCRIPTORS=__webpack_require__(31),fastKey=__webpack_require__(91).fastKey,SIZE=DESCRIPTORS?'_s':'size';var getEntry=function(that,key){// fast case
	var index=fastKey(key),entry;if(index!=='F')return that._i[index];// frozen object case
	for(entry=that._f;entry;entry=entry.n){if(entry.k==key)return entry;}};module.exports={getConstructor:function(wrapper,NAME,IS_MAP,ADDER){var C=wrapper(function(that,iterable){anInstance(that,C,NAME,'_i');that._i=create(null);// index
	that._f=undefined;// first entry
	that._l=undefined;// last entry
	that[SIZE]=0;// size
	if(iterable!=undefined)forOf(iterable,IS_MAP,that[ADDER],that);});redefineAll(C.prototype,{// 23.1.3.1 Map.prototype.clear()
	// 23.2.3.2 Set.prototype.clear()
	clear:function clear(){for(var that=this,data=that._i,entry=that._f;entry;entry=entry.n){entry.r=true;if(entry.p)entry.p=entry.p.n=undefined;delete data[entry.i];}that._f=that._l=undefined;that[SIZE]=0;},// 23.1.3.3 Map.prototype.delete(key)
	// 23.2.3.4 Set.prototype.delete(value)
	'delete':function(key){var that=this,entry=getEntry(that,key);if(entry){var next=entry.n,prev=entry.p;delete that._i[entry.i];entry.r=true;if(prev)prev.n=next;if(next)next.p=prev;if(that._f==entry)that._f=next;if(that._l==entry)that._l=prev;that[SIZE]--;}return!!entry;},// 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	// 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	forEach:function forEach(callbackfn/*, that = undefined */){anInstance(this,C,'forEach');var f=ctx(callbackfn,arguments.length>1?arguments[1]:undefined,3),entry;while(entry=entry?entry.n:this._f){f(entry.v,entry.k,this);// revert to the last existing entry
	while(entry&&entry.r)entry=entry.p;}},// 23.1.3.7 Map.prototype.has(key)
	// 23.2.3.7 Set.prototype.has(value)
	has:function has(key){return!!getEntry(this,key);}});if(DESCRIPTORS)dP(C.prototype,'size',{get:function(){return defined(this[SIZE]);}});return C;},def:function(that,key,value){var entry=getEntry(that,key),prev,index;// change existing entry
	if(entry){entry.v=value;// create new entry
	}else{that._l=entry={i:index=fastKey(key,true),// <- index
	k:key,// <- key
	v:value,// <- value
	p:prev=that._l,// <- previous entry
	n:undefined,// <- next entry
	r:false// <- removed
	};if(!that._f)that._f=entry;if(prev)prev.n=entry;that[SIZE]++;// add to index
	if(index!=='F')that._i[index]=entry;}return that;},getEntry:getEntry,setStrong:function(C,NAME,IS_MAP){// add .keys, .values, .entries, [@@iterator]
	// 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	$iterDefine(C,NAME,function(iterated,kind){this._t=iterated;// target
	this._k=kind;// kind
	this._l=undefined;// previous
	},function(){var that=this,kind=that._k,entry=that._l;// revert to the last existing entry
	while(entry&&entry.r)entry=entry.p;// get next entry
	if(!that._t||!(that._l=entry=entry?entry.n:that._t._f)){// or finish the iteration
	that._t=undefined;return step(1);}// return step by kind
	if(kind=='keys')return step(0,entry.k);if(kind=='values')return step(0,entry.v);return step(0,[entry.k,entry.v]);},IS_MAP?'entries':'values',!IS_MAP,true);// add [@@species], 23.1.2.2, 23.2.2.2
		setSpecies(NAME);}};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var META=__webpack_require__(19)('meta'),isObject=__webpack_require__(29),has=__webpack_require__(8),setDesc=__webpack_require__(27).f,id=0;var isExtensible=Object.isExtensible||function(){return true;};var FREEZE=!__webpack_require__(32)(function(){return isExtensible(Object.preventExtensions({}));});var setMeta=function(it){setDesc(it,META,{value:{i:'O'+ ++id,// object ID
	w:{}// weak collections IDs
	}});};var fastKey=function(it,create){// return primitive with prefix
	if(!isObject(it))return typeof it=='symbol'?it:(typeof it=='string'?'S':'P')+it;if(!has(it,META)){// can't set metadata to uncaught frozen object
	if(!isExtensible(it))return'F';// not necessary to add metadata
	if(!create)return'E';// add missing metadata
	setMeta(it);// return object ID
	}return it[META].i;};var getWeak=function(it,create){if(!has(it,META)){// can't set metadata to uncaught frozen object
	if(!isExtensible(it))return true;// not necessary to add metadata
	if(!create)return false;// add missing metadata
	setMeta(it);// return hash weak collections IDs
	}return it[META].w;};// add metadata on freeze-family methods calling
		var onFreeze=function(it){if(FREEZE&&meta.NEED&&isExtensible(it)&&!has(it,META))setMeta(it);return it;};var meta=module.exports={KEY:META,NEED:false,fastKey:fastKey,getWeak:getWeak,onFreeze:onFreeze};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var global=__webpack_require__(18),$export=__webpack_require__(22),meta=__webpack_require__(91),fails=__webpack_require__(32),hide=__webpack_require__(26),redefineAll=__webpack_require__(67),forOf=__webpack_require__(59),anInstance=__webpack_require__(58),isObject=__webpack_require__(29),setToStringTag=__webpack_require__(49),dP=__webpack_require__(27).f,each=__webpack_require__(93)(0),DESCRIPTORS=__webpack_require__(31);module.exports=function(NAME,wrapper,methods,common,IS_MAP,IS_WEAK){var Base=global[NAME],C=Base,ADDER=IS_MAP?'set':'add',proto=C&&C.prototype,O={};if(!DESCRIPTORS||typeof C!='function'||!(IS_WEAK||proto.forEach&&!fails(function(){new C().entries().next();}))){// create collection constructor
		C=common.getConstructor(wrapper,NAME,IS_MAP,ADDER);redefineAll(C.prototype,methods);meta.NEED=true;}else{C=wrapper(function(target,iterable){anInstance(target,C,NAME,'_c');target._c=new Base();if(iterable!=undefined)forOf(iterable,IS_MAP,target[ADDER],target);});each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','),function(KEY){var IS_ADDER=KEY=='add'||KEY=='set';if(KEY in proto&&!(IS_WEAK&&KEY=='clear'))hide(C.prototype,KEY,function(a,b){anInstance(this,C,KEY);if(!IS_ADDER&&IS_WEAK&&!isObject(a))return KEY=='get'?undefined:false;var result=this._c[KEY](a===0?0:a,b);return IS_ADDER?this:result;});});if('size'in proto)dP(C.prototype,'size',{get:function(){return this._c.size;}});}setToStringTag(C,NAME);O[NAME]=C;$export($export.G+$export.W+$export.F,O);if(!IS_WEAK)common.setStrong(C,NAME,IS_MAP);return C;};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx=__webpack_require__(24),IObject=__webpack_require__(10),toObject=__webpack_require__(4),toLength=__webpack_require__(13),asc=__webpack_require__(94);module.exports=function(TYPE,$create){var IS_MAP=TYPE==1,IS_FILTER=TYPE==2,IS_SOME=TYPE==3,IS_EVERY=TYPE==4,IS_FIND_INDEX=TYPE==6,NO_HOLES=TYPE==5||IS_FIND_INDEX,create=$create||asc;return function($this,callbackfn,that){var O=toObject($this),self=IObject(O),f=ctx(callbackfn,that,3),length=toLength(self.length),index=0,result=IS_MAP?create($this,length):IS_FILTER?create($this,0):undefined,val,res;for(;length>index;index++)if(NO_HOLES||index in self){val=self[index];res=f(val,index,O);if(TYPE){if(IS_MAP)result[index]=res;// map
	else if(res)switch(TYPE){case 3:return true;// some
	case 5:return val;// find
	case 6:return index;// findIndex
	case 2:result.push(val);// filter
	}else if(IS_EVERY)return false;// every
		}}return IS_FIND_INDEX?-1:IS_SOME||IS_EVERY?IS_EVERY:result;};};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor=__webpack_require__(95);module.exports=function(original,length){return new(speciesConstructor(original))(length);};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__(29),isArray=__webpack_require__(96),SPECIES=__webpack_require__(50)('species');module.exports=function(original){var C;if(isArray(original)){C=original.constructor;// cross-realm fallback
		if(typeof C=='function'&&(C===Array||isArray(C.prototype)))C=undefined;if(isObject(C)){C=C[SPECIES];if(C===null)C=undefined;}}return C===undefined?Array:C;};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof=__webpack_require__(11);module.exports=Array.isArray||function isArray(arg){return cof(arg)=='Array';};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export=__webpack_require__(22);$export($export.P+$export.R,'Map',{toJSON:__webpack_require__(98)('Map')});

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof=__webpack_require__(57),from=__webpack_require__(99);module.exports=function(NAME){return function toJSON(){if(classof(this)!=NAME)throw TypeError(NAME+"#toJSON isn't generic");return from(this);};};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var forOf=__webpack_require__(59);module.exports=function(iter,ITERATOR){var result=[];forOf(iter,false,result.push,result,ITERATOR);return result;};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _map = __webpack_require__(87);

	var _map2 = _interopRequireDefault(_map);

	var _slicedToArray2 = __webpack_require__(80);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _from = __webpack_require__(101);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	class Cache extends _map2.default {
		constructor() {
			var capacity = arguments.length <= 0 || arguments[0] === undefined ? 500 : arguments[0];

			super();
			this.capacity = capacity;
		}

		get(key) {
			var maxAge = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

			var entry = super.get(key);
			var now = Date.now();
			if (entry && now - entry.timestamp < maxAge) {
				entry.timestamp = now;
				return entry.value;
			}
		}

		set(key, value) {
			super.set(key, { value, timestamp: Date.now() });

			if (this.size > this.capacity) {
				// evict least-recently used
				(0, _from2.default)(this.entries()).sort((_ref, _ref2) => {
					var _ref4 = (0, _slicedToArray3.default)(_ref, 2);

					var a = _ref4[1];

					var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);

					var b = _ref3[1];
					return b.timestamp - a.timestamp;
				}).slice(this.capacity / 2 | 0).forEach(_ref5 => {
					var _ref6 = (0, _slicedToArray3.default)(_ref5, 1);

					var key = _ref6[0];
					return this.delete(key);
				});
			}
		}
	}
		exports.default = Cache;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__(102),__esModule:true};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(39);__webpack_require__(103);module.exports=__webpack_require__(23).Array.from;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var ctx=__webpack_require__(24),$export=__webpack_require__(22),toObject=__webpack_require__(4),call=__webpack_require__(60),isArrayIter=__webpack_require__(61),toLength=__webpack_require__(13),createProperty=__webpack_require__(104),getIterFn=__webpack_require__(62);$export($export.S+$export.F*!__webpack_require__(69)(function(iter){Array.from(iter);}),'Array',{// 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	from:function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){var O=toObject(arrayLike),C=typeof this=='function'?this:Array,aLen=arguments.length,mapfn=aLen>1?arguments[1]:undefined,mapping=mapfn!==undefined,index=0,iterFn=getIterFn(O),length,result,step,iterator;if(mapping)mapfn=ctx(mapfn,aLen>2?arguments[2]:undefined,2);// if object isn't iterable or it's array with default iterator - use simple case
		if(iterFn!=undefined&&!(C==Array&&isArrayIter(iterFn))){for(iterator=iterFn.call(O),result=new C();!(step=iterator.next()).done;index++){createProperty(result,index,mapping?call(iterator,mapfn,[step.value,index],true):step.value);}}else{length=toLength(O.length);for(result=new C(length);length>index;index++){createProperty(result,index,mapping?mapfn(O[index],index):O[index]);}}result.length=index;return result;}});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';var $defineProperty=__webpack_require__(27),createDesc=__webpack_require__(35);module.exports=function(object,index,value){if(index in object)$defineProperty.f(object,index,createDesc(0,value));else object[index]=value;};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _promise = __webpack_require__(36);

	var _promise2 = _interopRequireDefault(_promise);

	var _asyncToGenerator2 = __webpack_require__(70);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _map = __webpack_require__(87);

	var _map2 = _interopRequireDefault(_map);

	exports.createMessageHandler = createMessageHandler;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createMessageHandler(_sendMessage) {
		var listeners = new _map2.default();
		var interceptors = new _map2.default();
		var waiting = new _map2.default();
		var transaction = 0;

		function addListener(type, callback) {
			if (listeners.has(type)) {
				throw new Error(`Listener for "${ type }" already exists.`);
			}
			listeners.set(type, callback);
		}

		function addInterceptor(type, callback) {
			if (interceptors.has(type)) {
				throw new Error(`Interceptor for "${ type }" already exists.`);
			}
			interceptors.set(type, callback);
		}

		function sendMessage(type, data, context) {
			if (interceptors.has(type)) {
				return (0, _asyncToGenerator3.default)(function* () {
					try {
						return yield interceptors.get(type)(data, context);
					} catch (e) {
						throw new Error(`Error in "${ type }" interceptor: ${ e.message || e }`);
					}
				})();
			}

			++transaction;

			_sendMessage(type, { data, transaction }, context);

			return new _promise2.default((resolve, reject) => waiting.set(transaction, { resolve, reject }));
		}

		function _handleMessage(type, _ref2, context) {
			var data = _ref2.data;
			var transaction = _ref2.transaction;
			var error = _ref2.error;
			var isResponse = _ref2.isResponse;

			if (isResponse) {
				if (!waiting.has(transaction)) {
					throw new Error(`No "${ type }" response handler (transaction ${ transaction }) - this should never happen.`);
				}

				var handler = waiting.get(transaction);
				waiting.delete(transaction);

				if (error) {
					handler.reject(new Error(`Error in target's "${ type }" handler: ${ error }`));
				} else {
					handler.resolve(data);
				}

				return false;
			}

			if (!listeners.has(type)) {
				throw new Error(`Unrecognised message type: ${ type }`);
			}

			function sendResponse(_ref3) {
				var data = _ref3.data;
				var error = _ref3.error;

				_sendMessage(type, { data, transaction, error, isResponse: true }, context);
			}

			var response = void 0;

			try {
				response = listeners.get(type)(data, context);
			} catch (e) {
				sendResponse({ error: e.message || e });
				throw e;
			}

			if (response instanceof _promise2.default) {
				response.then(data => sendResponse({ data })).catch(e => {
					sendResponse({ error: e.message || e });
					throw e;
				});
				// true = response will be handled asynchronously (needed for Chrome)
				return true;
			}

			sendResponse({ data: response });

			return false;
		}

		return {
			_handleMessage,
			sendMessage,
			addListener,
			addInterceptor
		};
		}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css-off.png";

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css-off-small.png";

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css-on.png";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css-on-small.png";

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _promise = __webpack_require__(36);

	var _promise2 = _interopRequireDefault(_promise);

	exports.apiToPromise = apiToPromise;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-env webextensions */

	function apiToPromise(func) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			return new _promise2.default((resolve, reject) => func(...args, function () {
				for (var _len2 = arguments.length, results = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					results[_key2] = arguments[_key2];
				}

				if (chrome.runtime.lastError) {
					reject(new Error(chrome.runtime.lastError.message));
				} else {
					resolve(results.length > 1 ? results : results[0]);
				}
			}));
		};
		}

/***/ }
/******/ ]);
//# sourceMappingURL=background.entry.js.map