import { Form, Field } from '../lib/index';
import assert from 'assert';

describe('some describe', () => {
	describe('with errors', () => {
		it('required field not provided', () => {
			const fieldName = 'someRequiredField';
			const form = Form(Field(fieldName).required);
			try {
				form.validate({});
			} catch (err) {
				assert.deepStrictEqual(err, { someRequiredField: ['required'] });
				return;
			}
			assert.fail();
		});
	});
	describe('successful', () => {
		it('required field provided', () => {
			const fieldName = 'someRequiredField';
			const fieldValue = 123;
			const form = Form(Field(fieldName).required);
			assert.deepStrictEqual(form.validate({ [fieldName]: fieldValue }), { [fieldName]: fieldValue });
		});
	});
});
