import { combineReducers } from 'redux';
import { SLICE_NAME } from './constants';
import * as connection from './connection';
import * as conversation from './conversation';
import * as dialog from './dialog';
import * as data from './data';

export default {
  [SLICE_NAME]: combineReducers({
    ...connection.default,
    ...conversation.default,
    ...dialog.default,
    ...data.default,
  }),
};

export const actions = {
  ...connection.actions,
  ...conversation.actions,
  ...dialog.actions,
  ...data.actions,
};

export const selectors = {
  ...connection.selectors,
  ...conversation.selectors,
  ...dialog.selectors,
  ...data.selectors,
};

export const sagas = [
  ...connection.sagas,
  ...conversation.sagas,
  ...dialog.sagas,
  ...data.sagas,
];
