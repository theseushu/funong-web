import { put } from 'redux-saga/effects';
import _without from 'lodash/without';
import { setUsers } from 'modules/data/ducks/actions';
import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createCompositeDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'removeUserFromRole',
  apiName: 'removeUserFromRole',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(result, { payload: { user, role } }) {
      yield put(setUsers([{ ...user, roles: _without(user.roles, role.name) }]));
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
