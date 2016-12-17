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
  const data = normalize(user.toJSON(), UserSchema);
  const payload = Object.assign({}, data, { currentUser: data.result });
  yield put({ type: UPDATE_DATA, payload });

  // TODO move these to proper place
  // following side effects are sync
  // const sessionToken = user.getSessionToken();
  // // this method works only if __CLIENT__ is true. so it's safe to call it here even in nodejs env
  // // there are situations user object has no session token. to be refactored
  // if (sessionToken) {
  //   yield call(saveSessionTokenInCookie, sessionToken);
  // }
  // yield call(api.replaceToken, sessionToken);
}

function* setCatalogTypesSaga(action) {
  const types = action.payload.types.map((type) => type.toJSON());
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
