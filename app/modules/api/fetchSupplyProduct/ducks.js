import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSupplyProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchSupplyProduct',
  sagas: {
    * fulfilled(product) {
      yield put(setSupplyProducts([product]));
    },
  },
});

module.exports = ducks;
