/**
 * this api is different than others like lean cloud
 * data returned from this api can be considered immutable
 *
 * I don't think normalize them is necessary at all. (normalize is for keeping consistency, not for easy using)
 * So, data here won't be a part of module 'data'.
 * A simple cache will be used to cache names have been searched (never expiring cache. as the whole data set is about 70kb and user will hardly call this api a lot)
 */
import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../rootSelector';
const SEARCH_DISTRICT = 'api/search_district';
const SEARCH_DISTRICT_STATE = 'api/search_district_state';
const UPDATE_DISTRICTS = 'api/update_districts';

function generateKey({ name, level, subdistrict }) {
  return JSON.stringify({ name, level, subdistrict });
}

export default {
  searchDistrict: (state = { searches: {} }, action) => {
    if (action.type === SEARCH_DISTRICT_STATE) {
      return Object.assign({}, state, {
        pending: undefined,
        fulfilled: undefined,
        rejected: undefined,
        error: undefined,
        key: undefined,
      }, action.payload);
    } else if (action.type === UPDATE_DISTRICTS) {
      const { key, districtList } = action.payload;
      if (state.searches[key]) {
        return state;
      }
      const searches = Object.assign({}, state.searches, { [key]: districtList });
      return Object.assign(state, { searches });
    }
    return state;
  },
};

export const actions = {
  searchDistrict: ({ name, meta = {} }) => ({ type: SEARCH_DISTRICT, payload: { name, level: null, subdistrict: 1 }, meta }),
  searchSubdistrict: ({ name, level, meta = {} }) => ({ type: SEARCH_DISTRICT, payload: { name, level, subdistrict: 2 }, meta }),
};

export const selector = createSelector(rootSelector,
  (api) => Object.assign({}, api.searchDistrict, { result: api.searchDistrict.result && api.searchDistrict.searches[api.searchDistrict.result] }));

function* searchDistrictSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { name, level, subdistrict } = action.payload;
  const key = generateKey({ name, level, subdistrict });
  const { searches } = yield select(selector);
  if (searches[key]) {
    yield put({ type: SEARCH_DISTRICT_STATE, payload: { fulfilled: true, result: key } });
    if (typeof resolve === 'function') {
      resolve(searches[key]);
    }
  } else {
    yield put({ type: SEARCH_DISTRICT_STATE, payload: { pending: true } });
    try {
      const districts = yield call(api.searchDistrict, { name, level, subdistrict });
      const result = subdistrict === 0 ? districts : (districts[0] && districts[0].districtList);
      yield put({ type: UPDATE_DISTRICTS, payload: { key, districtList: result } });
      yield put({ type: SEARCH_DISTRICT_STATE, payload: { fulfilled: true, result: key } });
      if (typeof resolve === 'function') {
        resolve(districts);
      }
    } catch (error) {
      yield put({ type: SEARCH_DISTRICT_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject({ code: 'unknown', message: `无法读取地区${name}` });
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(SEARCH_DISTRICT, function* saga(action) {
    yield* searchDistrictSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
