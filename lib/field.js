export class Field {

	constructor(name) {
		/** @private */
		this._name = name;
		this._rules = {
			validators: [],
		};
		this.errors = {
			TYPE_ALREADY_PROVIDED: 'type of the field was already provided',
			UNKNOWN_TYPE: 'unknown type was provided in rules.type',
		};
	}

	get name() {
		return this._name;
	}

	/** @returns {Field} */
	required(message = 'required') {
		this._rules.required = { message };
		return this;
	}

	/**
	 * @param {String?} message
	 * @returns {Field}
	 */
	string(message = 'must be a string') {
		if (this._rules.type) {
			if (this._rules.type.value !== 'string') throw new Error(this.errors.TYPE_ALREADY_PROVIDED);
			return this;
		}
		this._rules.type = { value: 'string', message };
		return this;
	}

	/**
	 * @param {RegExp} regexp
	 * @param {String?} message
	 */
	regexp(regexp, message = 'invalid format') {
		this.string();
		this._rules.validators.push((value) => {
			if (!regexp.test(value)) throw [message];
		});
		return this;
	}

	validate(value) {
		if (this._rules.required) {
			if (typeof value === 'undefined') throw [this._rules.required.message];
		}
		if (this._rules.type) {
			switch (this._rules.type.value) {
				case 'string':
					if (typeof value !== 'string') throw [this._rules.type.message];
					break;
			}
		}
		for (const validator of this._rules.validators) {
			validator(value);
			// TODO: use this code when casting will be done
			// const valueFromValidator = validator(value);
			// if (typeof valueFromValidator !== 'undefined') value = valueFromValidator;
		}
		return value;
	}

}

export default function (name) {
	return new Field(name);
}
