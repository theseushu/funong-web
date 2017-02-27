import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { setSpecies } from 'modules/data/ducks/actions';
import { speciesSelector } from 'modules/data/ducks/selectors';
import rootSelector from './rootSelector';
import { SLICE_NAME } from './constants';


const FETCH_SPECIES = `api/${SLICE_NAME}/fetch_species`;
const FETCH_SPECIES_STATE = `api/${SLICE_NAME}/fetch_species_state`;
const UPDATE_SPECIES = `api/${SLICE_NAME}/update_species`;

function generateKey({ objectId }) {
  return objectId;
}

export default {
  fetchSpecies: (state = { fetched: [] }, action) => {
    if (action.type === FETCH_SPECIES_STATE) {
      return Object.assign({}, action.payload, { fetched: state.fetched }); // override others than searches
    } else if (action.type === UPDATE_SPECIES) {
      const { key } = action.payload;
      if (state.fetched.indexOf(key) >= 0) {
        return state;
      }
      return { ...state, fetched: [...state.fetched, key] };
    }
    return state;
  },
};

export const actions = {
  fetchSpecies: ({ category, meta = {} }) => ({ type: FETCH_SPECIES, payload: { category }, meta }),
};

export const selector = createSelector(rootSelector, (api) => ({ ...api.fetchSpecies }));

function* fetchSpeciesSaga({ payload: { category }, meta }, api) {
  const { resolve, reject } = meta;
  const key = generateKey(category);
  const { fetched } = yield select(selector);
  if (fetched.indexOf(key) >= 0) {
    yield put({ type: FETCH_SPECIES_STATE, payload: { fulfilled: true } });
    if (typeof resolve === 'function') {
      const speciesArray = yield select(speciesSelector);
      resolve(speciesArray.filter((species) => species.category.objectId === category.objectId));
    }
  } else {
    yield put({ type: FETCH_SPECIES_STATE, payload: { pending: true } });
    try {
      const speciesArray = yield call(api.fetchSpecies, category);
      yield put(setSpecies(speciesArray));
      yield put({ type: UPDATE_SPECIES, payload: { key: generateKey(category) } });
      yield put({ type: FETCH_SPECIES_STATE, payload: { fulfilled: true } });
      if (typeof resolve === 'function') {
        resolve(speciesArray);
      }
    } catch (error) {
      yield put({ type: FETCH_SPECIES_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject(error);
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_SPECIES, function* saga(action) {
    yield* fetchSpeciesSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
