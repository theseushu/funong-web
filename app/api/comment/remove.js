import { put } from 'redux-saga/effects';
import { setCerts } from 'modules/data/ducks/actions';
import { statusValues } from 'funong-common/lib/appConstants';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'remove',
  apiName: 'changeCommentStatus',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(cert) {
      yield put(setCerts([cert]));
    },
  },
});

const changeCommentStatus = ducks.actions.remove;
ducks.actions.remove = ({ objectId }) => changeCommentStatus({ objectId, status: statusValues.removed.value });

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
