import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setProducts } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchUserProducts',
  sagas: {
    * fulfilled(products) {
      yield put(setProducts(products));
    },
  },
});

module.exports = ducks;
