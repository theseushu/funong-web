import _sortBy from 'lodash/sortBy';
import _uniqBy from 'lodash/uniqBy';
import _find from 'lodash/find';
import rootSelector from './rootSelector';
import sliceName from './sliceName';
// const debug = require('debug')('funongweb:chat:conversation:list');

const namespace = `${sliceName}/list`;
const SET_CURRENT_CONVERSATION = `${namespace}/set_current`;
const SET_CONVERSATIONS = `${namespace}/set`;
const APPEND_CONVERSATIONS = `${namespace}/append`;
const REMOVE_CONVERSATION = `${namespace}/remove`;

const sort = (conversations) => _sortBy(_uniqBy(conversations, 'objectId'), (c) => c.lastMessageAt);

export default {
  list: (state = { current: null, conversations: [] }, action) => {
    if (action.type === SET_CURRENT_CONVERSATION) {
      return { ...state, current: action.payload };
    } else if (action.type === SET_CONVERSATIONS) {
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
  setCurrentConversation: (id) => ({ type: SET_CURRENT_CONVERSATION, payload: id }),
  setConversations: (conversations) => ({ type: SET_CONVERSATIONS, payload: conversations }),
  appendConversations: (conversations) => ({ type: APPEND_CONVERSATIONS, payload: conversations }),
  removeConversation: (id) => ({ type: REMOVE_CONVERSATION, payload: id }),
};

export const selectors = {
  currentConversation: (state) => {
    const { current, conversations } = rootSelector(state).list;
    return current ? _find(conversations, (c) => c.objectId === current) : null;
  },
  conversations: (state) => rootSelector(state).list.conversations,
};

export const sagas = [];
