export default class Field {

	constructor(name) {
		/** @private */
		this._name = name;
		this._rules = {};
	}

	get name() {
		return this._name;
	}

	get rules() {
		return this._rules;
	}

	/** @returns {Field} */
	get required() {
		this._rules.required = { message: 'required' };
		return this;
	}

	validate(value) {
		if (this._rules.required) {
			if (typeof value === 'undefined') throw [this._rules.required.message];
		}
		return value;
	}

}
