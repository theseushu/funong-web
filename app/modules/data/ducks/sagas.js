import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { UPDATE_DATA, SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOG_TYPES } from './constants';
import { UserSchema, CatalogTypesSchema } from './schemas';

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

function* setCatalogTypesSaga(action) {
  const types = action.payload.types;
  const data = normalize(types, CatalogTypesSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}
// watcher Saga:
function* rootSaga(api) {
  yield takeEvery(SET_CURRENT_USER, function* (action) {
    yield* setCurrentUserSaga(action, api);
  });
  yield takeEvery(UPDATE_CURRENT_USER_INFO, updateCurrentUserInfoSaga);
  yield takeEvery(SET_CATALOG_TYPES, setCatalogTypesSaga);
}

export default [rootSaga];
