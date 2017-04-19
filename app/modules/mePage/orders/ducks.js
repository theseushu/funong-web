import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { setOrders } from 'modules/data/ducks/actions';
import { ordersSelector } from 'modules/data/ducks/selectors';

const SLICE_NAME = 'page_my_orders';
const rootSelector = (state) => state[SLICE_NAME];

const searchOrdersDucks = createDucks({
  key: 'search',
  apiName: 'searchOrders',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(orders) {
      yield put(setOrders(orders));
      return { result: orders.map((o) => o.objectId) };
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers({
    ...searchOrdersDucks.default,
  }),
};
export const actions = {
  search: searchOrdersDucks.actions.search,
};

export const selectors = {
  search: searchOrdersDucks.selector,
  orders: (state) => {
    const { result } = searchOrdersDucks.selector(state);
    if (!result) {
      return [];
    }
    const orders = ordersSelector(state);
    return result.map((id) => _find(orders, (o) => o.objectId === id));
  },
};

export const sagas = [
  ...searchOrdersDucks.sagas,
];
