const SWITCH_TAB = 'profilePage/switch_tab';

const reducer = (state = { tabIndex: 0 }, action) => {
  if (action.type === SWITCH_TAB) {
    return Object.assign({}, state, { tabIndex: action.payload });
  }
  return state;
};

export default {
  profilePage: reducer,
};

export const actions = {
  switchTab: (index) => ({ type: SWITCH_TAB, payload: index }),
};
