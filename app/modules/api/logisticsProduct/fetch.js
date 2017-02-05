import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../createDucks';
import rootSelector from './rootSelector';
import { setLogisticsProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  key: 'fetch',
  apiName: 'fetchLogisticsProduct',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(product) {
      yield put(setLogisticsProducts([product]));
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
