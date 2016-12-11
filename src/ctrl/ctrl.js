import {ModelConnect} from './configmodel.js';
import {View, ViewNote} from '../view/view.js';

export class Controller {
	constructor() {
		this.skin = ModelConnect.userSkin;
		this.view = new View(this.skin);
		
		this.addSavedNotes();
		this.addCreator();

		this.dragSrc = null; // Used for drag & drop events
	}

	addSavedNotes() {
		var content = this.readAll().response;
		this.notes = [];

		for (let i = 0; i < content.data.length; i++) {
			this.notes.push(new CtrlNote('saved', this, content.data[i], this.view.container, this.skin));
		}
	}

	addCreator() {
		this.view.appendCreator();

		this.view.creator.addEventListener('click', () => {
			this.addNew();
		});
	}

	addNew() {
		var newNote = document.getElementById('post-it-new');
		if (!newNote) {
			this.notes.push(new CtrlNote('new', this, {}, this.view.container, this.skin));
		}
	}



	create(title, text) {
		return ModelConnect.create(title, text);
	}

	readAll() {
		return ModelConnect.readAll();
	}

	read(id) {
		return ModelConnect.read(id);
	}

	update(id, title = null, text = null, position = null) {
		return ModelConnect.update(id, title, text, position);
	}

	delete(id) {
		return ModelConnect.delete(id);
	}
}



class CtrlNote {
	constructor(state, parentCtrl, data, container, skin) {
		this.parentCtrl = parentCtrl;
		this.state = state;

		if (this.state == 'new') {

			this.data = {
				id: 'new'
			};

		} else {

			this.data = data;

		}
		
		

		this.view = new ViewNote(this.state, this.data, container, skin);

		this.bindEvents();

	}

	bindEvents() {

		if (this.view.controls.edit) {
			this.view.controls.edit.addEventListener('click', () => {
				this.edit();
			});
		}

		if (this.view.controls.delete) {
			this.view.controls.delete.addEventListener('click', () => {
				this.delete();
			});
		}

		if (this.view.controls.ok) {
			this.view.controls.ok.addEventListener('click', () => {
				this.save();
			});
		}

		if (this.view.controls.cancel) {
			this.view.controls.cancel.addEventListener('click', () => {
				this.dismiss(this.state);
			});
		}

		if (this.view.element.draggable) {
			this.view.element.addEventListener('dragstart', (event) => {

				this.dragStart(event);
			});

			this.view.element.addEventListener('dragenter', () => {

				this.dragEnter();
			});

			this.view.element.addEventListener('dragover', (event) => {
				this.dragOver(event);
			});

			this.view.element.addEventListener('dragleave', () => {
				this.dragLeave();
			});

			this.view.element.addEventListener('drop', () => {
				this.drop(event);
			});

			this.view.element.addEventListener('dragend', () => {
				this.dragEnd();
			});
		}
	}


	edit() {
		this.state = 'edit';
		this.view.updateNote(this.data, 'edit');
		this.bindEvents();
	}

	delete() {
		this.view.removeNote();
		this.parentCtrl.delete(this.data.id);
	}

	save() {

		var prevState = JSON.parse(JSON.stringify(this.view.state));
		console.log(prevState);
		var title = document.getElementById('add-title-' + this.data.id);
		var text = document.getElementById('add-text-' + this.data.id);

		var savedNote;
		switch(prevState) {
			case 'new':
				savedNote = this.parentCtrl.create(title.value, text.value);
				this.data = savedNote.response.data;
				
				this.view.updateNote(this.data, 'saved');
				break;
			case 'edit':
				console.log('entering save edit');
				savedNote = this.parentCtrl.update(this.data.id, title.value, text.value);
				this.data = savedNote.response.data;
				
				this.view.updateNote(this.data, 'saved');
				break;
		}

		this.bindEvents();
	}

	dismiss(state) {
		switch(state) {
			case 'new': 
				this.view.removeNote();
				break;
			case 'edit':
				this.view.updateNote(this.data, 'saved');
				this.bindEvents();
				break;
		}
		
	}


	dragStart(event) {
		this.view.element.style.opacity = 0.4;

		this.parentCtrl.dragSrc = this;

		event.dataTransfer.dropEffect = 'move';
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData('text/html', this.view.element);
	}

	dragOver(event) {
		if (this.parentCtrl.dragSrc != this) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'move';
			event.dataTransfer.effectAllowed = 'move';
			
			return false;
		}
	}

	dragEnter() {
		if (this.parentCtrl.dragSrc != this) {
			this.view.element.style.opacity = 0.4;
		}
	}

	dragLeave() {
		if (this.parentCtrl.dragSrc != this) {
			this.view.element.style.opacity = 1;
		}
	}

	drop(event) {
		event.preventDefault();

		if (this.parentCtrl.dragSrc != this) {

			var moving = this.parentCtrl.dragSrc.view.element;
			var container = this.view.element.parentNode;
			var dest = this.view.element;

			container.insertBefore(moving, dest);
		}

		return false;
	}

	dragEnd(){

		console.log('holi');
		var elements = document.querySelectorAll('[draggable="true"]');
		for (let i = 0; i < elements.length; i++) {
			elements[i].style.opacity = '1';		
		}
	}
}