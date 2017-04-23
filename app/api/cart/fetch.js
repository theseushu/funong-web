import { put } from 'redux-saga/effects';
import { setCartItems } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'fetch',
  apiName: 'fetchCartItems',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(items) {
      yield put(setCartItems(items));
    },
  },
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;

