import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setProducts } from 'modules/data/ducks/actions';

export default (type) => {
  const SLICE_NAME = `page_me_products_${type}`;
  const rootSelector = (state) => state[SLICE_NAME];

  const searchProductsDucks = createDucks({
    key: 'searchProducts',
    apiName: `products.${type}.search`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(products) {
        yield put(setProducts(type, products));
      },
    },
  });

  return {
    default: {
      [SLICE_NAME]: combineReducers({
        ...searchProductsDucks.default,
      }),
    },
    actions: {
      searchProducts: searchProductsDucks.actions.searchProducts,
    },
    selectors: {
      searchProducts: searchProductsDucks.selector,
    },
    sagas: [
      ...searchProductsDucks.sagas,
    ],
  };
};
