import { call, put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSupplyProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'createSupplyProduct',
  sagas: {
    * fulfilled(supplyProduct) {
      yield put(setSupplyProducts([supplyProduct]));
    },
    * api(method, payload) {
      const supplyProduct = yield call(method, { ...payload });
      return supplyProduct;
    },
  },
});

module.exports = ducks;
