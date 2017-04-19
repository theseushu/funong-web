const SET_ITEMS = 'cart_page/set_items';

const reducer = (state = { items: [] }, { type, payload }) => {
  if (type === SET_ITEMS) {
    return { items: payload.items || [] };
  }
  return state;
};

export default {
  page_my_cart: reducer, // appConstants/routes/page_my_cart
};

export const actions = {
  setItems: (items) => ({ type: SET_ITEMS, payload: { items } }),
};

export const selectors = {
  items: (state) => state.page_my_cart ? state.page_my_cart.items : undefined,
};
