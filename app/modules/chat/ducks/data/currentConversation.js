import _find from 'lodash/find';
import { selector as rootSelector, namespace as rootNamespace } from './constants';
import { selector as conversationsSelector } from './conversations';
// const debug = require('debug')('funongweb:chat:currentConversation');

const SLICE_NAME = 'currentConversation';
const namespace = `${rootNamespace}/${SLICE_NAME}`;
const SET_CURRENT_CONVERSATION = `${namespace}/set`;

export default {
  [SLICE_NAME]: (state = null, action) => {
    if (action.type === SET_CURRENT_CONVERSATION) {
      return action.payload;
    }
    return state;
  },
};

export const actions = {
  setCurrentConversation: (id) => ({ type: SET_CURRENT_CONVERSATION, payload: id }),
};

export const selector = (state) => {
  const id = rootSelector(state)[SLICE_NAME];
  const conversations = conversationsSelector(state);
  return id ? _find(conversations, (c) => c.objectId === id) : null;
};

export const sagas = [];
