import { selector as rootSelector, namespace as rootNamespace } from './constants';

const namespace = `${rootNamespace}/dialog`;
const OPEN = `${namespace}/open`;
const CLOSE = `${namespace}/close`;

export default {
  dialog: (state = { open: false, user: undefined }, action) => {
    if (action.type === OPEN) {
      return { open: true, user: action.payload.user };
    } else if (action.type === CLOSE) {
      return { open: false };
    }
    return state;
  },
};

export const actions = {
  openDialog: (user) => ({ type: OPEN, payload: { user } }),
  closeDialog: () => ({ type: CLOSE }),
};

export const selectors = { dialog: (state) => rootSelector(state).dialog };

export const sagas = [];
