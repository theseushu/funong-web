import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setProduct } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchProduct',
  sagas: {
    * fulfilled(product) {
      yield put(setProduct(product));
    },
  },
});

module.exports = ducks;
