import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { createProductsSelector } from 'modules/data/ducks/selectors';
import { setProducts } from 'modules/data/ducks/actions';
import { createDucks as createCriteriaDucks } from 'modules/common/criteria';

export default (type) => {
  const SLICE_NAME = `page_${type}_list`;

  const rootSelector = (state) => state[SLICE_NAME];

  const searchProductsDucks = createDucks({
    key: 'searchProducts',
    apiName: `products.${type}.search`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(products) {
        yield put(setProducts(type, products));
        return { result: products.map((product) => product.objectId) };
      },
    },
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

  const countProductsDucks = createDucks({
    key: 'countProducts',
    apiName: `products.${type}.count`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(count) {
        return { count };
      },
    },
  });

  const criteriaDucks = createCriteriaDucks({ namespace: SLICE_NAME, rootSelector });

  return {
    default: {
      [SLICE_NAME]: combineReducers({
        ...searchProductsDucks.default,
        ...recommendProductsDucks.default,
        ...countProductsDucks.default,
        ...criteriaDucks.default,
      }),
    },
    actions: {
      countProducts: countProductsDucks.actions.countProducts,
      searchProducts: searchProductsDucks.actions.searchProducts,
      recommendProducts: recommendProductsDucks.actions.recommendProducts,
      ...criteriaDucks.actions, // setCriteria
    },
    selectors: {
      searchProducts: (state) => {
        const { result, ...other } = searchProductsDucks.selector(state);
        if (result) {
          const products = createProductsSelector(type)(state);
          return { ...other, result: result.map((id) => _find(products, (p) => p.objectId === id)) };
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
      countProducts: countProductsDucks.selector,
      criteria: criteriaDucks.selector,
    },
    sagas: [
      ...countProductsDucks.sagas,
      ...searchProductsDucks.sagas,
      ...recommendProductsDucks.sagas,
    ],
  };
};
