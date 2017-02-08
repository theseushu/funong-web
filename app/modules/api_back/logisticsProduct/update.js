import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../createDucks';
import rootSelector from './rootSelector';
import { setLogisticsProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  key: 'update',
  apiName: 'updateLogisticsProduct',
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
//   actions: { create },
//   default: { create: reducer },
//   selector rootSelector.create,
//   sagas,
// }

module.exports = ducks;
