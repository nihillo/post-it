/* MODEL ENCAPSULATION */

/* 
	The aim of this module is to encapsulate model so as we can
   	use either an intern Model class or a REST API, without changing any
   	controller methods.
	
	Model, whatever kind it is, must have the following endpoints:
	- create:  parameters title, text; create a new note
	- readAll: return all notes
	- read:    parameter id; return note by id
	- update:  parameters id, title, text; modify note by id
	- delete:  parameter id; delete note by id

   	In any of both kinds of model, its endpoints should return a JSON object
   	with this format:

   	{
		"success": 	,		// true/false,
		"response": { 		// if success true
			"status": "", 	// if REST API, http response code
			"data": {		// depending on type of request, an object or an array of objects
			},
		},	
		"error" : {			// if success false
			"code": "",		// error code
			"message": ""	// error message
		}
   	} 
*/



// This is a ModelConnect definition for an internal Model class which stores
// notes in Local Storage.
// In case of using a REST API, we should define static methods
// in another way, in order to trigger AJAX requests to API endpoints

import {Model} from '../model/model.js';
import {UserPreferences} from '../model/user-preferences.js';

const MODEL = new Model();
const PREFERENCES = new UserPreferences();

export class ModelConnect {

	static create(title, text) {
		return MODEL.create(title, text);
	}

	static readAll() {
		return MODEL.readAll();
	}

	static read(id) {
		return MODEL.read(id);
	}

	static update(id, title = null, text = null, position = null) {
		return MODEL.update(id, title, text, position);
	}

	static delete(id) {
		return MODEL.delete(id);
	}


	static get userSkin() {
		return PREFERENCES.skin;
	}

	static setSkin(skin) {
		PREFERENCES.setSkin(skin);
	}
}