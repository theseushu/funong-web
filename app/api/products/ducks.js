import { combineReducers } from 'redux';
import { SLICE_NAME } from './constants';
import supplyReducer, { sagas as supplySagas } from './supply';
import tripReducer, { sagas as tripSagas } from './trip';
import logisticsReducer, { sagas as logisticsSagas } from './logistics';
import shopReducer, { sagas as shopSagas } from './shop';

export default {
  [SLICE_NAME]: combineReducers({
    ...supplyReducer,
    ...tripReducer,
    ...logisticsReducer,
    ...shopReducer,
  }),
};

export const sagas = [
  ...supplySagas,
  ...tripSagas,
  ...logisticsSagas,
  ...shopSagas,
];
