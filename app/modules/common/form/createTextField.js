import createTextfield from './utils/createText';
import { required, maxLength } from './validations';

export default (name, label, max, rows) => createTextfield({ name, label, rows, validate: [required, maxLength(max)] });
