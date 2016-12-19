import { combineReducers } from 'redux';
import * as requestSmsCode from '../requestSmsCode/ducks';
import * as fetchProfile from '../fetchProfile/ducks';
import * as signupOrLoginWithMobilePhone from '../signupOrLoginWithMobilePhone/ducks';
import * as uploadAvatar from '../uploadAvatar/ducks';

export default {
  api: combineReducers({
    ...requestSmsCode.default,
    ...fetchProfile.default,
    ...signupOrLoginWithMobilePhone.default,
    ...uploadAvatar.default,
  }),
};

export const sagas = [
  ...requestSmsCode.sagas,
  ...fetchProfile.sagas,
  ...signupOrLoginWithMobilePhone.sagas,
  ...uploadAvatar.sagas,
];
