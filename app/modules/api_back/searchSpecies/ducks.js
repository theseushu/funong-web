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
import rootSelector from '../ducks/rootSelector';

const SEARCH_SPECIES = 'api/search_species';
const SEARCH_SPECIES_STATE = 'api/search_species_state';
const UPDATE_SPECIES = 'api/update_districts';

function generateKey({ name, level, subdistrict }) {
  return JSON.stringify({ name, level, subdistrict });
}

export default {
  updateSpecies: (state = { searches: {} }, action) => {
    if (action.type === SEARCH_SPECIES_STATE) {
      return Object.assign({}, state, {
        pending: undefined,
        fulfilled: undefined,
        rejected: undefined,
        error: undefined,
        key: undefined,
      }, action.payload);
    } else if (action.type === UPDATE_SPECIES) {
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
  updateSpecies: ({ name, meta = {} }) => ({ type: SEARCH_SPECIES, payload: { name, level: null, subdistrict: 1 }, meta }),
  searchSubdistrict: ({ name, level, meta = {} }) => ({ type: SEARCH_SPECIES, payload: { name, level, subdistrict: 2 }, meta }),
};

export const selector = createSelector(rootSelector, (api) => Object.assign({}, api.updateSpecies, { result: api.updateSpecies.result && api.updateSpecies.searches[api.updateSpecies.result] }));

function* updateSpeciesSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { name, level, subdistrict } = action.payload;
  const key = generateKey({ name, level, subdistrict });
  const { searches } = yield select(selector);
  if (searches[key]) {
    yield put({ type: SEARCH_SPECIES_STATE, payload: { fulfilled: true, result: key } });
    if (typeof resolve === 'function') {
      resolve(searches[key]);
    }
  } else {
    yield put({ type: SEARCH_SPECIES_STATE, payload: { pending: true } });
    try {
      const districts = yield call(api.updateSpecies, { name, level, subdistrict });
      const result = subdistrict === 0 ? districts : (districts[0] && districts[0].districtList);
      yield put({ type: UPDATE_SPECIES, payload: { key, districtList: result } });
      yield put({ type: SEARCH_SPECIES_STATE, payload: { fulfilled: true, result: key } });
      if (typeof resolve === 'function') {
        resolve(districts);
      }
    } catch (error) {
      yield put({ type: SEARCH_SPECIES_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject({ code: 'unknown', message: `无法读取地区${name}` });
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(SEARCH_SPECIES, function* saga(action) {
    yield* updateSpeciesSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
