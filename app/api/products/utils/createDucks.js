import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import { setProducts } from 'modules/data/ducks/actions';
import createDucks from 'api/utils/createDucks';
import { NAMESPACE as productNamespace } from '../constants';
import productsSelector from '../rootSelector';

export default ({ productType }) => {
  const SLICE_NAME = productType;
  const NAMESPACE = `${productNamespace}/${productType}`;
  const rootSelector = (state) => productsSelector(state)[SLICE_NAME];
  const create = createDucks({
    key: 'create',
    apiName: `products.${productType}.create`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setProducts(productType, [product]));
      },
    },
  });
  const fetch = createDucks({
    key: 'fetch',
    apiName: `products.${productType}.fetch`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setProducts(productType, [product]));
      },
    },
  });
  const update = createDucks({
    key: 'update',
    apiName: `products.${productType}.update`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setProducts(productType, [product]));
      },
    },
  });
  return {
    actions: {
      ...create.actions,
      ...fetch.actions,
      ...update.actions,
    },
    selectors: {
      create: create.selector,
      update: update.selector,
      fetch: fetch.selector,
    },
    sagas: [
      ...create.sagas,
      ...update.sagas,
      ...fetch.sagas,
    ],
    default: {
      [SLICE_NAME]: combineReducers({
        ...create.default,
        ...update.default,
        ...fetch.default,
      }),
    },
  };
};
