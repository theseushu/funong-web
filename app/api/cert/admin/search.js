import { put } from 'redux-saga/effects';
import { setCerts } from 'modules/data/ducks/actions';
import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'search',
  apiName: 'searchAllCerts',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(certs) {
      yield put(setCerts(certs));
    },
  },
});

// shape of ducks
// {
//   actions: { fetch },
//   default: { fetch: reducer },
//   selector rootSelector.fetch,
//   sagas,
// }

module.exports = ducks;
