import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { supplyProductsSelector } from 'modules/data/ducks/selectors';
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
      return { result: products.map((product) => product.objectId) };
    },
  },
});

const countSupplyProductsDucks = createDucks({
  apiName: 'countSupplyProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(count) {
      return { count };
    },
  },
});

const criteriaDucks = createCriteriaDucks({ namespace: SLICE_NAME, rootSelector });

export default {
  [SLICE_NAME]: combineReducers({
    ...searchSupplyProductsDucks.default,
    ...countSupplyProductsDucks.default,
    ...criteriaDucks.default,
  }),
};

export const actions = {
  countSupplyProducts: countSupplyProductsDucks.actions.countSupplyProducts,
  searchSupplyProducts: searchSupplyProductsDucks.actions.searchSupplyProducts,
  ...criteriaDucks.actions, // setCriteria
};

export const selectors = {
  searchSupplyProducts: (state) => {
    const { result, ...other } = searchSupplyProductsDucks.selector(state);
    if (result) {
      const supplyProducts = supplyProductsSelector(state);
      return { ...other, result: result.map((id) => _find(supplyProducts, (p) => p.objectId === id)) };
    }
    return { ...other };
  },
  countSupplyProducts: countSupplyProductsDucks.selector,
  criteria: criteriaDucks.selector,
};

export const sagas = [
  ...countSupplyProductsDucks.sagas,
  ...searchSupplyProductsDucks.sagas,
];
