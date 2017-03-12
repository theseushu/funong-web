const SELECT_ADDRESS = 'order_page/select_address';
const SET_ORDERS = 'order_page/set_orders';
const CHANGE_ORDER = 'order_page/change_order';

const reducer = (state = { addressIndex: null, orders: {} }, action) => {
  if (action.type === SELECT_ADDRESS) {
    const { index } = action.payload;
    return { ...state, addressIndex: index };
  } else if (action.type === SET_ORDERS) {
    const { orders } = action.payload;
    return { ...state, orders };
  } else if (action.type === CHANGE_ORDER) {
    const { index, order } = action.payload;
    return { ...state, orders: state.orders.map((o, i) => i === index ? order : o) };
  }
  return state;
};

export default {
  orderPage: reducer,
};

export const actions = {
  selectAddress: (index) => ({ type: SELECT_ADDRESS, payload: { index } }),
  setOrders: (orders) => ({ type: SET_ORDERS, payload: { orders } }),
  changeOrder: (index, order) => ({ type: CHANGE_ORDER, payload: { index, order } }),
};

export const selectors = {
  addressIndex: (state) => state.orderPage.addressIndex,
  orders: (state) => state.orderPage.orders,
};
