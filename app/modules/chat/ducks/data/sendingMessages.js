import { selector as rootSelector, namespace as rootNamespace } from './constants';
// const debug = require('debug')('funongweb:chat:conversation:list');

const SLICE_NAME = 'sendingMessages';
const namespace = `${rootNamespace}/${SLICE_NAME}`;
const ADD = `${namespace}/add`;
const UPDATE = `${namespace}/update`;
const REMOVE = `${namespace}/remove`;

export default {
  [SLICE_NAME]: (state = {}, action) => {
    if (action.type === ADD) {
      const { storeKey, message } = action.payload;
      return { ...state, [storeKey]: message };
    } else if (action.type === UPDATE) {
      const { storeKey, message } = action.payload;
      return { ...state, [storeKey]: message };
    } else if (action.type === REMOVE) {
      const nextState = { ...state };
      const { storeKey } = action.payload;
      delete nextState[storeKey];
      return nextState;
    }
    return state;
  },
};

export const actions = {
  addSendingMessage: (storeKey, message) => ({ type: ADD, payload: { storeKey, message } }),
  updateSendingMessage: (storeKey, message) => ({ type: UPDATE, payload: { storeKey, message } }),
  removeSendingMessage: (storeKey) => ({ type: REMOVE, payload: { storeKey } }),
};

export const selector = (state) => rootSelector(state)[SLICE_NAME];

export const sagas = [];
