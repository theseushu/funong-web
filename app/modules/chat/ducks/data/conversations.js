import _sortBy from 'lodash/sortBy';
import _uniqBy from 'lodash/uniqBy';
import { selector as rootSelector, namespace as rootNamespace } from './constants';
// const debug = require('debug')('funongweb:chat:conversation:list');

const SLICE_NAME = 'conversations';
const namespace = `${rootNamespace}/${SLICE_NAME}`;
const SET_CONVERSATIONS = `${namespace}/set`;
const APPEND_CONVERSATIONS = `${namespace}/append`;
const REMOVE_CONVERSATION = `${namespace}/remove`;

const sort = (conversations) => _sortBy(_uniqBy(conversations, 'objectId'), (c) => c.lastMessageAt);

export default {
  [SLICE_NAME]: (state = { current: null, conversations: [] }, action) => {
    if (action.type === SET_CONVERSATIONS) {
      return { ...state, conversations: sort([...action.payload]) };
    } else if (action.type === APPEND_CONVERSATIONS) {
      return { ...state, conversations: sort([...action.payload, ...state.conversations]) };
    } else if (action.type === REMOVE_CONVERSATION) {
      return { ...state, conversations: state.conversations.filter((c) => c.objectId !== action.payload) };
    }
    return state;
  },
};

export const actions = {
  setConversations: (conversations) => ({ type: SET_CONVERSATIONS, payload: conversations }),
  appendConversations: (conversations) => ({ type: APPEND_CONVERSATIONS, payload: conversations }),
  removeConversation: (id) => ({ type: REMOVE_CONVERSATION, payload: id }),
};

export const selector = (state) => rootSelector(state)[SLICE_NAME].conversations;

export const sagas = [];
