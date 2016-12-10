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

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(10);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Model = exports.Model = function () {
		function Model() {
			_classCallCheck(this, Model);

			this.notes = this.load() ? this.load() : {};
		}

		/* ENDPOINTS */

		_createClass(Model, [{
			key: "create",
			value: function create(title, text, order) {
				var success, data, errorMessage;

				try {
					var note = new Note(title, text, order);
					this.notes[note.date.getTime()] = note;
					this.save();

					success = true;
					data = note;
				} catch (err) {
					success = false;
					errorMessage = err.message;
				}

				return new Response(success, data, errorMessage);
			}
		}, {
			key: "readAll",
			value: function readAll() {
				var success, data, errorMessage;

				try {
					if (this.notes) {
						data = [];

						for (var key in this.notes) {
							data.push({
								"id": key,
								"title": this.notes[key].title,
								"text": this.notes[key].text,
								"date": this.notes[key].date,
								"lastModified": this.notes[key].lastModified,
								"order": this.notes[key].order
							});
						}

						success = true;
					} else {
						throw 'Error: No notes found';
					}
				} catch (err) {
					success = false;
					errorMessage = err.message;
				}

				return new Response(success, data, errorMessage);
			}
		}, {
			key: "read",
			value: function read(id) {
				var success, data, errorMessage;

				try {

					if (this.notes[id]) {
						data = this.notes[id];
						success = true;
					} else {
						throw 'Error: Note not found';
					}
				} catch (err) {
					success = false;
					errorMessage = err.message;
				}

				return new Response(success, data, errorMessage);
			}
		}, {
			key: "update",
			value: function update(id) {
				var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				var success, data, errorMessage;

				try {
					if (this.notes[id]) {
						var note = this.notes[id];
						var now = new Date();

						if (title) {
							note.title = title;
						}
						if (text) {
							note.text = text;
						}
						if (order) {
							note.order = order;
						}

						if (title || text || order) {
							note.lastModified = now;
						}

						this.save();

						success = true;
						data = this.notes[id];
					} else {
						throw 'Error: Note not found';
					}
				} catch (err) {
					success = false;
					errorMessage = err.message;
				}

				return new Response(success, data, errorMessage);
			}
		}, {
			key: "delete",
			value: function _delete(id) {
				var success, data, errorMessage;

				try {
					if (this.notes[id]) {
						delete this.notes[id];
						success = true;

						this.save();
					} else {
						throw 'Error: Note not found';
					}
				} catch (err) {
					success = false;
					errorMessage = err.message;
				}

				return new Response(success, data, errorMessage);
			}

			/* INTERN METHODS */

		}, {
			key: "load",
			value: function load() {
				return JSON.parse(this.storage.getItem('notes'));
			}
		}, {
			key: "save",
			value: function save() {
				this.storage.setItem('notes', JSON.stringify(this.notes));
			}
		}, {
			key: "storage",
			get: function get() {
				if (typeof Storage !== "undefined") {
					return localStorage;
				} else {
					console.log('Error: This browser has no Local Storage support');
				}
			}
		}]);

		return Model;
	}();

	var Note = function Note(title, text, order) {
		_classCallCheck(this, Note);

		var now = new Date();

		this.title = title;
		this.text = text;
		this.date = now;
		this.lastModified = now;
		this.order = order;
	};

	/* AUXILIAR CLASSES */

	var Response = function Response(success) {
		var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		var errorMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

		_classCallCheck(this, Response);

		this.success = success;

		if (success) {
			this.response = {};
			if (data) {
				this.response.data = data;
			}
		} else {
			this.error = {};
			if (errorMessage) {
				this.error.message = errorMessage;
			} else {
				this.error.message = 'Error: unknown error';
			}
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ModelConnect = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* MODEL ENCAPSULATION */

	/* 
		The aim of this module is to encapsulate model so as we can
	   	use either an intern Model class or a REST API, without changing any
	   	controller methods.
		
		Model, whatever kind it is, must have the following endpoints:
		- create:  parameters title, text; create a new note
		- readAll: return all notes
		- read:    parameter id; return note by id
		- update:  parameters id, title, text; modify note by id
		- delete:  parameter id; delete note by id

	   	In any of both kinds of model, its endpoints should return a JSON object
	   	with this format:

	   	{
			"success": 	,		// true/false,
			"response": { 		// if success true
				"status": "", 	// if REST API, http response code
				"data": {		// depending on type of request, an object or an array of objects
				},
			},	
			"error" : {			// if success false
				"code": "",		// error code
				"message": ""	// error message
			}
	   	} 
	*/

	// This is a ModelConnect definition for an internal Model class.
	// In case of using a REST API, we should define static methods
	// in another way, in order to trigger AJAX requests to API endpoints

	var _model = __webpack_require__(2);

	var _userPreferences = __webpack_require__(4);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MODEL = new _model.Model();
	var PREFERENCES = new _userPreferences.UserPreferences();

	var ModelConnect = exports.ModelConnect = function () {
		function ModelConnect() {
			_classCallCheck(this, ModelConnect);
		}

		_createClass(ModelConnect, null, [{
			key: 'create',
			value: function create(title, text, order) {
				return MODEL.create(title, text, order);
			}
		}, {
			key: 'readAll',
			value: function readAll() {
				return MODEL.readAll();
			}
		}, {
			key: 'read',
			value: function read(id) {
				return MODEL.read(id);
			}
		}, {
			key: 'update',
			value: function update(id) {
				var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				return MODEL.update(id, title, text, order);
			}
		}, {
			key: 'delete',
			value: function _delete(id) {
				return MODEL.delete(id);
			}
		}, {
			key: 'userSkin',
			get: function get() {
				return PREFERENCES.skin;
			}
		}]);

		return ModelConnect;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var config = __webpack_require__(5);

	var UserPreferences = exports.UserPreferences = function () {
		function UserPreferences() {
			_classCallCheck(this, UserPreferences);

			var preferences = this.load() ? this.load() : {};

			this.skin = preferences.skin ? preferences.skin : config.DEFAULT_SKIN;
		}

		_createClass(UserPreferences, [{
			key: 'load',
			value: function load() {
				return JSON.parse(this.storage.getItem('user-preferences'));
			}
		}, {
			key: 'save',
			value: function save() {
				this.storage.setItem('user-preferences', JSON.stringify(this.notes));
			}
		}, {
			key: 'storage',
			get: function get() {
				if (typeof Storage !== "undefined") {
					return localStorage;
				} else {
					console.log('Error: This browser has no Local Storage support');
				}
			}
		}]);

		return UserPreferences;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var testURL = 'dwec/projects/post-it/dist';

	var defaultSkin = 'classy';

	module.exports = {
		URL: testURL,
		DEFAULT_SKIN: defaultSkin
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Controller = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _configmodel = __webpack_require__(3);

	var _view = __webpack_require__(7);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = exports.Controller = function () {
		function Controller() {
			_classCallCheck(this, Controller);

			var skin = _configmodel.ModelConnect.userSkin;
			var content = this.readAll().response;

			this.view = new _view.View(content, skin);
		}

		_createClass(Controller, [{
			key: 'create',
			value: function create(title, text, order) {
				return _configmodel.ModelConnect.create(title, text, order);
			}
		}, {
			key: 'readAll',
			value: function readAll() {
				return _configmodel.ModelConnect.readAll();
			}
		}, {
			key: 'read',
			value: function read(id) {
				return _configmodel.ModelConnect.read(id);
			}
		}, {
			key: 'update',
			value: function update(id) {
				var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
				var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
				var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				return _configmodel.ModelConnect.update(id, title, text, order);
			}
		}, {
			key: 'delete',
			value: function _delete(id) {
				return _configmodel.ModelConnect.delete(id);
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {}
		}]);

		return Controller;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classy = __webpack_require__(8);

	var _kitsch = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var templates = {
		'classy': _classy.html,
		'kitsch': _kitsch.html
	};

	var View = exports.View = function () {
		function View(content, skin) {
			_classCallCheck(this, View);

			this.content = content; // Array with json post-it objects;
			this.template = templates[skin]; // HTML template

			this.container = document.getElementById('content');

			this.drawUI();
		}

		_createClass(View, [{
			key: 'drawUI',
			value: function drawUI() {
				this.container.innerHTML = Mustache.render(this.template, this.content);
			}
		}]);

		return View;
	}();

	var Template = function Template() {
		_classCallCheck(this, Template);
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var html = exports.html = undefined;

	exports.html = html = "\n{{#data}}\n\t<div id=\"post-it-{{id}}\" class=\"mdl-card mdl-shadow--2dp post-it\">\n\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t<h2 class=\"mdl-card__title-text\">{{title}}</h2>\n\t\t</div>\n\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t{{text}}\n\t\t</div>\n\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\">\n\t\t\t\t<i class=\"material-icons\">edit</i>\n\t\t\t</button>\n\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\">\n\t\t\t\t<i class=\"material-icons\">delete</i>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n{{/data}}\n";

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var html = exports.html = "\n\t<h1>{{title}}</h1>\n";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ctrl = __webpack_require__(6);

	var ctrl;

	window.onload = function () {
		ctrl = new _ctrl.Controller();
	};

/***/ }
/******/ ]);