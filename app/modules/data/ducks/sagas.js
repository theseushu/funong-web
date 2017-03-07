import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';

import { UPDATE_DATA, REMOVE_ENTITIES, SET_USERS, SET_CURRENT_USER,
  UPDATE_CURRENT_USER_INFO, SET_CATAGORIES, SET_SPECIES,
  SET_PRODUCTS, SET_SHOP_PRODUCTS, SET_TRIP_PRODUCTS,
  SET_LOGISTICS_PRODUCTS, SET_CERTS,
  SET_CART_ITEMS, REMOVE_CART_ITEMS, SET_SHOPS,
  SET_COMMENTS, REMOVE_COMMENTS } from './constants';
import { UserSchema, UsersSchema,
  CategoriesSchema, SpeciesArraySchema,
  ProductSchemas, ShopProductsSchema, LogisticsProductsSchema, TripProductsSchema,
  CertsSchema, CartItemsSchema, ShopsSchema,
  CommentsSchema } from './schemas';

function* setUsersSaga(action) {
  const { users } = action.payload;
  const data = normalize(users, UsersSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

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

function* setProductsSaga(action) {
  const { products } = action.payload;
  const { type } = action.meta;
  const data = normalize(products, ProductSchemas[type].array);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setShopProductsSaga(action) {
  const { shopProducts } = action.payload;
  const data = normalize(shopProducts, ShopProductsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setLodisticsProductsSaga(action) {
  const { logisticsProducts } = action.payload;
  const data = normalize(logisticsProducts, LogisticsProductsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setTripProductsSaga(action) {
  const { tripProducts } = action.payload;
  const data = normalize(tripProducts, TripProductsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setCertsSaga(action) {
  const { certs } = action.payload;
  const data = normalize(certs, CertsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setCartItemsSaga(action) {
  const { cartItems } = action.payload;
  const data = normalize(cartItems, CartItemsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* removeCartItemsSaga(action) {
  const { ids } = action.payload;
  yield put({ type: REMOVE_ENTITIES, payload: { entities: { [CartItemsSchema.getItemSchema().getKey()]: { ...ids.map((id) => ({ [id]: null })) } } } });
}

function* setShopsSaga(action) {
  const { shops } = action.payload;
  const data = normalize(shops, ShopsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* setCommentsSaga(action) {
  const { comments } = action.payload;
  const data = normalize(comments, CommentsSchema);
  const payload = Object.assign({}, data);
  yield put({ type: UPDATE_DATA, payload });
}

function* removeCommentsSaga(action) {
  const { ids } = action.payload;
  yield put({ type: REMOVE_ENTITIES, payload: { entities: { [CommentsSchema.getItemSchema().getKey()]: { ...ids.map((id) => ({ [id]: null })) } } } });
}
// watcher Saga:
function* rootSaga(api) {
  yield takeEvery(SET_CURRENT_USER, function* saga(action) {
    yield* setCurrentUserSaga(action, api);
  });
  yield takeEvery(SET_USERS, setUsersSaga);
  yield takeEvery(UPDATE_CURRENT_USER_INFO, updateCurrentUserInfoSaga);
  yield takeEvery(SET_CATAGORIES, setCategoriesSaga);
  yield takeEvery(SET_SPECIES, setSpeciesSaga);
  yield takeEvery(SET_PRODUCTS, setProductsSaga);
  yield takeEvery(SET_SHOP_PRODUCTS, setShopProductsSaga);
  yield takeEvery(SET_LOGISTICS_PRODUCTS, setLodisticsProductsSaga);
  yield takeEvery(SET_TRIP_PRODUCTS, setTripProductsSaga);
  yield takeEvery(SET_CERTS, setCertsSaga);
  yield takeEvery(SET_CART_ITEMS, setCartItemsSaga);
  yield takeEvery(REMOVE_CART_ITEMS, removeCartItemsSaga);
  yield takeEvery(SET_SHOPS, setShopsSaga);
  yield takeEvery(SET_COMMENTS, setCommentsSaga);
  yield takeEvery(REMOVE_COMMENTS, removeCommentsSaga);
}

export default [rootSaga];
