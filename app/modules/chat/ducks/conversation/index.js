import { combineReducers } from 'redux';
import * as create from './create';
import * as quit from './quit';
import * as list from './list';

export default {
  chat: combineReducers({
    ...create.default,
    ...quit.default,
    ...list.default,
  }),
};

export const actions = {
  ...create.actions,
  ...quit.actions,
  ...list.actions,
};

export const selectors = {
  createConversation: create.selector,
  quitConversation: quit.selector,
  ...list.selectors,
};

export const sagas = [
  ...create.sagas,
  ...quit.sagas,
  ...list.sagas,
];
