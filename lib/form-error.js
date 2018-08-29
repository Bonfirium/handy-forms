export default class FormError {

	constructor() {
		this._stack = null;
		this._errors = null;
	}

	add(fieldName, error) {
		// TODO: validation on strings
		if (!this._errors) {
			this._stack = new Error().stack;
			this._errors = {};
		}
		if (!this._errors[fieldName]) this._errors[fieldName] = [];
		this._errors[fieldName].push(...typeof error === 'string' ? [error] : error);
		return this;
	}

	toObject() {
		// TODO: add deep cloning
		return this._errors;
	}

	get isEmpty() {
		return !this._errors;
	}

}
