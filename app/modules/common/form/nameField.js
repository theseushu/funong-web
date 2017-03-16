import createTextfield from './utils/createText';
import { required } from './validations';

export default createTextfield({ name: 'name', label: '名称', validate: [required] });
