import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../rootSelector';
import { createStateSelector } from '../utils/createDucks';

const SIGNUP_OR_LOGIN = 'api/signup_or_login';
const SIGNUP_OR_LOGIN_STATE = 'api/signup_or_login_with_mobilephone_state';

export default {
  signupOrLogin: createStateSelector(rootSelector, { slice: SIGNUP_OR_LOGIN_STATE }),
};

export const actions = {
  signupOrLoginWithMobilePhone: ({ phone, smsCode, password, meta = {} }) => ({ type: SIGNUP_OR_LOGIN, payload: { phone, smsCode, password }, meta }),
  loginWithPassword: ({ phone, password, meta = {} }) => ({ type: SIGNUP_OR_LOGIN, payload: { phone, password }, meta }),
};

export const selector = createSelector(rootSelector, (api) => api.signupOrLoginWithMobilePhone);

function* signupOrLoginWithMobilePhoneSaga(action, api) {
  const { phone, smsCode, password } = action.payload;
  const { resolve, reject } = action.meta;
  yield put({ type: SIGNUP_OR_LOGIN_STATE, payload: { pending: true } });
  try {
    let result;
    if (smsCode) {
      const attributes = password ? { password } : {};
      const { sessionToken, userId } = yield call(api.signupOrLoginWithMobilePhone, phone, smsCode, attributes);
      result = { sessionToken, userId };
    } else if (password) {
      const { sessionToken, userId } = yield call(api.login, phone, password);
      result = { sessionToken, userId };
    }
    yield call(api.replaceToken, result);
    yield put({ type: SIGNUP_OR_LOGIN_STATE, payload: { fulfilled: true } });
    if (typeof resolve === 'function') {
      resolve(result);
    }
  } catch (error) {
    yield put({ type: SIGNUP_OR_LOGIN_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(SIGNUP_OR_LOGIN, function* saga(action) {
    yield* signupOrLoginWithMobilePhoneSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
