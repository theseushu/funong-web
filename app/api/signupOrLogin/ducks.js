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
        if (smsCode && password) { // its signup
          attributes.name = `${phone.substring(0, 3)}**${phone.substring(phone.length - 2, phone.length)}`;
        }
        yield call(signupOrLoginWithMobilePhone, phone, smsCode, attributes);
      } else if (password) {
        yield call(loginWithPassword, phone, password);
      }
    },
  },
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
