import FormError from './form-error';

export default class Form {

	/** @param {[Field]} fields */
	constructor(fields) {
		/** @private */
		this._fields = fields;
	}

	validate(form) {
		const formError = new FormError();
		const resultForm = {};
		for (const field of this._fields) {
			try {
				resultForm[field.name] = field.validate(form[field.name]);
			} catch (err) {
				formError.add(field.name, err);
			}
		}
		if (formError.isEmpty) return resultForm;
		else throw formError.toObject();
	}

}
