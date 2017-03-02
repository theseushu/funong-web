import apiSelector from '../rootSelector';
import { SLICE_NAME } from './constants';

export default (state) => apiSelector(state)[SLICE_NAME];
