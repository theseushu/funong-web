import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'fetchUserRoles',
  apiName: 'fetchUserRoles',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(roles) {
      return { roles };
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
