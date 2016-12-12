import {ModelConnect} from './configmodel.js';
import {View, ViewNote} from '../view/view.js';

export class Controller {
	constructor() {
		this.skin = ModelConnect.userSkin;
		this.view = new View(this.skin);
		
		this.bindEvents();
		this.loadElements();
	}

	bindEvents() {
		this.view.templateSwitch.classy.addEventListener('click', () => {
			this.setSkin('classy');
		});

		this.view.templateSwitch.brutalist.addEventListener('click', () => {
			this.setSkin('brutalist');
		});
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
		var elements = this.view.getFixedElements();

		for (let i = 0; i < elements.length; i++) {
			let pos = i;
			let id = elements[i].id.split('-')[2];

			this.update(id, null, null, pos);
		}

		this.reloadElements();
	}

	
	setSkin(skin) {
		this.skin = skin;
		ModelConnect.setSkin(skin);
		this.view.setSkin(skin);
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
 	
		this.showTime();
		this.view = new ViewNote(this.state, this.data, container, skin);

		this.bindEvents();

		

	}

	formatDates() {
		var d = new Date(this.data.date);
		this.data.fDate = d.toLocaleDateString() + ' - ' + d.toLocaleTimeString();

		var m = new Date(this.data.lastModified);
		this.data.fLastModified = m.toLocaleDateString() + ' - ' + m.toLocaleTimeString();
	}

	timeAgo() {
		var created = new Date(this.data.date);
		var now = new Date();

		var miliseconds = now.getTime() - created.getTime();

		var minutes = Math.floor(miliseconds / 60000);

		if (minutes < 60) { return minutes + ' minutes ago';}

		var hours = Math.floor(minutes / 60); 

		if (hours < 24) {return hours + ' hours ago';}

		var days = Math.floor(hours / 24);

		if (days < 7) { return days + ' days ago';}

		return created.toLocaleDateString();
	}

	showTime() {
		this.data.timeAgo = this.timeAgo();
		window.setInterval(() => {
			this.data.timeAgo = this.timeAgo();
			this.view.updateNote(this.data, this.state);
			this.bindEvents();
		}, 60000);
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
		var values = this.view.getEditValues();

		var savedNote;
		switch(prevState) {
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
		this.view.vanish(0.4);

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
			this.view.vanish(0.6);
			this.view.showCue();			
		}
	}

	dragLeave() {
		if (this.parentCtrl.dragSrc != this) {
			this.view.unvanish();
			this.view.hideCue();
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