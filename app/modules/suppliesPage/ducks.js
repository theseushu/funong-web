import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from '../api/createDucks';
import { setSupplyProducts } from '../data/ducks/actions';

export const SLICE_NAME = 'page_supply';

const rootSelector = (state) => state[SLICE_NAME];

const searchSupplyProductsDucks = createDucks({
  apiName: 'searchSupplyProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setSupplyProducts(products));
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
