import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from './rootSelector';
import createRestCallStateReducer from './createRestCallStateReducer';

const REQUEST_SMS_CODE = 'api/request_sms_code';
const REQUEST_SMS_CODE_STATE = 'api/request_sms_code';

export default {
  requestSmsCode: createRestCallStateReducer(REQUEST_SMS_CODE_STATE),
};

export const actions = {
  requestSmsCode: (phone) => ({ type: REQUEST_SMS_CODE, payload: { phone } }),
};

export const selectors = {
  requestSmsCode: createSelector(rootSelector, (api) => api.requestSmsCode),
};

function* requestSmsCodeSaga(action, api) {
  yield put({ type: REQUEST_SMS_CODE_STATE, payload: { pending: true } });
  try {
    yield call(api.requestSmsCode, { mobilePhoneNumber: action.payload.phone });
    yield put({ type: REQUEST_SMS_CODE_STATE, payload: { fulfilled: true, time: Date.now() } });
  } catch (error) {
    yield put({ type: REQUEST_SMS_CODE_STATE, payload: { rejected: true, error } });
  }
}

// watcher Saga:
function* watcher(api) {
  yield takeEvery(REQUEST_SMS_CODE, function* (action) {
    yield* requestSmsCodeSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
