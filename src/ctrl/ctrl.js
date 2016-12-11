import {ModelConnect} from './configmodel.js';
import {View, ViewNote} from '../view/view.js';

export class Controller {
	constructor() {
		this.skin = ModelConnect.userSkin;
		this.view = new View(this.skin);
		
		this.addSavedNotes();
		this.addCreator();
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
		this.notes.push(new CtrlNote('new', this, {}, this.view.container, this.skin));
	}



	create(title, text, order) {
		return ModelConnect.create(title, text, order);
	}

	readAll() {
		return ModelConnect.readAll();
	}

	read(id) {
		return ModelConnect.read(id);
	}

	update(id, title = null, text = null, order = null) {
		return ModelConnect.update(id, title, text, order);
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
				this.dismiss();
			});
		}
	}


	edit() {
		console.log('edit-' + this.data.id);
	}

	delete() {
		this.view.removeNote();
		this.parentCtrl.delete(this.data.id);
	}

	save() {
		var title = document.getElementById('add-title-' + this.data.id);
		var text = document.getElementById('add-text-' + this.data.id);

		var savedNote = this.parentCtrl.create(title.value, text.value, 1);
		this.data = savedNote.response.data;
		
		this.view.updateNote(this.data);
	}

	dismiss() {
		this.view.removeNote();
	}

}