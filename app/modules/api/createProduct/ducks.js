import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';

import createRestCallStateReducer from '../ducks/createRestCallStateReducer';

import { currentUserSelector } from '../../data/ducks/selectors';
import { setProduct } from '../../data/ducks/actions';

const CREATE_PRODUCT = 'api/create_product';
const CREATE_PRODUCT_STATE = 'api/create_product_state';

export default {
  createProduct: createRestCallStateReducer(CREATE_PRODUCT_STATE),
};

export const actions = {
  createProduct: ({ species, specifications, price, available, startAt, endAt, location, geopoint, desc, photos, meta = {} }) =>
    ({ type: CREATE_PRODUCT, payload: { species, specifications, price, available, startAt, endAt, location, geopoint, desc, photos }, meta }),
};

export const selector = createSelector(rootSelector, (api) => api.createProduct);

export function* createProductSaga({ payload: { species, specifications, price, available, startAt, endAt, location, geopoint, desc, photos }, meta: { resolve, reject } }, api) {
  yield put({ type: CREATE_PRODUCT_STATE, payload: { pending: true } });
  try {
    const currentUser = yield select(currentUserSelector);
    console.log(1)
    const prod = yield call(api.createProduct, { species, specifications, price, available, startAt, endAt, location, geopoint, desc, photos, owner: currentUser });
    console.log(prod)
    yield put(setProduct([prod]));
    yield put({ type: CREATE_PRODUCT_STATE, payload: { fulfilled: true } });
    if (typeof resolve === 'function') {
      resolve(prod);
    }
  } catch (error) {
    yield put({ type: CREATE_PRODUCT_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(CREATE_PRODUCT, function* saga(action) {
    console.log(0)
    yield* createProductSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
