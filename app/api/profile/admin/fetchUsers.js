import { put } from 'redux-saga/effects';
import { setUsers } from 'modules/data/ducks/actions';
import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'fetchUsers',
  apiName: 'fetchUsers',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(users) {
      yield put(setUsers(users));
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
