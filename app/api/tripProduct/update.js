import { put } from 'redux-saga/effects';
import { setTripProducts } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'update',
  apiName: 'updateTripProduct',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(product) {
      yield put(setTripProducts([product]));
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
