import { put, select } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setCurrentUser } from '../../data/ducks/actions';
import { currentUserSelector } from '../../data/ducks/selectors';

const ducks = createDucks({
  apiName: 'createProfile',
  sagas: {
    * fulfilled(profile) {
      const user = yield select(currentUserSelector);
      yield put(setCurrentUser({ ...user, profile }));
    },
  },
});

module.exports = ducks;
