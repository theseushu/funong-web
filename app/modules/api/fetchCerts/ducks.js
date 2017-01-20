import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setCerts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchCerts',
  sagas: {
    * fulfilled(certs) { // since the limitation of the api, here's only the updated attributes
      if (certs) {
        yield put(setCerts(certs));
      }
    },
  },
});

module.exports = ducks;
