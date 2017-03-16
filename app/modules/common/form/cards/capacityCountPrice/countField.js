import createTextfield from '../../utils/createText';
import { required, count } from '../../validations';

export default createTextfield({ name: 'count', label: '车辆数（可同时接单数）', validate: [required, count] });
