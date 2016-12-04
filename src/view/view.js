/*export */class View {
	constructor(content, template, styles) {
		this.content = content; 	// Array with json post-it objects;
		this.template = template;	// Template object which generates dom elements
		this.styles = styles;		// String with css file location


		this.drawUI();
	}

	drawUI() {

	}
}

class Template {
	
}


// var viewClassy = new View();
// var viewKitsch = new View();