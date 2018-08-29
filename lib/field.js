export class Field {

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
	required(message = 'required') {
		this._rules.required = { message };
		return this;
	}

	validate(value) {
		if (this._rules.required) {
			if (typeof value === 'undefined') throw [this._rules.required.message];
		}
		return value;
	}

}

export default function (name) {
	return new Field(name);
}
