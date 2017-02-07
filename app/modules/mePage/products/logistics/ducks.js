import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setLogisticsProducts } from 'modules/data/ducks/actions';

export const SLICE_NAME = 'page_me_products_logistics';

const rootSelector = (state) => state[SLICE_NAME];

const searchLogisticsProductsDucks = createDucks({
  apiName: 'searchLogisticsProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setLogisticsProducts(products));
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers({
    ...searchLogisticsProductsDucks.default,
  }),
};

export const actions = {
  searchLogisticsProducts: searchLogisticsProductsDucks.actions.searchLogisticsProducts,
};

export const selectors = {
  searchLogisticsProducts: searchLogisticsProductsDucks.selector,
};

export const sagas = [
  ...searchLogisticsProductsDucks.sagas,
];
