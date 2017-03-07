import { combineReducers } from 'redux';
import { SLICE_NAME } from './constants';
import supplyReducer, { sagas as supplySagas } from './supply';

export default {
  [SLICE_NAME]: combineReducers({
    ...supplyReducer,
  }),
};

export const sagas = [
  ...supplySagas,
];
