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
		const fields = [1, 2, 3].map(i => ({
			name: `field_${i}`,
			value: Math.random(),
		}));
		const form = Form(
			Field(fields[0].name),
			Field('someField'),
			Field(fields[1].name),
			Field('someAnotherOneField'),
			Field(fields[2].name),
		);
		const toValidate = fields.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {});
		assert.deepStrictEqual(form.validate(toValidate), toValidate);
	});
});

describe('required', () => {
	describe('form errors', () => {
		it('required field not provided', () => {
			const fieldName = 'someRequiredField';
			const form = Form(Field(fieldName).required());
			try {
				form.validate({});
			} catch (err) {
				assert.deepStrictEqual(err, { [fieldName]: ['required'] });
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

describe('string', () => {
	describe('form errors', () => {
		it('not a string', () => {
			const fieldName = 'stringField';
			const form = Form(Field(fieldName).string());
			try {
				form.validate({ [fieldName]: 123 });
			} catch (err) {
				assert.deepStrictEqual(err, { [fieldName]: ['must be a string'] });
				return;
			}
			assert.fail();
		});
	});
	describe('successful', () => {
		it('put string', () => {
			const fieldName = 'stringField';
			const form = Form(Field(fieldName).string());
			const fieldValue = 'someString';
			const body = form.validate({ [fieldName]: fieldValue });
			assert.deepStrictEqual(body, { [fieldName]: fieldValue });
		});
		it('create with two params "string"', () => {
			const fieldName = 'someField';
			const fieldValue = 'someString';
			const form = Form(Field(fieldName).string().string());
			const body = form.validate({ [fieldName]: fieldValue });
			assert.deepStrictEqual(body, { [fieldName]: fieldValue });
		});
	});
});

describe('regexp', () => {
	const fieldName = 'regexpField';
	const form = Form(Field(fieldName).regexp(/^123$/));
	describe('form errors', () => {
		it('not a string', () => {
			try {
				form.validate({ [fieldName]: 123 });
			} catch (err) {
				assert.deepStrictEqual(err, { regexpField: ['must be a string'] });
				return;
			}
			assert.fail();
		});
	});
	describe('successful', () => {
		it('successful form value', () => {
			const body = form.validate({ [fieldName]: '123' });
			assert.deepStrictEqual(body, { [fieldName]: '123' });
		});
	});
});
