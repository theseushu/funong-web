import apiSelector from 'api/rootSelector';
import { NAMESPACE } from './constants';

export default (state) => apiSelector(state)[NAMESPACE];
