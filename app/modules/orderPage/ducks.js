import { createOrdersFromCartItems } from 'funong-common/lib/utils/orderUtils';
const SET_CART_ITEMS = 'order_page/set_cart_items';
const SELECT_ADDRESS = 'order_page/select_address';
const CREATE_ORDERS = 'order_page/create_orders';
const CHANGE_ORDER = 'order_page/change_order';

const reducer = (state = { items: [], addressIndex: null, orders: [] }, action) => {
  if (action.type === SET_CART_ITEMS) {
    const { items } = action.payload;
    return { ...state, items };
  } else if (action.type === SELECT_ADDRESS) {
    const { index, address } = action.payload;
    return { ...state, orders: createOrdersFromCartItems(state.items, address), addressIndex: index };
  } else if (action.type === CREATE_ORDERS) {
    const { address } = action.payload;
    return { ...state, orders: createOrdersFromCartItems(state.items, address) };
  } else if (action.type === CHANGE_ORDER) {
    const { index, order } = action.payload;
    return { ...state, orders: state.orders.map((o, i) => i === index ? order : o) };
  }
  return state;
};

export default {
  page_order: reducer,
};

export const actions = {
  setCartItems: (items) => ({ type: SET_CART_ITEMS, payload: { items } }),
  selectAddress: (index, address) => ({ type: SELECT_ADDRESS, payload: { index, address } }),
  createOrders: (address) => ({ type: CREATE_ORDERS, payload: { address } }),
  changeOrder: (index, order) => ({ type: CHANGE_ORDER, payload: { index, order } }),
};

export const selectors = {
  addressIndex: (state) => state.page_order.addressIndex,
  orders: (state) => state.page_order.orders,
};
