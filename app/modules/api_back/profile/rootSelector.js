import apiSelector from '../ducks/rootSelector';
import { SLICE_NAME } from './constants';

export default (state) => apiSelector(state)[SLICE_NAME];
