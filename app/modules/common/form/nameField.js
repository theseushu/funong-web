import createTextfield from './fields/createText';
import { required } from './validations';

export default createTextfield({ name: 'name', label: '名称', validate: [required] });
