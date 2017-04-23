import { put } from 'redux-saga/effects';
import { setBids } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createCompositeDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'update',
  apiName: 'updateBid',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(bid) {
      yield put(setBids([bid]));
    },
  },
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;

