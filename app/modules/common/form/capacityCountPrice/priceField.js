import createTextfield from '../fields/createText';
import { required } from '../validations';

export default createTextfield({ name: 'price', label: '定价（请描述您的定价策略）', rows: 2, validate: [required] });
