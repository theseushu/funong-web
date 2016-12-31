import { call, put, select } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setProduct } from '../../data/ducks/actions';
import { currentUserSelector } from '../../data/ducks/selectors';

const ducks = createDucks({
  apiName: 'createProduct',
  sagas: {
    * fulfilled(product) {
      yield put(setProduct(product));
    },
    * api(method, payload) {
      const user = yield select(currentUserSelector);
      const product = yield call(method, { ...payload, owner: user });
      return product;
    },
  },
});

module.exports = ducks;
