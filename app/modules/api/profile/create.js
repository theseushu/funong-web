import { put, select } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../createDucks';
import rootSelector from './rootSelector';
import { setCurrentUser } from '../../data/ducks/actions';
import { currentUserSelector } from '../../data/ducks/selectors';

const ducks = createDucks({
  key: 'create',
  apiName: 'createProfile',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(profile) {
      const user = yield select(currentUserSelector);
      yield put(setCurrentUser({ ...user, profile }));
    },
  },
});

// shape of ducks
// {
//   actions: { create },
//   default: { create: reducer },
//   selector rootSelector.create,
//   sagas,
// }

module.exports = ducks;
