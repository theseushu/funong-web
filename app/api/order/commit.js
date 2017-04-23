import { put } from 'redux-saga/effects';
import { setOrders } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createCompositeDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'commit',
  apiName: 'commitOrder',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(order) {
      yield put(setOrders([order]));
    },
  },
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
