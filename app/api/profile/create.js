import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';
import { setCurrentUser } from '../../modules/data/ducks/actions';

const ducks = createDucks({
  key: 'create',
  apiName: 'createProfile',
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
//   actions: { create },
//   default: { create: reducer },
//   selector rootSelector.create,
//   sagas,
// }

module.exports = ducks;
