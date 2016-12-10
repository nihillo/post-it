var config = require('../../config.js');

export class UserPreferences {
	constructor() {
		var preferences = this.load() ? this.load() : {};

		this.skin = preferences.skin ? preferences.skin : config.DEFAULT_SKIN;
	}





	get storage() {
		if (typeof(Storage) !== "undefined") {
		   return localStorage;
		} else {
		   console.log('Error: This browser has no Local Storage support');
		}
	}

	load() {
		return JSON.parse(this.storage.getItem('user-preferences'));
	}

	save() {
		this.storage.setItem('user-preferences', JSON.stringify(this.notes));
	}
}