import combineReducers from 'redux/lib/combineReducers';
import * as create from './create';
import * as update from './update';
import * as fetch from './fetch';
import * as search from './search';
import { SLICE_NAME } from './constants';

export const actions = {
  ...create.actions, // create
  ...update.actions, // update
  ...fetch.actions, // fetch
  ...search.actions, // search
};

export const selectors = {
  create: create.selector,
  update: update.selector,
  fetch: fetch.selector,
  search: search.selector,
};

export const sagas = [
  ...create.sagas,
  ...update.sagas,
  ...fetch.sagas,
  ...search.sagas,
];

export default {
  [SLICE_NAME]: combineReducers({
    ...create.default,
    ...update.default,
    ...fetch.default,
    ...search.default,
  }),
};
