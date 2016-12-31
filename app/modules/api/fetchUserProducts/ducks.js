import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';
import createRestCallStateReducer from '../ducks/createRestCallStateReducer';

import { setProducts } from '../../data/ducks/actions';

const FETCH_USER_PRODUCTS = 'api/fetch_user_products';
const FETCH_USER_PRODUCTS_STATE = 'api/fetch_user_products_state';

export default {
  fetchUserProducts: createRestCallStateReducer(FETCH_USER_PRODUCTS_STATE),
};

export const actions = {
  fetchUserProducts: ({ user, meta = {} }) => ({ type: FETCH_USER_PRODUCTS, payload: { user }, meta }),
};

export const selector = createSelector(rootSelector, (api) => api.fetchUserProducts);

function* fetchUserProductsSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { user } = action.payload;
  yield put({ type: FETCH_USER_PRODUCTS_STATE, payload: { pending: true } });
  try {
    const products = yield call(api.fetchUserProducts, { user });
    yield put({ type: FETCH_USER_PRODUCTS_STATE, payload: { fulfilled: true } });
    yield put(setProducts(products));
    if (typeof resolve === 'function') {
      resolve(products);
    }
  } catch (error) {
    yield put({ type: FETCH_USER_PRODUCTS_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_USER_PRODUCTS, function* saga(action) {
    yield* fetchUserProductsSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
