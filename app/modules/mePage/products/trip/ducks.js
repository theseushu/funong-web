import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setTripProducts } from 'modules/data/ducks/actions';

export const SLICE_NAME = 'page_me_products_trip';

const rootSelector = (state) => state[SLICE_NAME];

const searchTripProductsDucks = createDucks({
  apiName: 'searchTripProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setTripProducts(products));
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers({
    ...searchTripProductsDucks.default,
  }),
};

export const actions = {
  searchTripProducts: searchTripProductsDucks.actions.searchTripProducts,
};

export const selectors = {
  searchTripProducts: searchTripProductsDucks.selector,
};

export const sagas = [
  ...searchTripProductsDucks.sagas,
];
