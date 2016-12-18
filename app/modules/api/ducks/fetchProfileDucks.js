import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from './rootSelector';
import createRestCallStateReducer from './createRestCallStateReducer';

import { setCurrentUser } from '../../data/ducks/actions';

const FETCH_PROFILE = 'api/fetch_profile';
const FETCH_PROFILE_STATE = 'api/fetch_profile_state';

export default {
  fetchProfile: createRestCallStateReducer(FETCH_PROFILE_STATE),
};

export const actions = {
  fetchProfile: ({ meta = {} }) => ({ type: FETCH_PROFILE, payload: {}, meta }),
};

export const selectors = {
  fetchProfile: createSelector(rootSelector, (api) => api.fetchProfile),
};

function* fetchProfileSaga(action, api) {
  const { resolve, reject } = action.meta;
  yield put({ type: FETCH_PROFILE_STATE, payload: { pending: true } });
  try {
    const profile = yield call(api.fetchProfile);
    yield put({ type: FETCH_PROFILE_STATE, payload: { fulfilled: true, time: Date.now() } });
    yield put(setCurrentUser(profile));
    if (typeof resolve === 'function') {
      resolve(profile);
    }
  } catch (error) {
    yield put({ type: FETCH_PROFILE_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(FETCH_PROFILE, function* (action) {
    yield* fetchProfileSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
