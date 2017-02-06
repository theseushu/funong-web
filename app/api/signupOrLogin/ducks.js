import { call } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import rootSelector from '../rootSelector';
import namespace from '../namespace';

const ducks = createDucks({
  key: 'signupOrLogin',
  apiName: 'signupOrLogin',
  rootSelector,
  namespace,
  sagas: {
    * api({ loginWithPassword, signupOrLoginWithMobilePhone }, { phone, smsCode, password }) {
      if (smsCode) {
        const attributes = password ? { password } : {};
        yield call(signupOrLoginWithMobilePhone, phone, smsCode, attributes);
      } else if (password) {
        yield call(loginWithPassword, phone, password);
      }
    },
  },
});

module.exports = ducks;
