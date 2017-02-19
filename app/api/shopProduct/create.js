import { put } from 'redux-saga/effects';
import { setShopProducts } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'create',
  apiName: 'createShopProduct',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(product) {
      yield put(setShopProducts([product]));
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
