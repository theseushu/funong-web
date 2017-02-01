import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../createDucks';
import rootSelector from './rootSelector';
import { setSupplyProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  key: 'create',
  apiName: 'createSupplyProduct',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setSupplyProducts(products));
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
