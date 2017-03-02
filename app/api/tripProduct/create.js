import { put } from 'redux-saga/effects';
import { setTripProducts } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'create',
  apiName: 'createTripProduct',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(product) {
      yield put(setTripProducts([product]));
    },
  },
});

module.exports = ducks;
