import { createOrders, calculateOrder } from 'utils/orderUtils';
import { orderFeeTypes } from 'appConstants';
const SELECT_ADDRESS = 'order_page/select_address';
const CREATE_ORDERS = 'order_page/create_orders';
const CHANGE_SERVICES = 'order_page/change_services';
const CHANGE_SERVICES_FEE = 'order_page/change_services_fee';

const reducer = (state = { addressIndex: null, orders: [] }, action) => {
  if (action.type === SELECT_ADDRESS) {
    const { index } = action.payload;
    return { ...state, orders: state.orders.map(calculateOrder), addressIndex: index };
  } else if (action.type === CREATE_ORDERS) {
    const { items, address } = action.payload;
    return { ...state, orders: createOrders(items, address) };
  } else if (action.type === CHANGE_SERVICES) {
    const { index, services } = action.payload;
    return { ...state, orders: state.orders.map((o, i) => i === index ? calculateOrder({ ...o, services }) : o) };
  } else if (action.type === CHANGE_SERVICES_FEE) {
    const { index, fee } = action.payload;
    return { ...state, orders: state.orders.map((o, i) => i === index ? calculateOrder({ ...o, otherFees: { ...o.otherFees, [orderFeeTypes.service.key]: fee } }) : o) };
  }
  return state;
};

export default {
  orderPage: reducer,
};

export const actions = {
  selectAddress: (index) => ({ type: SELECT_ADDRESS, payload: { index } }),
  createOrders: (items, address) => ({ type: CREATE_ORDERS, payload: { items, address } }),
  changeServices: (index, services) => ({ type: CHANGE_SERVICES, payload: { index, services } }),
  changeServicesFee: (index, fee) => ({ type: CHANGE_SERVICES_FEE, payload: { index, fee } }),
};

export const selectors = {
  addressIndex: (state) => state.orderPage.addressIndex,
  orders: (state) => state.orderPage.orders,
};
