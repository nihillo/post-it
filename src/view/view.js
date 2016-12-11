import {note as templateClassy} from './templates/classy.js';
import {note as templateKitsch} from './templates/kitsch.js';

var templates = {
	'classy': templateClassy,
	'kitsch': templateKitsch
};

export class View {
	constructor(skin) {
		this.container = document.getElementById('content');
		this.template = templates[skin];	// HTML template
	}

	appendCreator() {
		var template = this.template.creator;
		
		var auxParent = document.createElement('div');
		auxParent.innerHTML = Mustache.render(template, {});

		this.creator = auxParent.children[0];
		this.container.appendChild(this.creator); 
	}
}




export class ViewNote {
	constructor(state, data, container, skin) {
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

	updateNote(data) {
		this.data = data;
		this.redrawNote('saved');
	}

	drawNote(state='saved') {
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

	redrawNote(toState = 'saved') {
		this.removeNote();
		this.drawNote(toState);
	}

	removeNote() {
		this.container.removeChild(this.element);
	}

	createDomElement(template, data) {
		var auxParent = document.createElement('div');
		auxParent.innerHTML = Mustache.render(template, data);

		return auxParent.children[0];
	}

	insertInPlace(element, place='end') {
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
}