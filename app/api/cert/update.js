import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';
import { setCerts } from '../../modules/data/ducks/actions';

const ducks = createDucks({
  key: 'update',
  apiName: 'updateCert',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(cert) {
      yield put(setCerts([cert]));
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
