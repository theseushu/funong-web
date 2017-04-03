import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { selectors as dataSelectors } from '../data';
import { sendTextMessage } from '../../api/leancloud';
import { selector as rootSelector, namespace as rootNamespace } from './constants';

const debug = require('debug')('funongweb:chat:conversation:sendMessage');

const namespace = `${rootNamespace}/sendMessage`;
const STATE = `${namespace}/state`;
const SEND_TEXT_MESSAGE = `${namespace}/sendTextMessage`;

export default {
  sendMessage: (state = {}, action) => {
    if (action.type === STATE) {
      return action.payload;
    }
    return state;
  },
};

export const actions = {
  sendTextMessage: ({ message, meta = {} }) => ({ type: SEND_TEXT_MESSAGE, payload: { message }, meta }),
};

export const selector = (state) => rootSelector(state).sendMessage;

// sagas
const currentConversationSelector = dataSelectors.currentConversation;
function* sendTextMessageSaga({ payload: { message }, meta: { resolve, reject } }) {
  yield put({ type: STATE, payload: { pending: true } });
  try {
    const currentConversation = yield select(currentConversationSelector);
    if (!currentConversation) {
      throw new Error('There is no current conversation. Check your code');
    }
    const conversation = yield call(sendTextMessage, currentConversation.objectId, message);
    yield put({ type: STATE, payload: { fulfilled: true } });
    if (resolve) {
      resolve(conversation);
    }
  } catch (err) {
    debug(err);
    if (reject) {
      reject(err);
    }
    yield put({ type: STATE, payload: { rejected: true, error: err } });
  }
}

function* watcher() {
  yield takeEvery(SEND_TEXT_MESSAGE, function* saga(action) {
    yield* sendTextMessageSaga(action);
  });
}

export const sagas = [watcher];
