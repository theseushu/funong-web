import createTextfield from './fields/createText';
import { required, maxLength } from './validations';

export default (name, label, max) => createTextfield({ name, label, validate: [required, maxLength(max)] });
