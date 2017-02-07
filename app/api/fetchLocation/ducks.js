/**
 * see comments in searchDistinct/ducks for the reason why result is not put in store.state.data
 */
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../rootSelector';

const FETCH_LOCATION = 'api/fetch_location';
const FETCH_LOCATION_STATE = 'api/fetch_location_state';
const SET_LOCATION = 'api/set_location';

export default {
  fetchLocation: (state = {}, action) => {
    if (action.type === FETCH_LOCATION_STATE) {
      return Object.assign({}, state, {
        pending: undefined,
        fulfilled: undefined,
        rejected: undefined,
        error: undefined,
      }, action.payload);
    } else if (action.type === SET_LOCATION) {
      const { location } = action.payload;
      return Object.assign(state, { location });
    }
    return state;
  },
};

export const actions = {
  fetchLocation: ({ meta = {} }) => ({ type: FETCH_LOCATION, meta, payload: {} }),
};

export const selector = createSelector(rootSelector, (api) => api.fetchLocation);

function* fetchLocationSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { location } = yield select(selector);
  if (location) {
    if (typeof resolve === 'function') {
      resolve(location);
    }
  } else {
    yield put({ type: FETCH_LOCATION_STATE, payload: { pending: true } });
    try {
      const result = yield call(api.getCurrentLocation);
      yield put({ type: SET_LOCATION, payload: { location: result } });
      yield put({ type: FETCH_LOCATION_STATE, payload: { fulfilled: true } });
      if (typeof resolve === 'function') {
        resolve(result);
      }
    } catch (error) {
      yield put({ type: FETCH_LOCATION_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject({ code: 'unknown', message: `无法读取地区${name}` });
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_LOCATION, function* saga(action) {
    yield* fetchLocationSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
