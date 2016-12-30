import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';

import createRestCallStateReducer from '../ducks/createRestCallStateReducer';
import { setSpecifications } from '../../data/ducks/actions';

const FETCH_SPECIFICATIONS = 'api/fetch_specifications';
const FETCH_SPECIFICATIONS_STATE = 'api/fetch_specifications_state';

export default {
  fetchSpecifications: createRestCallStateReducer(FETCH_SPECIFICATIONS_STATE),
};

export const actions = {
  fetchSpecifications: ({ species, meta = {} }) => ({ type: FETCH_SPECIFICATIONS, payload: { species }, meta }),
};


export const selector = createSelector(rootSelector, (api) => api.fetchSpecifications);

function* fetchSpecificationsSaga({ payload: { species }, meta }, api) {
  const { resolve, reject } = meta;
  yield put({ type: FETCH_SPECIFICATIONS_STATE, payload: { pending: true } });
  try {
    const specificationsArray = yield call(api.fetchSpecifications, species);
    yield put(setSpecifications(specificationsArray));
    yield put({ type: FETCH_SPECIFICATIONS_STATE, payload: { fulfilled: true } });
    if (typeof resolve === 'function') {
      resolve(specificationsArray);
    }
  } catch (error) {
    yield put({ type: FETCH_SPECIFICATIONS_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_SPECIFICATIONS, function* saga(action) {
    yield* fetchSpecificationsSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
