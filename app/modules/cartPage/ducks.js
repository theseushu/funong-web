const SET_ITEMS = 'cart_page/set_items';

const reducer = (state = { items: [] }, { type, payload }) => {
  if (type === SET_ITEMS) {
    return { items: payload.items || [] };
  }
  return state;
};

export default {
  cartPage: reducer,
};

export const actions = {
  setItems: (items) => ({ type: SET_ITEMS, payload: { items } }),
};

export const selectors = {
  items: (state) => state.cartPage ? state.cartPage.items : undefined,
};
