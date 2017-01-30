import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSupplyProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchSupplyProducts',
  sagas: {
    * fulfilled(products) {
      yield put(setSupplyProducts(products));
    },
  },
});

module.exports = ducks;
