import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { UPDATE_DATA, SET_CURRENT_USER, UPDATE_CURRENT_USER_INFO, SET_CATALOGS, SET_CATAGORIES, SET_SPECIES, SET_SPECIFICATIONS, SET_PRODUCT, SET_PRODUCTS, SET_SUPPLY_PRODUCTS, SET_LOGISTICS_PRODUCTS, SET_CERTS } from './constants';
import { UserSchema, CatalogsSchema, CategoriesSchema, SpeciesArraySchema, SpecificationsSchema, ProductSchema, ProductsSchema, LogisticsProductsSchema, SupplyProductsSchema, CertsSchema } from './schemas';

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

function* setSpecificationsSaga(action) {
  const specifications = action.payload.specifications;
  const data = normalize(specifications, SpecificationsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setProductSaga(action) {
  const { product } = action.payload;
  const data = normalize(product, ProductSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setProductsSaga(action) {
  const { products } = action.payload;
  const data = normalize(products, ProductsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setSupplyProductsSaga(action) {
  const { supplyProducts } = action.payload;
  const data = normalize(supplyProducts, SupplyProductsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setLodisticsProductsSaga(action) {
  const { logisticsProducts } = action.payload;
  const data = normalize(logisticsProducts, LogisticsProductsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setCertsSaga(action) {
  const { certs } = action.payload;
  const data = normalize(certs, CertsSchema);
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
  yield takeEvery(SET_SPECIFICATIONS, setSpecificationsSaga);
  yield takeEvery(SET_PRODUCT, setProductSaga);
  yield takeEvery(SET_PRODUCTS, setProductsSaga);
  yield takeEvery(SET_SUPPLY_PRODUCTS, setSupplyProductsSaga);
  yield takeEvery(SET_LOGISTICS_PRODUCTS, setLodisticsProductsSaga);
  yield takeEvery(SET_CERTS, setCertsSaga);
}

export default [rootSaga];
