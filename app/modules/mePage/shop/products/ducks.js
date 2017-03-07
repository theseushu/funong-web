import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setProducts } from 'modules/data/ducks/actions';

export const SLICE_NAME = 'page_me_shop_products';
const SET_SEARCH_PARAMS = 'page_me_shop_products/SET_SEARCH_PARAMS';

const rootSelector = (state) => state[SLICE_NAME];

const searchProductsDucks = createDucks({
  key: 'searchProducts',
  apiName: 'products.shop.search',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setProducts('shop', products));
    },
  },
});

const searchParamsReducer = (state = {}, { type, payload = {} }) => {
  if (type === SET_SEARCH_PARAMS) {
    return payload;
  }
  return state;
};

export default {
  [SLICE_NAME]: combineReducers({
    searchParams: searchParamsReducer,
    ...searchProductsDucks.default,
  }),
};

export const actions = {
  setSearchParams: (searchParams) => ({ type: SET_SEARCH_PARAMS, payload: searchParams }),
  searchProducts: searchProductsDucks.actions.searchProducts,
};

export const selectors = {
  searchParams: (state) => rootSelector(state).searchParams,
  searchProducts: searchProductsDucks.selector,
};

export const sagas = [
  ...searchProductsDucks.sagas,
];
