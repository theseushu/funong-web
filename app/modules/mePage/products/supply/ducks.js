import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setProducts } from 'modules/data/ducks/actions';

export const SLICE_NAME = 'page_me_products_supply';

const rootSelector = (state) => state[SLICE_NAME];

const searchSupplyProductsDucks = createDucks({
  apiName: 'searchSupplyProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setProducts('supply', products));
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers({
    ...searchSupplyProductsDucks.default,
  }),
};

export const actions = {
  searchSupplyProducts: searchSupplyProductsDucks.actions.searchSupplyProducts,
};

export const selectors = {
  searchSupplyProducts: searchSupplyProductsDucks.selector,
};

export const sagas = [
  ...searchSupplyProductsDucks.sagas,
];
