import { combineReducers } from 'redux';
import * as connection from './connection';

export default {
  chat: combineReducers({
    ...connection.default,
  }),
};

export const actions = {
  ...connection.actions,
};

export const selectors = {
  connection: connection.selector,
};

export const sagas = [
  ...connection.sagas,
];
