import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { UPDATE_DATA, SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOGS } from './constants';
import { UserSchema, CatalogsSchema } from './schemas';

function* updateCurrentUserInfoSaga(action) {
  const { user } = action.payload;
  const data = normalize(user, UserSchema);
  const payload = Object.assign({}, data, { currentUser: data.result });
  yield put({ type: UPDATE_DATA, payload });
}

function* setCurrentUserSaga(action) {
  const { user } = action.payload;
  const data = normalize(user, UserSchema);
  const payload = Object.assign({}, data, { currentUser: data.result });
  yield put({ type: UPDATE_DATA, payload });
}

function* setCatalogsSaga(action) {
  const catalogs = action.payload.catalogs;
  const data = normalize(catalogs, CatalogsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}
// watcher Saga:
function* rootSaga(api) {
  yield takeEvery(SET_CURRENT_USER, function* saga(action) {
    yield* setCurrentUserSaga(action, api);
  });
  yield takeEvery(UPDATE_CURRENT_USER_INFO, updateCurrentUserInfoSaga);
  yield takeEvery(SET_CATALOGS, setCatalogsSaga);
}

export default [rootSaga];
