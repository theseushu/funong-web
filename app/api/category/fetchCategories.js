import _difference from 'lodash/difference';
import _union from 'lodash/union';
import { takeEvery, call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { setCategories } from 'modules/data/ducks/actions';
import { categoriesSelector } from 'modules/data/ducks/selectors';
import rootSelector from './rootSelector';
import { SLICE_NAME } from './constants';


const FETCH_CATEGORIES = `api/${SLICE_NAME}/fetch_categories`;
const FETCH_CATEGORIES_STATE = `api/${SLICE_NAME}/fetch_categories_state`;
const UPDATE_CATEGORIES = `api/${SLICE_NAME}/fetch_categories_update`;

export default {
  fetchCategories: (state = {}, action) => {
    if (action.type === FETCH_CATEGORIES_STATE) {
      return Object.assign({}, action.payload, { fetched: state.fetched }); // override others than searches
    } else if (action.type === UPDATE_CATEGORIES) {
      const { catalogs } = action.payload;
      return { ...state, fetched: _union(state.fetched, catalogs) };
    }
    return state;
  },
};

export const actions = {
  fetchCategories: ({ catalogs, meta = {} }) => ({ type: FETCH_CATEGORIES, payload: { catalogs }, meta }),
};


export const selector = createSelector(rootSelector, (api) => ({ ...api.fetchCategories }));

function* fetchCategoriesSaga({ payload: { catalogs }, meta }, api) {
  const { resolve, reject } = meta;
  const { fetched } = yield select(selector);
  const toFetch = _difference(catalogs, fetched);
  if (toFetch.length === 0) {
    if (typeof resolve === 'function') {
      const categories = yield select(categoriesSelector);
      resolve(categories.filter((category) => catalogs.indexOf(category.catalog) >= 0));
    }
  } else {
    yield put({ type: FETCH_CATEGORIES_STATE, payload: { pending: true } });
    try {
      const categories = yield call(api.fetchCategories, toFetch);
      yield put(setCategories(categories));
      yield put({ type: UPDATE_CATEGORIES, payload: { catalogs: toFetch } });
      yield put({ type: FETCH_CATEGORIES_STATE, payload: { fulfilled: true } });
      if (typeof resolve === 'function') {
        const allCategories = yield select(categoriesSelector);
        resolve(allCategories.filter((category) => catalogs.indexOf(category.catalog) >= 0));
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
