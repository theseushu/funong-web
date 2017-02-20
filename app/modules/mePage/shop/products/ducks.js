import combineReducers from 'redux/lib/combineReducers';

export const SLICE_NAME = 'page_me_shop_products';
const SET_SEARCH_PARAMS = 'page_me_shop_products/SET_SEARCH_PARAMS';


const rootSelector = (state) => state[SLICE_NAME];

const searchParamsReducer = (state = {}, { type, payload = {} }) => {
  if (type === SET_SEARCH_PARAMS) {
    return payload;
  }
  return state;
};

export default {
  [SLICE_NAME]: combineReducers({
    searchParams: searchParamsReducer,
  }),
};

export const actions = {
  setSearchParams: (searchParams) => ({ type: SET_SEARCH_PARAMS, payload: searchParams }),
};

export const selectors = {
  searchParams: (state) => rootSelector(state).searchParams,
};

// export const sagas = [];
