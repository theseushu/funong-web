import createTextfield from './fields/createText';
import { required, IDCard } from './validations';

export default createTextfield({ name: 'IDCard', label: '身份证号', validate: [required, IDCard] });
