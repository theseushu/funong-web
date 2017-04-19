import { put, select } from 'redux-saga/effects';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { setCurrentUser } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'update',
  apiName: 'updateProfile',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled({ ...attrs }) {
      const currentUser = yield select(currentUserSelector);
      yield put(setCurrentUser({ ...currentUser, ...attrs }));
    },
  },
});

// shape of ducks
// {
//   actions: { update },
//   default: { update: reducer },
//   selector rootSelector.create,
//   sagas,
// }

module.exports = ducks;
