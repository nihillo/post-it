import {html as templateClassy} from './templates/classy.js';
import {html as templateKitsch} from './templates/kitsch.js';

var templates = {
	'classy': templateClassy,
	'kitsch': templateKitsch
};

export class View {
	constructor(content, skin) {
		this.content = content; 			// Array with json post-it objects;
		this.template = templates[skin];	// HTML template

		this.container = document.getElementById('content');

		this.drawUI();
	}

	drawUI() {
		this.container.innerHTML = Mustache.render(this.template, this.content);
	}
}

class Template {
	
}