import FormError from './form-error';

export class Form {

	/** @param {[Field]} fields */
	constructor(...fields) {
		/** @private */
		this._fields = fields;
	}

	validate(form) {
		const formError = new FormError();
		const resultForm = {};
		for (const field of this._fields) {
			try {
				const value = field.validate(form[field.name]);
				if (typeof value !== 'undefined') resultForm[field.name] = value;
			} catch (err) {
				formError.add(field.name, err);
			}
		}
		if (formError.isEmpty) return resultForm;
		else throw formError.toObject();
	}

}

export default function (...fields) {
	return new Form(...fields);
}
