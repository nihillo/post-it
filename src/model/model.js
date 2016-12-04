export class Model {
	constructor() {
		this.notes = this.load() ? this.load() : {};
	}


	/* ENDPOINTS */

	create(title, text, order) {
		var success, data, errorMessage;

		try {
			var note = new Note(title, text, order);
			this.notes[note.date.getTime()] = note;
			this.save();

			success = true;
			data = note;
		}

		catch(err) {
			success = false;
			errorMessage = err.message;
		}
		

		return new Response(success, data, errorMessage);
	}

	readAll() {
		var success, data, errorMessage;

		try {
			if (this.notes) {
				data = this.notes;
				success = true;
			} else {
				throw 'Error: No notes found';
			}
		}

		catch(err) {
			success = false;
			errorMessage = err.message;
		}

		return new Response(success, data, errorMessage);
	}

	read(id) {
		var success, data, errorMessage;

		try {

			if (this.notes[id]) {
				data = this.notes[id];
				success = true;
			} else {
				throw 'Error: Note not found';
			}
		}

		catch(err) {
			success = false;
			errorMessage = err.message;
		}

		return new Response(success, data, errorMessage);
	}

	update(id, title = null, text = null, order = null) {
		var success, data, errorMessage;

		try {
			if (this.notes[id]) {
				var note = this.notes[id];
				var now = new Date();
					
				if (title) {note.title = title;}
				if (text) {note.text = text;}
				if (order) {note.order = order;}

				if (title || text || order) {note.lastModified = now;}

				this.save();

				success = true;
				data = this.notes[id];
			} else {
				throw 'Error: Note not found';
			}
		}

		catch(err) {
			success = false;
			errorMessage = err.message;
		}

		return new Response(success, data, errorMessage);
	}

	delete(id) {
		var success, data, errorMessage;

		try {
			if (this.notes[id]) {
				delete this.notes[id];
				success = true;

				this.save();
			} else {
				throw 'Error: Note not found';
			}
		}

		catch(err) {
			success = false;
			errorMessage = err.message;
		}

		return new Response(success, data, errorMessage);
	}



	/* INTERN METHODS */ 

	get storage() {
		if (typeof(Storage) !== "undefined") {
		   return localStorage;
		} else {
		   console.log('Error: This browser has no Local Storage support');
		}
	}

	load() {
		return JSON.parse(this.storage.getItem('notes'));
	}

	save() {
		this.storage.setItem('notes', JSON.stringify(this.notes));
	}
}


class Note {
	constructor(title, text, order) {
		var now = new Date();

		this.title = title;
		this.text = text;
		this.date = now;
		this.lastModified = now;
		this.order = order;
	}
}


/* AUXILIAR CLASSES */ 

class Response {
	constructor(success, data = null, errorMessage = null) {
		this.success = success;

		if (success) {
			this.response = {};
			if (data) {this.response.data = data;}
		} else {
			this.error = {};
			if (errorMessage) {
				this.error.message = errorMessage;
			} else {
				this.error.message = 'Error: unknown error';
			}
		}
	}
}