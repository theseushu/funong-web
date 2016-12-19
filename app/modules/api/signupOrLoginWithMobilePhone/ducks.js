import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';
import createRestCallStateReducer from '../ducks/createRestCallStateReducer';
import { saveSessionTokenInCookie } from '../../../utils/sessionTokenUtils';

const SIGNUP_OR_LOGIN_WITH_MOBILEPHONE = 'api/signup_or_login_with_mobilephone';
const SIGNUP_OR_LOGIN_WITH_MOBILEPHONE_STATE = 'api/signup_or_login_with_mobilephone_state';

export default {
  signupOrLoginWithMobilePhone: createRestCallStateReducer(SIGNUP_OR_LOGIN_WITH_MOBILEPHONE_STATE),
};

export const actions = {
  signupOrLoginWithMobilePhone: ({ phone, smsCode, meta = {} }) => ({ type: SIGNUP_OR_LOGIN_WITH_MOBILEPHONE, payload: { phone, smsCode }, meta }),
};

export const selector = createSelector(rootSelector, (api) => api.signupOrLoginWithMobilePhone);

function* signupOrLoginWithMobilePhoneSaga(action, api) {
  const { phone, smsCode } = action.payload;
  const { resolve, reject } = action.meta;
  yield put({ type: SIGNUP_OR_LOGIN_WITH_MOBILEPHONE_STATE, payload: { pending: true } });
  try {
    const { sessionToken, userId } = yield call(api.signupOrLoginWithMobilePhone, phone, smsCode);
    yield call(saveSessionTokenInCookie, { sessionToken, userId });
    yield call(api.replaceToken, sessionToken);
    yield put({ type: SIGNUP_OR_LOGIN_WITH_MOBILEPHONE_STATE, payload: { fulfilled: true } });
    if (typeof resolve === 'function') {
      resolve({ sessionToken, userId });
    }
  } catch (error) {
    yield put({ type: SIGNUP_OR_LOGIN_WITH_MOBILEPHONE_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(SIGNUP_OR_LOGIN_WITH_MOBILEPHONE, function* saga(action) {
    yield* signupOrLoginWithMobilePhoneSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
