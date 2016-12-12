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
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(9);

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
			value: function create(title, text) {
				var success, data, errorMessage;

				try {
					var position = this.readAll().response.data.length;
					var note = new Note(title, text, position);
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
								"position": this.notes[key].position
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
				var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

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
						if (position !== null || position !== undefined) {
							note.position = position;
						}

						if (title || text) {
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

	var Note = function Note(title, text, position) {
		_classCallCheck(this, Note);

		var now = new Date();

		this.id = now.getTime();
		this.title = title;
		this.text = text;
		this.date = now;
		this.lastModified = now;
		this.position = position;
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

	// This is a ModelConnect definition for an internal Model class which stores
	// notes in Local Storage.
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
			value: function create(title, text) {
				return MODEL.create(title, text);
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
				var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				return MODEL.update(id, title, text, position);
			}
		}, {
			key: 'delete',
			value: function _delete(id) {
				return MODEL.delete(id);
			}
		}, {
			key: 'setSkin',
			value: function setSkin(skin) {
				PREFERENCES.setSkin(skin);
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DEFAULT_SKIN = 'classy';

	var UserPreferences = exports.UserPreferences = function () {
		function UserPreferences() {
			_classCallCheck(this, UserPreferences);

			var skin = this.load() ? this.load() : null;

			this.skin = skin ? skin : DEFAULT_SKIN;
		}

		_createClass(UserPreferences, [{
			key: 'setSkin',
			value: function setSkin(skin) {
				this.skin = skin;
				this.save();
			}
		}, {
			key: 'load',
			value: function load() {
				return JSON.parse(this.storage.getItem('skin'));
			}
		}, {
			key: 'save',
			value: function save() {
				this.storage.setItem('skin', JSON.stringify(this.skin));
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Controller = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _configmodel = __webpack_require__(3);

	var _view = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Controller = exports.Controller = function () {
		function Controller() {
			_classCallCheck(this, Controller);

			this.skin = _configmodel.ModelConnect.userSkin;
			this.view = new _view.View(this.skin);

			this.bindEvents();
			this.loadElements();
		}

		_createClass(Controller, [{
			key: 'bindEvents',
			value: function bindEvents() {
				var _this = this;

				this.view.templateSwitch.classy.addEventListener('click', function () {
					_this.setSkin('classy');
				});

				this.view.templateSwitch.brutalist.addEventListener('click', function () {
					_this.setSkin('brutalist');
				});
			}
		}, {
			key: 'loadElements',
			value: function loadElements() {
				this.addSavedNotes();
				this.addCreator();

				this.dragSrc = null; // Used for drag & drop events
			}
		}, {
			key: 'reloadElements',
			value: function reloadElements() {
				this.notes = [];
				this.view.clear();

				this.loadElements();
			}
		}, {
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
				var _this2 = this;

				this.view.appendCreator();

				this.view.creator.addEventListener('click', function () {
					_this2.addNew();
				});
			}
		}, {
			key: 'addNew',
			value: function addNew() {
				var newNote = this.view.getAddNew();
				if (!newNote) {
					this.notes.push(new CtrlNote('new', this, { id: 'new' }, this.view.container, this.skin));
				}
			}
		}, {
			key: 'fixItemsAfterDrag',
			value: function fixItemsAfterDrag() {
				this.view.fixItemsAfterDrag();
			}
		}, {
			key: 'reorderNotesAfterDrop',
			value: function reorderNotesAfterDrop() {
				var elements = this.view.getFixedElements();

				for (var i = 0; i < elements.length; i++) {
					var pos = i;
					var id = elements[i].id.split('-')[2];

					this.update(id, null, null, pos);
				}

				this.reloadElements();
			}
		}, {
			key: 'setSkin',
			value: function setSkin(skin) {
				this.skin = skin;
				_configmodel.ModelConnect.setSkin(skin);
				this.view.setSkin(skin);
				this.reloadElements();
			}
		}, {
			key: 'create',
			value: function create(title, text) {
				return _configmodel.ModelConnect.create(title, text);
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
				var position = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

				return _configmodel.ModelConnect.update(id, title, text, position);
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

			this.data = data;

			this.formatDates();

			this.showTime();
			this.view = new _view.ViewNote(this.state, this.data, container, skin);

			this.bindEvents();
		}

		_createClass(CtrlNote, [{
			key: 'formatDates',
			value: function formatDates() {
				var d = new Date(this.data.date);
				this.data.fDate = d.toLocaleDateString() + ' - ' + d.toLocaleTimeString();

				var m = new Date(this.data.lastModified);
				this.data.fLastModified = m.toLocaleDateString() + ' - ' + m.toLocaleTimeString();
			}
		}, {
			key: 'timeAgo',
			value: function timeAgo() {
				var created = new Date(this.data.date);
				var now = new Date();

				var miliseconds = now.getTime() - created.getTime();

				var minutes = Math.floor(miliseconds / 60000);

				if (minutes < 60) {
					return minutes + ' minutes ago';
				}

				var hours = Math.floor(minutes / 60);

				if (hours < 24) {
					return hours + ' hours ago';
				}

				var days = Math.floor(hours / 24);

				if (days < 7) {
					return days + ' days ago';
				}

				return created.toLocaleDateString();
			}
		}, {
			key: 'showTime',
			value: function showTime() {
				var _this3 = this;

				this.data.timeAgo = this.timeAgo();
				window.setInterval(function () {
					_this3.data.timeAgo = _this3.timeAgo();
					_this3.view.updateNote(_this3.data, _this3.state);
					_this3.bindEvents();
				}, 60000);
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {
				var _this4 = this;

				if (this.view.controls.edit) {
					this.view.controls.edit.addEventListener('click', function () {
						_this4.edit();
					});
				}

				if (this.view.controls.delete) {
					this.view.controls.delete.addEventListener('click', function () {
						_this4.delete();
					});
				}

				if (this.view.controls.ok) {
					this.view.controls.ok.addEventListener('click', function () {
						_this4.save();
					});
				}

				if (this.view.controls.cancel) {
					this.view.controls.cancel.addEventListener('click', function () {
						_this4.dismiss(_this4.state);
					});
				}

				if (this.view.element.draggable) {
					this.view.element.addEventListener('dragstart', function (event) {

						_this4.dragStart(event);
					});

					this.view.element.addEventListener('dragenter', function () {

						_this4.dragEnter();
					});

					this.view.element.addEventListener('dragover', function (event) {
						_this4.dragOver(event);
					});

					this.view.element.addEventListener('dragleave', function () {
						_this4.dragLeave();
					});

					this.view.element.addEventListener('drop', function () {
						_this4.drop(event);
					});

					this.view.element.addEventListener('dragend', function () {
						_this4.dragEnd();
					});
				}
			}
		}, {
			key: 'edit',
			value: function edit() {
				this.state = 'edit';
				this.view.updateNote(this.data, 'edit');
				this.bindEvents();
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

				var prevState = JSON.parse(JSON.stringify(this.view.state));
				var values = this.view.getEditValues();

				var savedNote;
				switch (prevState) {
					case 'new':
						savedNote = this.parentCtrl.create(values.title, values.text);
						this.data = savedNote.response.data;

						this.formatDates();
						this.showTime();

						this.view.updateNote(this.data, 'saved');
						break;
					case 'edit':
						savedNote = this.parentCtrl.update(this.data.id, values.title, values.text);
						this.data = savedNote.response.data;

						this.view.updateNote(this.data, 'saved');
						break;
				}
				this.state = 'saved';
				this.bindEvents();
			}
		}, {
			key: 'dismiss',
			value: function dismiss(state) {
				switch (state) {
					case 'new':
						this.view.removeNote();
						break;
					case 'edit':
						this.view.updateNote(this.data, 'saved');
						this.bindEvents();
						break;
				}
			}
		}, {
			key: 'dragStart',
			value: function dragStart(event) {
				this.view.vanish(0.4);

				this.parentCtrl.dragSrc = this;

				event.dataTransfer.dropEffect = 'move';
				event.dataTransfer.effectAllowed = 'move';
				event.dataTransfer.setData('text/html', this.view.element);
			}
		}, {
			key: 'dragOver',
			value: function dragOver(event) {
				if (this.parentCtrl.dragSrc != this) {
					event.preventDefault();
					event.dataTransfer.dropEffect = 'move';
					event.dataTransfer.effectAllowed = 'move';

					return false;
				}
			}
		}, {
			key: 'dragEnter',
			value: function dragEnter() {
				if (this.parentCtrl.dragSrc != this) {
					this.view.vanish(0.6);
					this.view.showCue();
				}
			}
		}, {
			key: 'dragLeave',
			value: function dragLeave() {
				if (this.parentCtrl.dragSrc != this) {
					this.view.unvanish();
					this.view.hideCue();
				}
			}
		}, {
			key: 'drop',
			value: function drop(event) {
				event.preventDefault();

				if (this.parentCtrl.dragSrc != this) {

					var moving = this.parentCtrl.dragSrc.view.element;
					var container = this.view.element.parentNode;
					var dest = this.view.element;

					container.insertBefore(moving, dest);

					this.parentCtrl.reorderNotesAfterDrop();
				}

				return false;
			}
		}, {
			key: 'dragEnd',
			value: function dragEnd() {

				this.parentCtrl.fixItemsAfterDrag();
			}
		}]);

		return CtrlNote;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ViewNote = exports.View = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _classy = __webpack_require__(7);

	var _brutalist = __webpack_require__(8);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var templates = {
		'classy': _classy.note,
		'brutalist': _brutalist.note
	};

	var View = exports.View = function () {
		function View(skin) {
			_classCallCheck(this, View);

			this.container = document.getElementById('content');
			this.template = templates[skin]; // HTML template
			document.body.className = skin;
			this.templateSwitch = this.getTemplateSwitch();
		}

		_createClass(View, [{
			key: 'getTemplateSwitch',
			value: function getTemplateSwitch() {
				return {
					classy: document.getElementById('set-skin-classy'),
					brutalist: document.getElementById('set-skin-brutalist')
				};
			}
		}, {
			key: 'setSkin',
			value: function setSkin(skin) {
				this.template = templates[skin];
				document.body.className = skin;
			}
		}, {
			key: 'appendCreator',
			value: function appendCreator() {
				var template = this.template.creator;

				var auxParent = document.createElement('div');
				auxParent.innerHTML = Mustache.render(template, {});

				this.creator = auxParent.children[0];
				this.container.appendChild(this.creator);
			}
		}, {
			key: 'clear',
			value: function clear() {
				this.container.innerHTML = '';
			}
		}, {
			key: 'getAddNew',
			value: function getAddNew() {
				return document.getElementById('post-it-new');
			}
		}, {
			key: 'getDraggable',
			value: function getDraggable() {
				return document.querySelectorAll('[draggable="true"]');
			}
		}, {
			key: 'fixItemsAfterDrag',
			value: function fixItemsAfterDrag() {
				var elements = this.getDraggable();
				for (var i = 0; i < elements.length; i++) {
					elements[i].style.opacity = '1';
				}
			}
		}, {
			key: 'getFixedElements',
			value: function getFixedElements() {
				return document.querySelectorAll('[data-fixed="true"]');
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

			this.controls = this.getControls();
		}

		_createClass(ViewNote, [{
			key: 'getControls',
			value: function getControls() {
				return {
					edit: document.getElementById('edit-' + this.data.id),
					delete: document.getElementById('delete-' + this.data.id),
					ok: document.getElementById('ok-' + this.data.id),
					cancel: document.getElementById('cancel-' + this.data.id)
				};
			}
		}, {
			key: 'updateNote',
			value: function updateNote(data, toState) {
				this.data = data;
				this.state = toState;
				this.redrawNote(toState);
				this.controls = this.getControls();
			}
		}, {
			key: 'drawNote',
			value: function drawNote() {
				var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'saved';

				var template;

				switch (state) {
					case 'new':
						template = this.template.new;
						this.element = this.createDomElement(template, this.data);
						this.insertInPlace(this.element, 'end');
						break;
					case 'edit':
						template = this.template.edit;
						this.element = this.createDomElement(template, this.data);
						this.insertInPlace(this.element, this.data.position);
						break;
					case 'saved':
						template = this.template.fixed;
						this.element = this.createDomElement(template, this.data);
						this.insertInPlace(this.element, this.data.position);
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
			key: 'getEditValues',
			value: function getEditValues() {
				var fields = {
					title: document.getElementById('add-title-' + this.data.id),
					text: document.getElementById('add-text-' + this.data.id)
				};

				var values = {
					title: fields.title ? fields.title.value : null,
					text: fields.text ? fields.text.value : null
				};

				return values;
			}
		}, {
			key: 'insertInPlace',
			value: function insertInPlace(element) {
				var place = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';

				if (place == 'end') {
					var add = document.getElementById('post-it-add');

					if (add) {
						this.container.insertBefore(element, add);
					} else {
						this.container.appendChild(element);
					}
				} else {
					if (place < this.container.children.length + 1 && this.searchNextElmByPosition(place)) {

						var next = this.searchNextElmByPosition(place);
						this.container.insertBefore(element, next);
					} else {
						this.insertInPlace(element, 'end');
					}
				}
			}
		}, {
			key: 'searchNextElmByPosition',
			value: function searchNextElmByPosition(pos) {

				for (var i = 0; i < this.container.children.length; i++) {
					if (this.container.children[i].getAttribute('data-pos') > pos) {
						return this.container.children[i];
					}
				}

				return null;
			}
		}, {
			key: 'vanish',
			value: function vanish(amount) {
				this.element.style.opacity = amount;
			}
		}, {
			key: 'unvanish',
			value: function unvanish() {
				this.element.style.opacity = 1;
			}
		}, {
			key: 'showCue',
			value: function showCue() {
				this.element.style.borderLeft = '3px dashed #88bdff';
			}
		}, {
			key: 'hideCue',
			value: function hideCue() {
				this.element.style.borderLeft = 0;
			}
		}]);

		return ViewNote;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var note = exports.note = undefined;

	exports.note = note = {
		new: "\n\t\t<div id=\"post-it-{{id}}\" class=\"mdl-card mdl-shadow--8dp post-it\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<input type=\"text\" placeholder=\"Add title\" class=\"add-title\" id=\"add-title-{{id}}\"></input>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t<textarea cols=\"30\" rows=\"10\" placeholder=\"Add text\" class=\"add-text\" id=\"add-text-{{id}}\"></textarea>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"ok-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons mdl-color-text--green\">done</i>\n\t\t\t\t</button>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"cancel-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons mdl-color-text--red\">close</i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		edit: "\n\t\t<div id=\"post-it-{{id}}\" class=\"mdl-card mdl-shadow--8dp post-it\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<input type=\"text\" value=\"{{title}}\" class=\"add-title\" id=\"add-title-{{id}}\"></input>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t<textarea cols=\"30\" rows=\"10\" value=\"{{text}}\" class=\"add-text\" id=\"add-text-{{id}}\">{{text}}</textarea>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"date\">{{timeAgo}}</div>\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"ok-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons mdl-color-text--green\">done</i>\n\t\t\t\t</button>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"cancel-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons mdl-color-text--red\">close</i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		fixed: "\n\t\t<div data-pos=\"{{position}}\" data-fixed=\"true\" id=\"post-it-{{id}}\" class=\"mdl-card mdl-shadow--2dp post-it\" draggable=\"true\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<h2 class=\"mdl-card__title-text\">{{title}}</h2>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t{{text}}\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"date\">{{timeAgo}}</div>\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"edit-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons\">edit</i>\n\t\t\t\t</button>\n\t\t\t\t<button class=\"mdl-button mdl-js-button mdl-button--icon\" id=\"delete-{{id}}\">\n\t\t\t\t\t<i class=\"material-icons\">delete</i>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		creator: "\n\t\t<div id=\"post-it-add\" class=\"mdl-card mdl-shadow--2dp post-it\">\n\t\t\t<div class=\"mdl-card__title mdl-card--expand\">\n\t\t\t\t<h2 class=\"mdl-card__title-text\"></h2>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__supporting-text\">\n\t\t\t\t<div class=\"mdl-button mdl-js-button mdl-button--icon add-icon-big\">\n\t\t\t\t\t<i class=\"material-icons\">add</i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"mdl-card__actions mdl-card--border\">\n\t\t\t\t<div class=\"mdl-layout-spacer\"></div>\n\t\t\t\t<div class=\"add-action-text\">ADD NOTE</div>\n\t\t\t</div>\n\t\t</div>\n\t"
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var note = exports.note = undefined;

	exports.note = note = {
		new: "\n\t\t<div id=\"post-it-{{id}}\" class=\"note-brutalist\">\n\t\t\t<div class=\"note-header\">\n\t\t\t\t<input type=\"text\" placeholder=\"Add title\" class=\"add-title\" id=\"add-title-{{id}}\"></input>\n\t\t\t</div>\n\t\t\t<div class=\"note-body\">\n\t\t\t\t<textarea cols=\"30\" rows=\"10\" placeholder=\"Add text\" class=\"add-text\" id=\"add-text-{{id}}\"></textarea>\n\t\t\t</div>\n\t\t\t<div class=\"note-footer\">\n\t\t\t\t<button class=\"\" id=\"ok-{{id}}\">\n\t\t\t\t\tDONE\n\t\t\t\t</button>\n\t\t\t\t<button class=\"\" id=\"cancel-{{id}}\">\n\t\t\t\t\tCANCEL\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		edit: "\n\t\t<div id=\"post-it-{{id}}\" class=\"note-brutalist\">\n\t\t\t<div class=\"note-header\">\n\t\t\t\t<input type=\"text\" value=\"{{title}}\" class=\"add-title\" id=\"add-title-{{id}}\"></input>\n\t\t\t</div>\n\t\t\t<div class=\"note-body\">\n\t\t\t\t<textarea cols=\"30\" rows=\"10\" value=\"{{text}}\" class=\"add-text\" id=\"add-text-{{id}}\">{{text}}</textarea>\n\t\t\t</div>\n\t\t\t<div class=\"note-footer\">\n\t\t\t\t<div class=\"date\">{{timeAgo}}</div>\n\t\t\t\t<button class=\"\" id=\"ok-{{id}}\">\n\t\t\t\t\tDONE\n\t\t\t\t</button>\n\t\t\t\t<button class=\"\" id=\"cancel-{{id}}\">\n\t\t\t\t\tCANCEL\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		fixed: "\n\t\t<div data-pos=\"{{position}}\" data-fixed=\"true\" id=\"post-it-{{id}}\" class=\"note-brutalist\" draggable=\"true\">\n\t\t\t<div class=\"note-header\">\n\t\t\t\t<h2 class=\"\">{{title}}</h2>\n\t\t\t</div>\n\t\t\t<div class=\"note-body\">\n\t\t\t\t{{text}}\n\t\t\t</div>\n\t\t\t<div class=\"note-footer\">\n\t\t\t\t<div class=\"date\">{{timeAgo}}</div>\n\t\t\t\t<button class=\"\" id=\"edit-{{id}}\">\n\t\t\t\t\tEDIT\n\t\t\t\t</button>\n\t\t\t\t<button class=\"\" id=\"delete-{{id}}\">\n\t\t\t\t\tDELETE\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t",
		creator: "\n\t\t<div id=\"post-it-add\" class=\"note-brutalist\">\n\t\t\t<div class=\"note-header\">\n\t\t\t\t<h2 class=\"\"></h2>\n\t\t\t</div>\n\t\t\t<div class=\"note-body\">\n\t\t\t\t<div class=\"\">\n\t\t\t\t\t+ ADD NOTE\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"note-footer\">\n\t\t\t</div>\n\t\t</div>\n\t"
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ctrl = __webpack_require__(5);

	var ctrl;

	window.onload = function () {
		ctrl = new _ctrl.Controller();
	};

/***/ }
/******/ ]);