import combineReducers from 'redux/lib/combineReducers';
import * as create from './create';
import * as update from './update';
import * as searchMine from './searchMine';
import { SLICE_NAME } from './constants';

export const actions = {
  ...create.actions, // create
  ...update.actions, // update
  ...searchMine.actions, // fetch
};

export const selectors = {
  create: create.selector,
  update: update.selector,
  searchMine: searchMine.selector,
};

export const sagas = [
  ...create.sagas,
  ...update.sagas,
  ...searchMine.sagas,
];

export default {
  [SLICE_NAME]: combineReducers({
    ...create.default,
    ...update.default,
    ...searchMine.default,
  }),
};
