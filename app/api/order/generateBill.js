import { NAMESPACE } from './constants';
import createDucks from '../utils/createCompositeDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'generateBill',
  apiName: 'generateBeecloudBill',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {},
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;
