import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import { combineReducers } from 'redux';
import { productTypes } from 'funong-common/lib/appConstants';
import { SLICE_NAME } from './constants';

import createDucks from './utils/createDucks';

const ducksArray = _map(productTypes, (type) => ({
  type,
  ducks: createDucks(type),
}));

export default {
  [SLICE_NAME]: combineReducers(_reduce(ducksArray, (result, { ducks }) => ({ ...result, ...ducks.default }), {})),
};

export const sagas = _reduce(ducksArray, (result, { ducks }) => [...result, ...ducks.sagas], []);

export const actions = _reduce(ducksArray, (result, { type, ducks }) => ({ ...result, [type]: ducks.actions }), {});

export const selectors = _reduce(ducksArray, (result, { type, ducks }) => ({ ...result, [type]: ducks.selectors }), {});
