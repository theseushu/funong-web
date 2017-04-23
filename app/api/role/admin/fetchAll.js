import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createDucks';
import rootSelector from '../rootSelector';

// no need to put in data since its not shared
const ducks = createDucks({
  key: 'fetchAll',
  apiName: 'fetchAllRoles',
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

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
