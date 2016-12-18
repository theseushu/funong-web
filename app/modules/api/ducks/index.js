import { combineReducers } from 'redux';
import * as requestSmsCode from './requestSmsCodeDucks';
import * as fetchProfile from './fetchProfileDucks';
import * as signupOrLoginWithMobilePhone from './signupOrLoginWithMobilePhoneDucks';

export default {
  api: combineReducers({
    ...requestSmsCode.default,
    ...fetchProfile.default,
    ...signupOrLoginWithMobilePhone.default,
  }),
};

export const actions = {
  ...requestSmsCode.actions,
  ...fetchProfile.actions,
  ...signupOrLoginWithMobilePhone.actions,
};

export const selectors = {
  ...requestSmsCode.selectors,
  ...fetchProfile.actions,
  ...signupOrLoginWithMobilePhone.selectors,
};

export const sagas = [
  ...requestSmsCode.sagas,
  ...fetchProfile.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
];
