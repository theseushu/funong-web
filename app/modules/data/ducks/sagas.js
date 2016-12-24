import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { UPDATE_DATA, SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOGS, SET_CATAGORIES, SET_SPECIES } from './constants';
import { UserSchema, CatalogsSchema, CategoriesSchema, SpeciesArraySchema } from './schemas';

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
  const { catalogs } = action.payload;
  const data = normalize(catalogs, CatalogsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setCategoriesSaga(action) {
  const { categories } = action.payload;
  const data = normalize(categories, CategoriesSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setSpeciesSaga(action) {
  const speciesArray = action.payload.species;
  const data = normalize(speciesArray, SpeciesArraySchema);
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
  yield takeEvery(SET_CATAGORIES, setCategoriesSaga);
  yield takeEvery(SET_SPECIES, setSpeciesSaga);
}

export default [rootSaga];
