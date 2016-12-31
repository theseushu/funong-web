import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setCurrentUser } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchProfile',
  sagas: {
    * fulfilled(profile) {
      yield put(setCurrentUser(profile));
    },
  },
});

module.exports = ducks;
