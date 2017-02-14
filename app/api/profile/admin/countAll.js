import { NAMESPACE } from '../constants';
import createDucks from '../../utils/createDucks';
import rootSelector from '../rootSelector';

const ducks = createDucks({
  key: 'countAll',
  apiName: 'countAllUsers',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(result) {
      return { result };
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
