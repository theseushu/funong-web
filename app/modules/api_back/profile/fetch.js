import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../createDucks';
import rootSelector from './rootSelector';
import { setCurrentUser } from '../../data/ducks/actions';

const ducks = createDucks({
  key: 'fetch',
  apiName: 'fetchProfile',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(profile) {
      yield put(setCurrentUser(profile));
    },
  },
});

// shape of ducks
// {
//   actions: { fetch },
//   default: { fetch: reducer },
//   selector rootSelector.fetch,
//   sagas,
// }

module.exports = ducks;
