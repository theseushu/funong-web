import { put } from 'redux-saga/effects';
import { setBids } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'page',
  apiName: 'pageBids',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(bids) {
      yield put(setBids(bids));
      return { result: bids.map((b) => b.objectId) };
    },
  },
});

module.exports = ducks;
