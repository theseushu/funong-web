import _sortBy from 'lodash/sortBy';
import _uniqBy from 'lodash/uniqBy';
import _findIndex from 'lodash/findIndex';
import _last from 'lodash/last';
import { selector as rootSelector, namespace as rootNamespace } from './constants';
import { selector as messagesSelector } from './messages';
// const debug = require('debug')('funongweb:chat:conversation:list');

const SLICE_NAME = 'conversations';
const namespace = `${rootNamespace}/${SLICE_NAME}`;
const SET_CONVERSATIONS = `${namespace}/set`;
const APPEND_CONVERSATIONS = `${namespace}/append`;
const REMOVE_CONVERSATION = `${namespace}/remove`;
const HISTORY_LOADED = `${namespace}/history_loaded`;

const sort = (conversations) => _sortBy(_uniqBy(conversations, 'objectId'), (c) => -c.lastMessageAt);

export default {
  [SLICE_NAME]: (state = [], action) => {
    if (action.type === SET_CONVERSATIONS) {
      return sort([...action.payload]);
    } else if (action.type === APPEND_CONVERSATIONS) {
      return sort([...action.payload, ...state]);
    } else if (action.type === REMOVE_CONVERSATION) {
      return state.filter((c) => c.objectId !== action.payload);
    } else if (action.type === HISTORY_LOADED) {
      const id = action.payload;
      const index = _findIndex(state, (c) => c.objectId === id);
      const nextState = [...state];
      nextState[index] = { ...state[index], historyLoaded: true };
      return nextState;
    }
    return state;
  },
};

export const actions = {
  setConversations: (conversations) => ({ type: SET_CONVERSATIONS, payload: conversations }),
  appendConversations: (conversations) => ({ type: APPEND_CONVERSATIONS, payload: conversations }),
  removeConversation: (id) => ({ type: REMOVE_CONVERSATION, payload: id }),
  setConversationHistoryLoaded: (id) => ({ type: HISTORY_LOADED, payload: id }),
};

export const selector = (state) => {
  const conversations = rootSelector(state)[SLICE_NAME];
  return conversations.map((conversation) => {
    const messages = messagesSelector(state).filter((m) => m.cid === conversation.objectId);
    const lastMessage = _last(messages) || conversation.lastMessage;
    return { ...conversation, lastMessage, lastMessageAt: lastMessage ? lastMessage.timestamp : conversation.lastMessageAt };
  });
};

export const sagas = [];
