import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setCerts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'initAMap',
  sagas: {
    * fulfilled(cert) {
      yield put(setCerts([cert]));
    },
  },
});

module.exports = ducks;
