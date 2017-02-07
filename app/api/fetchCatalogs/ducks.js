import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { setCatalogs } from 'modules/data/ducks/actions';
import { catalogsSelector } from 'modules/data/ducks/selectors';
import rootSelector from '../rootSelector';
import { restCallStateReducerCreator } from '../utils/createDucks';


const FETCH_CATALOGS = 'api/fetch_catalogs';
const FETCH_CATALOGS_STATE = 'api/fetch_catalogs_state';

export default {
  fetchCatalogs: restCallStateReducerCreator(FETCH_CATALOGS_STATE),
};

export const actions = {
  fetchCatalogs: ({ meta = {} }) => ({ type: FETCH_CATALOGS, payload: {}, meta }),
};

export const selector = createSelector([rootSelector, catalogsSelector], (api, catalogs) => ({ ...api.fetchCatalogs, catalogs }));

function* fetchCatalogsSaga(action, api) {
  const { resolve, reject } = action.meta;
  const { fulfilled } = yield select(selector);
  if (fulfilled) { // fetch only once. since this data is almost immutable
    if (typeof resolve === 'function') {
      const catalogs = yield select(catalogsSelector);
      resolve(catalogs);
    }
  } else {
    yield put({ type: FETCH_CATALOGS_STATE, payload: { pending: true } });
    try {
      const catalogs = yield call(api.fetchCatalogs);
      yield put({ type: FETCH_CATALOGS_STATE, payload: { fulfilled: true } });
      yield put(setCatalogs(catalogs));
      if (typeof resolve === 'function') {
        resolve(catalogs);
      }
    } catch (error) {
      yield put({ type: FETCH_CATALOGS_STATE, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject(error);
      }
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_CATALOGS, function* saga(action) {
    yield* fetchCatalogsSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
