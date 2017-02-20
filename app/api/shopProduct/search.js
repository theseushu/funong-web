import { put } from 'redux-saga/effects';
import { setShopProducts } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createCompositeDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'search',
  apiName: 'searchShopProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setShopProducts(products));
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
