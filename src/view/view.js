import {note as templateClassy} from './templates/classy.js';
import {note as templateBrutalist} from './templates/brutalist.js';

var templates = {
	'classy': templateClassy,
	'brutalist': templateBrutalist
};

export class View {
	constructor(skin) {
		this.container = document.getElementById('content');
		this.template = templates[skin];	// HTML template
		document.body.className = skin;
		this.templateSwitch = this.getTemplateSwitch();
	}

	getTemplateSwitch() {
		return {
			classy: document.getElementById('set-skin-classy'),
			brutalist: document.getElementById('set-skin-brutalist')
		};
	}

	setSkin(skin) {
		this.template = templates[skin];
		document.body.className = skin;
	}

	appendCreator() {
		var template = this.template.creator;
		
		var auxParent = document.createElement('div');
		auxParent.innerHTML = Mustache.render(template, {});

		this.creator = auxParent.children[0];
		this.container.appendChild(this.creator); 
	}

	clear() {
		this.container.innerHTML = '';
	}

	getAddNew() {
		return document.getElementById('post-it-new');
	}

	getDraggable() {
		return document.querySelectorAll('[draggable="true"]');
	}

	fixItemsAfterDrag() {
		var elements = this.getDraggable();
		for (let i = 0; i < elements.length; i++) {
			elements[i].style.opacity = '1';	
		}
	}

	getFixedElements() {
		return document.querySelectorAll('[data-fixed="true"]');
	}
}




export class ViewNote {
	constructor(state, data, container, skin) {
		this.data = data;
		this.state = state;
		this.container = container;
		this.template = templates[skin];

		this.drawNote(this.state);

		this.controls = this.getControls();
	}

	getControls() {
		return {
			edit: document.getElementById('edit-' + this.data.id), 
			delete: document.getElementById('delete-' + this.data.id),
			ok: document.getElementById('ok-' + this.data.id),
			cancel: document.getElementById('cancel-' + this.data.id)
		};
	}

	updateNote(data, toState) {
		this.data = data;
		this.state = toState;
		this.redrawNote(toState);
		this.controls = this.getControls();
	}

	drawNote(state='saved') {
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

	getEditValues() {
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

	insertInPlace(element, place='end') {
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

	searchNextElmByPosition(pos) {

		for (let i = 0; i < this.container.children.length; i++) {
			if (this.container.children[i].getAttribute('data-pos') > pos) {
				return this.container.children[i];
			}
		}

		return null;
	}

	vanish(amount) {
		this.element.style.opacity = amount;
	}

	unvanish() {
		this.element.style.opacity = 1;
	}

	showCue() {
		this.element.style.borderLeft = '3px dashed #88bdff';
	}

	hideCue() {
		this.element.style.borderLeft = 0;
	}
}