import { put } from 'redux-saga/effects';
import { removeBids } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createCompositeDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'withdraw',
  apiName: 'withdrawBid',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(bid) {
      yield put(removeBids([bid.objectId]));
    },
  },
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;

