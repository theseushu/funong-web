import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';
import createRestCallStateReducer from '../ducks/createRestCallStateReducer';

import { setProduct } from '../../data/ducks/actions';

const FETCH_PRODUCT = 'api/fetch_product';
const FETCH_PRODUCT_STATE = 'api/fetch_product_state';

export default {
  fetchProduct: createRestCallStateReducer(FETCH_PRODUCT_STATE),
};

export const actions = {
  fetchProduct: ({ objectId, meta = {} }) => ({ type: FETCH_PRODUCT, payload: { objectId }, meta }),
};

export const selector = createSelector(rootSelector, (api) => api.fetchProduct);

function* fetchProductSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { objectId } = action.payload;
  yield put({ type: FETCH_PRODUCT_STATE, payload: { pending: true } });
  try {
    const product = yield call(api.fetchProduct, objectId);
    yield put({ type: FETCH_PRODUCT_STATE, payload: { fulfilled: true } });
    yield put(setProduct(product));
    if (typeof resolve === 'function') {
      resolve(product);
    }
  } catch (error) {
    yield put({ type: FETCH_PRODUCT_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_PRODUCT, function* saga(action) {
    yield* fetchProductSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
