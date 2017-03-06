import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { tripProductsSelector } from 'modules/data/ducks/selectors';
import { setTripProducts } from 'modules/data/ducks/actions';
import { createDucks as createCriteriaDucks } from 'modules/common/criteria';

const SLICE_NAME = 'page_trip';

const rootSelector = (state) => state[SLICE_NAME];

const searchTripProductsDucks = createDucks({
  apiName: 'searchTripProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setTripProducts(products));
      return { result: products.map((product) => product.objectId) };
    },
  },
});

const countTripProductsDucks = createDucks({
  apiName: 'countTripProducts',
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
    ...searchTripProductsDucks.default,
    ...countTripProductsDucks.default,
    ...criteriaDucks.default,
  }),
};

export const actions = {
  countTripProducts: countTripProductsDucks.actions.countTripProducts,
  searchTripProducts: searchTripProductsDucks.actions.searchTripProducts,
  ...criteriaDucks.actions, // setCriteria
};

export const selectors = {
  searchTripProducts: (state) => {
    const { result, ...other } = searchTripProductsDucks.selector(state);
    if (result) {
      const products = tripProductsSelector(state);
      return { ...other, result: result.map((id) => _find(products, (p) => p.objectId === id)) };
    }
    return { ...other };
  },
  countTripProducts: countTripProductsDucks.selector,
  criteria: criteriaDucks.selector,
};

export const sagas = [
  ...countTripProductsDucks.sagas,
  ...searchTripProductsDucks.sagas,
];
