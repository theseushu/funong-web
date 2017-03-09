const SELECT_ADDRESS = 'order_page/select_address';

const reducer = (state = { addressIndex: null }, action) => {
  if (action.type === SELECT_ADDRESS) {
    const { index } = action.payload;
    return { ...state, addressIndex: index };
  }
  return state;
};

export default {
  orderPage: reducer,
};

export const actions = {
  selectAddress: (index) => ({ type: SELECT_ADDRESS, payload: { index } }),
};

export const selectors = {
  addressIndex: (state) => state.orderPage.addressIndex,
};
