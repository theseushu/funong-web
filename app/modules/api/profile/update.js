import { put, select } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../createDucks';
import rootSelector from './rootSelector';
import { setCurrentUser } from '../../data/ducks/actions';
import { currentUserSelector } from '../../data/ducks/selectors';

const ducks = createDucks({
  key: 'update',
  apiName: 'updateProfile',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(attrs) { // since the limitation of the api, here's only the updated attributes
      const user = yield select(currentUserSelector);
      yield put(setCurrentUser({ ...user, profile: { ...user.profile, ...attrs } }));
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
