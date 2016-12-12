var DEFAULT_SKIN = 'classy';

export class UserPreferences {
	constructor() {
		var skin = this.load() ? this.load() : null;

		this.skin = skin ? skin : DEFAULT_SKIN;
	}


	setSkin(skin) {
		this.skin = skin;
		this.save();
	}


	get storage() {
		if (typeof(Storage) !== "undefined") {
		   return localStorage;
		} else {
		   console.log('Error: This browser has no Local Storage support');
		}
	}

	load() {
		return JSON.parse(this.storage.getItem('skin'));
	}

	save() {
		this.storage.setItem('skin', JSON.stringify(this.skin));
	}
}