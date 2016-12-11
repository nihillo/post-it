import {ModelConnect} from './configmodel.js';
import {View, ViewNote} from '../view/view.js';

export class Controller {
	constructor() {
		this.skin = ModelConnect.userSkin;
		this.view = new View(this.skin);
		
		this.loadElements();
	}

	loadElements() {
		this.addSavedNotes();
		this.addCreator();

		this.dragSrc = null; // Used for drag & drop events
	}

	reloadElements() {
		this.notes = [];
		this.view.clear();

		this.loadElements();
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
		var newNote = this.view.getAddNew();
		if (!newNote) {
			this.notes.push(new CtrlNote('new', this, {id: 'new'}, this.view.container, this.skin));
		}
	}

	fixItemsAfterDrag() {
		this.view.fixItemsAfterDrag();
	}

	reorderNotesAfterDrop() {
		var elements = document.querySelectorAll('[data-fixed="true"]');

		for (let i = 0; i < elements.length; i++) {
			let pos = i;
			let id = elements[i].id.split('-')[2];

			this.update(id, null, null, pos);
		}

		this.reloadElements();
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

		this.data = data;

		this.formatDates();
 	
		
		this.view = new ViewNote(this.state, this.data, container, skin);

		this.bindEvents();

	}

	formatDates() {
		var d = new Date(this.data.date);
		this.data.fDate = d.toLocaleDateString() + ' - ' + d.toLocaleTimeString();

		var m = new Date(this.data.lastModified);
		this.data.fLastModified = m.toLocaleDateString() + ' - ' + m.toLocaleTimeString();
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
		var title = document.getElementById('add-title-' + this.data.id);
		var text = document.getElementById('add-text-' + this.data.id);

		var savedNote;
		switch(prevState) {
			case 'new':
				savedNote = this.parentCtrl.create(title.value, text.value);
				this.data = savedNote.response.data;

				this.formatDates();
				
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
			this.view.element.style.opacity = 0.6;
			// this.view.element.style.left = '40px';
			this.view.element.style.borderLeft = '3px dashed #88bdff';
		}
	}

	dragLeave() {
		if (this.parentCtrl.dragSrc != this) {
			this.view.element.style.opacity = 1;
			// this.view.element.style.left = '0';
			this.view.element.style.borderLeft = 0;
		}
	}

	drop(event) {
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

	dragEnd(){

		this.parentCtrl.fixItemsAfterDrag();

	}
}