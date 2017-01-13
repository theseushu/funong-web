import { put, select } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setCurrentUser } from '../../data/ducks/actions';
import { currentUserSelector } from '../../data/ducks/selectors';

const ducks = createDucks({
  apiName: 'updateProfile',
  sagas: {
    * fulfilled(attrs) { // since the limitation of the api, here's only the updated attributes
      const user = yield select(currentUserSelector);
      yield put(setCurrentUser({ ...user, profile: { ...user.profile, ...attrs } }));
    },
  },
});

module.exports = ducks;
