import combineReducers from 'redux/lib/combineReducers';
import * as create from './create';
import * as update from './update';
import * as fetch from './fetch';
import { SLICE_NAME } from './constants';

export const actions = {
  ...create.actions, // create
  ...update.actions, // update
  ...fetch.actions, // fetch
};

export const selectors = {
  create: create.selector,
  update: update.selector,
  fetch: fetch.selector,
};

export const sagas = [
  ...create.sagas,
  ...update.sagas,
  ...fetch.sagas,
];

export default {
  [SLICE_NAME]: combineReducers({
    ...create.default,
    ...update.default,
    ...fetch.default,
  }),
};
