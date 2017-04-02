import { combineReducers } from 'redux';
import * as connection from './connection';
import * as conversation from './conversation';
import * as dialog from './dialog';

export default {
  chat: combineReducers({
    ...connection.default,
    ...conversation.default,
    ...dialog.default,
  }),
};

export const actions = {
  ...connection.actions,
  ...conversation.actions,
  ...dialog.actions,
};

export const selectors = {
  connection: connection.selector,
  ...conversation.selectors,
  dialog: dialog.selector,
};

export const sagas = [
  ...connection.sagas,
  ...conversation.sagas,
  ...dialog.sagas,
];
