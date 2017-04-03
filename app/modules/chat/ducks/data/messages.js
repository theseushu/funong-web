import _sortBy from 'lodash/sortBy';
import _uniqBy from 'lodash/uniqBy';
import { selector as rootSelector, namespace as rootNamespace } from './constants';
// const debug = require('debug')('funongweb:chat:conversation:list');

const SLICE_NAME = 'messages';
const namespace = `${rootNamespace}/${SLICE_NAME}`;
const APPEND = `${namespace}/append`;

const sort = (messages) => _sortBy(_uniqBy(messages, 'objectId'), (c) => c.timestamp);

export default {
  [SLICE_NAME]: (state = [], action) => {
    if (action.type === APPEND) {
      return sort([...action.payload, ...state]);
    }
    return state;
  },
};

export const actions = {
  appendMessages: (messages) => ({ type: APPEND, payload: messages }),
};

export const selector = (state) => rootSelector(state)[SLICE_NAME];

export const sagas = [];
