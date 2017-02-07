import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { setCategories } from 'modules/data/ducks/actions';
import { categoriesSelector } from 'modules/data/ducks/selectors';
import rootSelector from '../rootSelector';


const FETCH_CATEGORIES = 'api/fetch_categories';
const FETCH_CATEGORIES_STATE = 'api/fetch_categories_state';
const UPDATE_CATEGORIES = 'api/update_categories';

function generateKey({ objectId }) {
  return objectId;
}

export default {
  fetchCategories: (state = { searches: {} }, action) => {
    if (action.type === FETCH_CATEGORIES_STATE) {
      return Object.assign({}, action.payload, { searches: state.searches }); // override others than searches
    } else if (action.type === UPDATE_CATEGORIES) {
      const { key, categories } = action.payload;
      if (state.searches[key]) {
        return state;
      }
      const searches = Object.assign({}, state.searches, { [key]: categories });
      return Object.assign(state, { searches });
    }
    return state;
  },
};

export const actions = {
  fetchCategories: ({ catalog, meta = {} }) => ({ type: FETCH_CATEGORIES, payload: { catalog }, meta }),
};


export const selector = createSelector([rootSelector, categoriesSelector],
  (api, categories) => ({ ...api.fetchCategories, categories: api.fetchCategories.result && api.fetchCategories.searches[api.fetchCategories.result].map((key) => categories[key]) }));

function* fetchCategoriesSaga({ payload: { catalog }, meta }, api) {
  const { resolve, reject } = meta;
  const key = generateKey(catalog);
  const { searches } = yield select(selector);
  if (searches[key]) {
    if (typeof resolve === 'function') {
      resolve(searches[key]);
    }
  } else {
    yield put({ type: FETCH_CATEGORIES_STATE, payload: { pending: true } });
    try {
      const categories = yield call(api.fetchCategories, catalog);
      yield put(setCategories(categories));
      yield put({ type: UPDATE_CATEGORIES, payload: { key: generateKey(catalog), categories: categories.map((category) => category.objectId) } });
      yield put({ type: FETCH_CATEGORIES_STATE, payload: { fulfilled: true, result: key } });
      if (typeof resolve === 'function') {
        resolve(categories);
      }
    } catch (error) {
      yield put({ type: FETCH_CATEGORIES_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject(error);
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_CATEGORIES, function* saga(action) {
    yield* fetchCategoriesSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
