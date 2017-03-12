const SELECT_ADDRESS = 'order_page/select_address';
const SET_ORDERS = 'order_page/set_orders';

const reducer = (state = { addressIndex: null, orders: {} }, action) => {
  if (action.type === SELECT_ADDRESS) {
    const { index } = action.payload;
    return { ...state, addressIndex: index };
  } else if (action.type === SET_ORDERS) {
    const { orders } = action.payload;
    return { ...state, orders };
  }
  return state;
};

export default {
  orderPage: reducer,
};

export const actions = {
  selectAddress: (index) => ({ type: SELECT_ADDRESS, payload: { index } }),
  setOrders: (orders) => ({ type: SET_ORDERS, payload: { orders } }),
};

export const selectors = {
  addressIndex: (state) => state.orderPage.addressIndex,
  orders: (state) => state.orderPage.orders,
};
