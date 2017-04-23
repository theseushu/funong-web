import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'center',
  apiName: 'centerMap',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {},
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
