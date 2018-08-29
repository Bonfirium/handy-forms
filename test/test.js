import { Form, Field } from '../lib/index';
import assert from 'assert';

describe('empty form', () => {
	it('empty params', () => {
		assert.deepStrictEqual(Form().validate({}), {});
	});
	it('non empty params', () => {
		assert.deepStrictEqual(Form().validate({ a: 1, b: 'c', d: new Date() }), {});
	});
});

describe('without requirements', () => {
	it('empty params', () => {
		const form = Form(
			Field('someField'),
			Field('someAnotherOneField'),
			Field('lastField'),
		);
		assert.deepStrictEqual(form.validate({}), {});
	});
	it('with several params', () => {
		const fields = [1, 2, 3].map(i => `field_${i}`);
		const form = Form(
			Field('someField'),

		)
	})
});

describe('', () => {
	describe('with errors', () => {
		it('required field not provided', () => {
			const fieldName = 'someRequiredField';
			const form = Form(Field(fieldName).required());
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
			const form = Form(Field(fieldName).required());
			assert.deepStrictEqual(form.validate({ [fieldName]: fieldValue }), { [fieldName]: fieldValue });
		});
	});
});
