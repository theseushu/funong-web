import _find from 'lodash/find';
import _without from 'lodash/without';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setOrders } from 'modules/data/ducks/actions';
import { ordersSelector } from 'modules/data/ducks/selectors';

const SLICE_NAME = 'page_my_orders';
const rootSelector = (state) => state[SLICE_NAME];

const ORDER_SELECTED = `${SLICE_NAME}/order_selected`;
const ORDER_DESELECTED = `${SLICE_NAME}/order_deselected`;

const selectedReducer = (state = [], action) => {
  if (action.type === ORDER_SELECTED) {
    if (state.indexOf(action.payload) === -1) {
      return [...state, action.payload];
    }
  } else if (action.type === ORDER_DESELECTED) {
    return _without(state, action.payload);
  }
  return state;
};

const pageDucks = createDucks({
  key: 'page',
  apiName: 'pageOrders',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(result) {
      yield put(setOrders(result.results));
      return { result: { ...result, results: result.results.map((i) => i.objectId) } };
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers({
    selected: selectedReducer,
    ...pageDucks.default,
  }),
};
export const actions = {
  select: (id) => ({ type: ORDER_SELECTED, payload: id }),
  deselect: (id) => ({ type: ORDER_DESELECTED, payload: id }),
  page: pageDucks.actions.page,
};
const selectFromData = (state, ids) => {
  const entries = ordersSelector(state);
  return ids.map((id) => _find(entries, (p) => p.objectId === id));
};

export const selectors = {
  selected: (state) => {
    const selectedIds = rootSelector(state).selected;
    return selectedIds;
    // return selectFromData(state, selectedIds);
  },
  page: (state) => {
    const { result, ...other } = pageDucks.selector(state);
    if (result) {
      return { ...other, result: { ...result, results: selectFromData(state, result.results) } };
    }
    return { ...other };
  },
};

export const sagas = [
  ...pageDucks.sagas,
];
