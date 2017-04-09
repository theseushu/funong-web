import combineReducers from 'redux/lib/combineReducers';
import { put, select } from 'redux-saga/effects';
import { setProducts, removeProducts } from 'modules/data/ducks/actions';
import { createProductSelector } from 'modules/data/ducks/selectors';
import createDucks from 'api/utils/createDucks';
import createCompositeDucks from 'api/utils/createCompositeDucks';
import { NAMESPACE as productNamespace } from '../constants';
import productsSelector from '../rootSelector';

export default (type) => {
  const SLICE_NAME = type;
  const NAMESPACE = `${productNamespace}/${type}`;
  const rootSelector = (state) => productsSelector(state)[type];
  const create = createDucks({
    key: 'create',
    apiName: `products.${type}.create`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setProducts(type, [product]));
      },
    },
  });
  const fetch = createDucks({
    key: 'fetch',
    apiName: `products.${type}.fetch`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setProducts(type, [product]));
      },
    },
  });
  const update = createDucks({
    key: 'update',
    apiName: `products.${type}.update`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setProducts(type, [product]));
      },
    },
  });
  const enable = createCompositeDucks({
    key: 'enable',
    apiName: `products.${type}.enable`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId, status, updatedAt }) {
        const product = yield select(createProductSelector(type, objectId));
        yield put(setProducts(type, [{ ...product, status, updatedAt }]));
      },
    },
  });
  const disable = createCompositeDucks({
    key: 'disable',
    apiName: `products.${type}.disable`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId, status, updatedAt }) {
        const product = yield select(createProductSelector(type, objectId));
        yield put(setProducts(type, [{ ...product, status, updatedAt }]));
      },
    },
  });
  const remove = createCompositeDucks({
    key: 'remove',
    apiName: `products.${type}.remove`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId }) {
        yield put(removeProducts(type, [objectId]));
      },
    },
  });
  return {
    actions: {
      ...create.actions,
      ...fetch.actions,
      ...update.actions,
      ...enable.actions,
      ...disable.actions,
      ...remove.actions,
    },
    selectors: {
      create: create.selector,
      update: update.selector,
      fetch: fetch.selector,
      enable: enable.selector,
      disable: disable.selector,
      remove: remove.selector,
    },
    sagas: [
      ...create.sagas,
      ...update.sagas,
      ...fetch.sagas,
      ...enable.sagas,
      ...disable.sagas,
      ...remove.sagas,
    ],
    default: {
      [SLICE_NAME]: combineReducers({
        ...create.default,
        ...update.default,
        ...fetch.default,
        ...enable.default,
        ...disable.default,
        ...remove.default,
      }),
    },
  };
};
