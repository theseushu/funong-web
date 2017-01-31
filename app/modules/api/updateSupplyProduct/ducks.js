import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSupplyProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'updateSupplyProduct',
  sagas: {
    * fulfilled(supplyProduct) {
      yield put(setSupplyProducts([supplyProduct]));
    },
  },
});

module.exports = ducks;
