import _find from 'lodash/find';
import { put, select } from 'redux-saga/effects';
import { setCerts } from 'modules/data/ducks/actions';
import { certsSelector } from 'modules/data/ducks/selectors';
import { statusValues } from 'appConstants';
import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createCompositeDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'verify',
  apiName: 'verifyCert',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(result, { payload: { objectId } }) {
      const certs = yield select(certsSelector);
      const cert = _find(certs, (c) => c.objectId === objectId);
      yield put(setCerts([{ ...cert, status: statusValues.verified.value }]));
    },
  },
});

// shape of ducks
// {
//   actions: { verify },
//   default: { verify: reducer },
//   selector rootSelector.verify,
//   sagas,
// }

module.exports = ducks;
