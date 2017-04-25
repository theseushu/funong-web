import _find from 'lodash/find';
import _capitalize from 'lodash/capitalize';
import _reduce from 'lodash/reduce';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import { publishTypes } from 'funong-common/lib/appConstants';
import createDucks from 'api/utils/createDucks';
import { createProductsSelector, inquiriesSelector } from 'modules/data/ducks/selectors';
import { setProducts, setInquiries } from 'modules/data/ducks/actions';

const SLICE_NAME = 'page_user';
const SET_PAGE_SATE = 'page_user/set_page_sate';

const rootSelector = (state) => state[SLICE_NAME];

const types = [publishTypes.supply, publishTypes.trip, publishTypes.logistics];
const pageProductActions = {};
const pageProductsSelectors = {};
const ducks = types.map((type) => {
  const key = `page${_capitalize(type)}Products`;
  const duck = createDucks({
    key,
    apiName: `products.${type}.page`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(result) {
        yield put(setProducts(type, result.results));
        return { result: { ...result, results: result.results.map((i) => i.objectId) } };
      },
    },
  });
  pageProductActions[type] = (params) => duck.actions[key]({ type, ...params });
  pageProductsSelectors[type] = (state) => {
    const { result, ...other } = duck.selector(state);
    if (result) {
      const allProducts = createProductsSelector(type)(state);
      return { ...other, result: { ...result, results: result.results.map((id) => _find(allProducts, (i) => i.objectId === id)) } };
    }
    return { ...other };
  };
  return duck;
});

const pageInquiriesDucks = createDucks({
  key: 'pageInquiries',
  apiName: 'pageInquiries',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(result) {
      yield put(setInquiries(result.results));
      return { result: { ...result, results: result.results.map((i) => i.objectId) } };
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers(_reduce(ducks, (result, duck) => ({ ...result, ...duck.default }), {
    ...pageInquiriesDucks.default,
    pageState: (state = { type: publishTypes.supply, page: 1, pageSize: 20 }, action) => {
      if (action.type === SET_PAGE_SATE) {
        return action.payload;
      }
      return state;
    },
  })),
};

export const actions = {
  pageProducts: ({ type, ...params }) => pageProductActions[type](params),
  pageInquiries: pageInquiriesDucks.actions.pageInquiries,
  setPageState: (params) => ({ type: SET_PAGE_SATE, payload: params }),
};

export const selectors = {
  createPageProductsSelector: (type) => pageProductsSelectors[type],
  pageInquiries: (state) => {
    const { result, ...other } = pageInquiriesDucks.selector(state);
    if (result) {
      const allBids = inquiriesSelector(state);
      return { ...other, result: { ...result, results: result.results.map((id) => _find(allBids, (i) => i.objectId === id)) } };
    }
    return { ...other };
  },
  pageState: (state) => rootSelector(state).pageState,
};

export const sagas = _reduce(ducks, (result, duck) => [...result, ...duck.sagas], [...pageInquiriesDucks.sagas]);
