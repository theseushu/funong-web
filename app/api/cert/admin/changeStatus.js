import _find from 'lodash/find';
import { put, select } from 'redux-saga/effects';
import { setCerts } from 'modules/data/ducks/actions';
import { certsSelector } from 'modules/data/ducks/selectors';
import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createCompositeDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'changeStatus',
  apiName: 'changeStatus',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(result, { payload: { objectId, status } }) {
      const certs = yield select(certsSelector);
      const cert = _find(certs, (c) => c.objectId === objectId);
      yield put(setCerts([{ ...cert, status }]));
    },
  },
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;
