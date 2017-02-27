import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setSupplyProducts } from 'modules/data/ducks/actions';
import { createDucks as createCriteriaDucks } from 'modules/common/criteria';

const SLICE_NAME = 'page_supply';

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

const criteriaDucks = createCriteriaDucks({ namespace: SLICE_NAME, rootSelector });

export default {
  [SLICE_NAME]: combineReducers({
    ...searchSupplyProductsDucks.default,
    ...criteriaDucks.default,
  }),
};

export const actions = {
  searchSupplyProducts: searchSupplyProductsDucks.actions.searchSupplyProducts,
  ...criteriaDucks.actions, // setCriteria
};

export const selectors = {
  searchSupplyProducts: searchSupplyProductsDucks.selector,
  criteria: criteriaDucks.selector,
};

export const sagas = [
  ...searchSupplyProductsDucks.sagas,
];
