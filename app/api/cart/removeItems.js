import { put } from 'redux-saga/effects';
import { removeCartItems } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'removeItems',
  apiName: 'removeCartItems',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(ids) {
      yield put(removeCartItems(ids));
    },
  },
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;

