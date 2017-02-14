import { put } from 'redux-saga/effects';
import _concat from 'lodash/concat';
import { setUsers } from 'modules/data/ducks/actions';
import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createCompositeDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'addUserToRole',
  apiName: 'addUserToRole',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(result, { payload: { user, role } }) {
      yield put(setUsers([{ ...user, roles: _concat(user.roles, role.name) }]));
    },
  },
});

// shape of ducks
// {
//   actions: { addUserToRole },
//   default: { addUserToRole: reducer },
//   selector,
//   sagas,
// }

module.exports = ducks;
