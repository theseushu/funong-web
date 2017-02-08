import { call, put, select } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSpecifications } from '../../data/ducks/actions';
import { currentUserSelector } from '../../data/ducks/selectors';

const ducks = createDucks({
  apiName: 'createSpecification',
  sagas: {
    * fulfilled(spec) {
      yield put(setSpecifications([spec]));
    },
    * api(method, payload) {
      const user = yield select(currentUserSelector);
      const product = yield call(method, { ...payload, creator: user });
      return product;
    },
  },
});

module.exports = ducks;
