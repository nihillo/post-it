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

			this.skin = _configmodel.ModelConnect.userSkin;
			this.view = new _view.View(this.skin);

			this.addSavedNotes();
			this.addCreator();
		}

		_createClass(Controller, [{
			key: 'addSavedNotes',
			value: function addSavedNotes() {
				var content = this.readAll().response;
				this.notes = [];

				for (var i = 0; i < content.data.length; i++) {
					this.notes.push(new CtrlNote('saved', this, content.data[i], this.view.container, this.skin));
				}
			}
		}, {
			key: 'addCreator',
			value: function addCreator() {
				var _this = this;

				this.view.appendCreator();

				this.view.creator.addEventListener('click', function () {
					_this.addNew();
				});
			}
		}, {
			key: 'addNew',
			value: function addNew() {
				this.notes.push(new CtrlNote('new', this, {}, this.view.container, this.skin));
			}
		}, {
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
		}]);

		return Controller;
	}();

	var CtrlNote = function () {
		function CtrlNote(state, parentCtrl, data, container, skin) {
			_classCallCheck(this, CtrlNote);

			this.parentCtrl = parentCtrl;
			this.state = state;

			if (this.state == 'new') {

				this.data = {
					id: 'new'
				};
			} else {

				this.data = data;
			}

			this.view = new _view.ViewNote(this.state, this.data, container, skin);

			this.bindEvents();
		}

		_createClass(CtrlNote, [{
			key: 'bindEvents',
			value: function bindEvents() {
				var _this2 = this;

				if (this.view.controls.edit) {
					this.view.controls.edit.addEventListener('click', function () {
						_this2.edit();
					});
				}

				if (this.view.controls.delete) {
					this.view.controls.delete.addEventListener('click', function () {
						_this2.delete();
					});
				}

				if (this.view.controls.ok) {
					this.view.controls.ok.addEventListener('click', function () {
						_this2.save();
					});
				}

				if (this.view.controls.cancel) {
					this.view.controls.cancel.addEventListener('click', function () {
						_this2.dismiss();
					});
				}
			}
		}, {
			key: 'edit',
			value: function edit() {
				console.log('edit-' + this.data.id);
			}
		}, {
			key: 'delete',
			value: function _delete() {
				this.view.removeNote();
				this.parentCtrl.delete(this.data.id);
			}
		}, {
			key: 'save',
			value: function save() {
				var title = document.getElementById('add-title-' + this.data.id);
				var text = document.getElementById('add-text-' + this.data.id);

				var savedNote = this.parentCtrl.create(title.value, text.value, 1);
				this.data = savedNote.response.data;

				this.view.updateNote(this.data);
			}
		}, {
			key: 'dismiss',
			value: function dismiss() {
				this.view.removeNote();
			}
		}]);

		return CtrlNote;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ViewNote = exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classy = __webpack_require__(8);

	var _kitsch = __webpack_require__(9);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var templates = {
		'classy': _classy.note,
		'kitsch': _kitsch.note
	};

	var View = exports.View = function () {
		function View(skin) {
			_classCallCheck(this, View);

			this.container = document.getElementById('content');
			this.template = templates[skin]; // HTML template
		}

		_createClass(View, [{
			key: 'appendCreator',
			value: function appendCreator() {
				var template = this.template.creator;

				var auxParent = document.createElement('div');
				auxParent.innerHTML = Mustache.render(template, {});

				this.creator = auxParent.children[0];
				this.container.appendChild(this.creator);
			}
		}]);

		return View;
	}();

	var ViewNote = exports.ViewNote = function () {
		function ViewNote(state, data, container, skin) {
			_classCallCheck(this, ViewNote);

			this.data = data;
			this.state = state;
			this.container = container;
			this.template = templates[skin];

			this.drawNote(this.state);

			this.controls = {
				edit: document.getElementById('edit-' + this.data.id),
				delete: document.getElementById('delete-' + this.data.id),
				ok: document.getElementById('ok-' + this.data.id),
				cancel: document.getElementById('cancel-' + this.data.id)
			};
		}

		_createClass(ViewNote, [{
			key: 'updateNote',
			value: function updateNote(data) {
				this.data = data;
				this.redrawNote('saved');
			}
		}, {
			key: 'drawNote',
			value: function drawNote() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'saved';

				var template;

				switch (state) {
					case 'new':
						template = this.template.edit;
						this.element = this.createDomElement(template, this.data);
						this.insertInPlace(this.element, 'end');
						break;
					case 'edit':
						template = this.template.edit;
						this.element = this.createDomElement(template, this.data);
						this.insertInPlace(this.element, 'self');
						break;
					case 'saved':
						template = this.template.fixed;
						this.element = this.createDomElement(template, this.data);
						this.insertInPlace(this.element, 'end');
						break;
				}
			}
		}, {
			key: 'redrawNote',
			value: function redrawNote() {
				var toState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'saved';

				this.removeNote();
				this.drawNote(toState);
			}
		}, {
			key: 'removeNote',
			value: function removeNote() {
				this.container.removeChild(this.element);
			}
		}, {
			key: 'createDomElement',
			value: function createDomElement(template, data) {
				var auxParent = document.createElement('div');
				auxParent.innerHTML = Mustache.render(template, data);

				return auxParent.children[0];
			}
		}, {
			key: 'insertInPlace',
			value: function insertInPlace(element) {
				var place = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

				switch (place) {
					case 'end':
						var add = document.getElementById('post-it-add');

						if (add) {
							this.container.insertBefore(element, add);
						} else {
							this.container.appendChild(element);
						}
						break;
					case 'self':
						break;
				}
			}
		}]);

		return ViewNote;
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var note = exports.note = undefined;

	exports.note = note = { /*
	                        new: `
	                        <div id="post-it-{{id}}" class="mdl-card mdl-shadow--2dp post-it">
	                        <div class="mdl-card__title mdl-card--expand">
	                        <input type="text" placeholder="Add title" class="add-title" id="add-title-{{id}}"></input>
	                        </div>
	                        <div class="mdl-card__supporting-text">
	                        <textarea cols="30" rows="10" placeholder="Add text" class="add-text" id="add-text-{{id}}"></textarea>
	                        </div>
	                        <div class="mdl-card__actions mdl-card--border">
	                        <div class="mdl-layout-spacer"></div>
	                        <button class="mdl-button mdl-js-button mdl-button--icon" id="ok-{{id}}">
	                        <i class="material-icons">done</i>
	                        </button>
	                        <button class="mdl-button mdl-js-button mdl-button--icon" id="cancel-{{id}}">
	                        <i class="material-icons">close</i>
	                        </button>
	                        </div>
	                        </div>
	                        `,*/
		edit: "\n\t\t<div id=\"post-it-{{id}}\" class=\"mdl-card mdl-shadow--2dp post-it\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<input type=\"text\" placeholder=\"Add title\" class=\"add-title\" id=\"add-title-{{id}}\"></input>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t<textarea cols=\"30\" rows=\"10\" placeholder=\"Add text\" class=\"add-text\" id=\"add-text-{{id}}\"></textarea>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"ok-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons\">done</i>\n\t\t\t\t</button>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"cancel-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons\">close</i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		fixed: "\n\t\t<div id=\"post-it-{{id}}\" class=\"mdl-card mdl-shadow--2dp post-it\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<h2 class=\"mdl-card__title-text\">{{title}}</h2>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t{{text}}\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"edit-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons\">edit</i>\n\t\t\t\t</button>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"delete-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons\">delete</i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		creator: "\n\t\t<div id=\"post-it-add\" class=\"mdl-card mdl-shadow--2dp post-it\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<h2 class=\"mdl-card__title-text\"></h2>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t<div class=\"mdl-button mdl-js-button mdl-button--icon add-icon-big\">\n\t\t\t\t\t<i class=\"material-icons\">add</i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<div class=\"add-action-text\">ADD NOTE</div>\n\t\t\t</div>\n\t\t</div>\n\t"
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var note = exports.note = "\n\t<h1>{{title}}</h1>\n";

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