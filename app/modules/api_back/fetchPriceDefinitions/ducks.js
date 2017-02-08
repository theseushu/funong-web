/**
 * see comments in searchDistinct/ducks for the reason why result is not put in store.state.data
 */
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';

const FETCH_PRICEDEFINITIONS = 'api/fetch_priceDefinitions';
const FETCH_PRICEDEFINITIONS_STATE = 'api/fetch_priceDefinitions_state';
const SET_PRICEDEFINITIONS = 'api/set_pricedefinitions';

export default {
  fetchPriceDefinitions: (state = {}, action) => {
    if (action.type === FETCH_PRICEDEFINITIONS_STATE) {
      return Object.assign({}, state, {
        pending: undefined,
        fulfilled: undefined,
        rejected: undefined,
        error: undefined,
      }, action.payload);
    } else if (action.type === SET_PRICEDEFINITIONS) {
      const { priceDefinitions } = action.payload;
      return Object.assign(state, { priceDefinitions });
    }
    return state;
  },
};

export const actions = {
  fetchPriceDefinitions: ({ meta = {} }) => ({ type: FETCH_PRICEDEFINITIONS, meta, payload: {} }),
};

export const selector = createSelector(rootSelector, (api) => api.fetchPriceDefinitions);

function* fetchPriceDefinitionsSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { priceDefinitions } = yield select(selector);
  if (priceDefinitions) {
    if (typeof resolve === 'function') {
      resolve(priceDefinitions);
    }
  } else {
    yield put({ type: FETCH_PRICEDEFINITIONS_STATE, payload: { pending: true } });
    try {
      const result = yield call(api.fetchPriceDefinitions);
      yield put({ type: SET_PRICEDEFINITIONS, payload: { priceDefinitions: result } });
      yield put({ type: FETCH_PRICEDEFINITIONS_STATE, payload: { fulfilled: true } });
      if (typeof resolve === 'function') {
        resolve(result);
      }
    } catch (error) {
      yield put({ type: FETCH_PRICEDEFINITIONS_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject({ code: 'unknown', message: `无法读取地区${name}` });
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_PRICEDEFINITIONS, function* saga(action) {
    yield* fetchPriceDefinitionsSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
