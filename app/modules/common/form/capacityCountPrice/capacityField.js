import createTextfield from '../fields/createText';
import { required, capacity } from '../validations';

export default createTextfield({ name: 'capacity', label: '最大运输量', validate: [required, capacity] });
