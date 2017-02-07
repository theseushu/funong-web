import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { setSpecies } from 'modules/data/ducks/actions';
import { speciesSelector } from 'modules/data/ducks/selectors';
import rootSelector from '../rootSelector';


const FETCH_SPECIES = 'api/fetch_species';
const FETCH_SPECIES_STATE = 'api/fetch_species_state';
const UPDATE_SPECIES = 'api/update_species';

function generateKey({ objectId }) {
  return objectId;
}

export default {
  fetchSpecies: (state = { searches: {} }, action) => {
    if (action.type === FETCH_SPECIES_STATE) {
      return Object.assign({}, action.payload, { searches: state.searches }); // override others than searches
    } else if (action.type === UPDATE_SPECIES) {
      const { key, species } = action.payload;
      if (state.searches[key]) {
        return state;
      }
      const searches = Object.assign({}, state.searches, { [key]: species });
      return Object.assign(state, { searches });
    }
    return state;
  },
};

export const actions = {
  fetchSpecies: ({ category, meta = {} }) => ({ type: FETCH_SPECIES, payload: { category }, meta }),
};


export const selector = createSelector([rootSelector, speciesSelector],
  (api, species) => ({ ...api.fetchSpecies, species: api.fetchSpecies.result && api.fetchSpecies.searches[api.fetchSpecies.result].map((key) => species[key]) }));

function* fetchSpeciesSaga({ payload: { category }, meta }, api) {
  const { resolve, reject } = meta;
  const key = generateKey(category);
  const { searches } = yield select(selector);
  if (searches[key]) {
    yield put({ type: FETCH_SPECIES_STATE, payload: { fulfilled: true, result: key } });
    if (typeof resolve === 'function') {
      resolve(searches[key]);
    }
  } else {
    yield put({ type: FETCH_SPECIES_STATE, payload: { pending: true } });
    try {
      const speciesArray = yield call(api.fetchSpecies, category);
      yield put(setSpecies(speciesArray));
      yield put({ type: UPDATE_SPECIES, payload: { key: generateKey(category), species: speciesArray.map((species) => species.objectId) } });
      yield put({ type: FETCH_SPECIES_STATE, payload: { fulfilled: true, result: key } });
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
