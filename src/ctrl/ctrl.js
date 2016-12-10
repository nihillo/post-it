import {ModelConnect} from './configmodel.js';
import {View} from '../view/view.js';

export class Controller {
	constructor() {
		var skin = ModelConnect.userSkin;
		var content = this.readAll().response;

		this.view = new View(content, skin);

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



	bindEvents() {
		
	}
}