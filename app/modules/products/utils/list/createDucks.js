import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { createProductsSelector } from 'modules/data/ducks/selectors';
import { setProducts } from 'modules/data/ducks/actions';
import { statusValues } from 'funong-common/lib/appConstants';

export default (type) => {
  const SLICE_NAME = `page_${type}_list`;

  const rootSelector = (state) => state[SLICE_NAME];

  const pageProductsDucks = createDucks({
    key: 'pageProducts',
    apiName: `products.${type}.page`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(result) {
        yield put(setProducts(type, result.results));
        return { result: { ...result, results: result.results.map((i) => i.objectId) } };
      },
    },
  });

  const pageProducts = (params = {}) =>
    pageProductsDucks.actions.pageProducts({
      ...params,
      status: [statusValues.unverified.value, statusValues.verified.value],
    });

  const recommendProductsDucks = createDucks({
    key: 'recommendProducts',
    apiName: `products.${type}.recommend`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(products) {
        yield put(setProducts(type, products));
        return { result: products.map((product) => product.objectId) };
      },
    },
  });
  const recommendProducts = (params = {}) =>
    recommendProductsDucks.actions.recommendProducts({
      ...params,
      status: [statusValues.unverified.value, statusValues.verified.value],
    });

  return {
    default: {
      [SLICE_NAME]: combineReducers({
        ...pageProductsDucks.default,
        ...recommendProductsDucks.default,
      }),
    },
    actions: {
      pageProducts,
      recommendProducts,
    },
    selectors: {
      pageProducts: (state) => {
        const { result, ...other } = pageProductsDucks.selector(state);
        if (result) {
          const products = createProductsSelector(type)(state);
          return { ...other, result: { ...result, results: result.results.map((id) => _find(products, (p) => p.objectId === id)) } };
        }
        return { ...other };
      },
      recommendProducts: (state) => {
        const { result, ...other } = recommendProductsDucks.selector(state);
        if (result) {
          const products = createProductsSelector(type)(state);
          return { ...other, result: result.map((id) => _find(products, (p) => p.objectId === id)) };
        }
        return { ...other };
      },
    },
    sagas: [
      ...pageProductsDucks.sagas,
      ...recommendProductsDucks.sagas,
    ],
  };
};
