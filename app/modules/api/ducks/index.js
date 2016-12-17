import { combineReducers } from 'redux';
import * as requestSmsCode from './requestSmsCodeducks';

export default {
  api: combineReducers({
    ...requestSmsCode.default,
  }),
};

export const actions = {
  ...requestSmsCode.actions,
};

export const selectors = {
  ...requestSmsCode.selectors,
};

export const sagas = [
  ...requestSmsCode.sagas,
];
