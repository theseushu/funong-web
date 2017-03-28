import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { createProductsSelector } from 'modules/data/ducks/selectors';
import { setProducts } from 'modules/data/ducks/actions';
import { productTypes } from 'appConstants';

const SLICE_NAME = 'product_selector';

const rootSelector = (state) => state[SLICE_NAME];

const ducks = _reduce(productTypes, (result, type) => ({
  ...result,
  [type]: createDucks({
    key: type,
    apiName: `products.${type}.search`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(products) {
        yield put(setProducts(type, products));
        return { result: products.map((product) => product.objectId) };
      },
    },
  }),
}), {});

export default {
  [SLICE_NAME]: combineReducers(_reduce(ducks, (result, duckOfType) => ({ ...result, ...duckOfType.default }), {})),
};

export const actions = _reduce(ducks, (result, duckOfType, type) => ({ ...result, [type]: duckOfType.actions[type] }), {});

export const selectors = _reduce(ducks, (sum, duckOfType, type) => ({
  ...sum,
  [type]: (state) => {
    const { result, ...other } = duckOfType.selector(state);
    if (result) {
      const products = createProductsSelector(type)(state);
      return { ...other, result: result.map((id) => _find(products, (p) => p.objectId === id)) };
    }
    return { ...other };
  },
}), {});

export const sagas = _reduce(ducks, (result, duckOfType) => [...result, ...duckOfType.sagas], []);

