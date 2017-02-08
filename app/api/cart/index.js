import combineReducers from 'redux/lib/combineReducers';
import * as addItem from './addItem';
import * as updateItem from './updateItem';
import * as fetch from './fetch';
import * as removeItems from './removeItems';
import { SLICE_NAME } from './constants';

export const actions = {
  ...addItem.actions, // addItem
  ...updateItem.actions, // updateItem
  ...fetch.actions, // fetch
  ...removeItems.actions, //removeItems
};

export const selectors = {
  addItem: addItem.selector,
  updateItem: updateItem.selector,
  fetch: fetch.selector,
  removeItems: removeItems.selector,
};

export const sagas = [
  ...addItem.sagas,
  ...updateItem.sagas,
  ...fetch.sagas,
  ...removeItems.sagas,
];

export default {
  [SLICE_NAME]: combineReducers({
    ...addItem.default,
    ...updateItem.default,
    ...fetch.default,
    ...removeItems.default,
  }),
};
