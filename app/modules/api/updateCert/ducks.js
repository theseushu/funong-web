import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setCerts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'updateCert',
  sagas: {
    * fulfilled(cert) { // since the limitation of the api, here's only the updated attributes
      yield put(setCerts([cert]));
    },
  },
});

module.exports = ducks;
