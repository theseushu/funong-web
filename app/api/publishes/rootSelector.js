import apiSelector from 'api/rootSelector';
import { SLICE_NAME } from './constants';

export default (state) => apiSelector(state)[SLICE_NAME];
