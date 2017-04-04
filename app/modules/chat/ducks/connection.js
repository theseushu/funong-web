import { takeEvery, eventChannel, END } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import { connect, disconnect } from '../api/leancloud';
import { selector as rootSelector, namespace as rootNamespace } from './constants';
import { actions as dataActions } from './data';

const debug = require('debug')('funongweb:chat:connection');

const namespace = `${rootNamespace}/connection`;
const UPDATE_CONNECTION_STATE = `${namespace}/update_connection_state`;
const LOGIN = `${namespace}/login`;
const RETRY = `${namespace}/retry`;
const LOGOUT = `${namespace}/logout`;

const { appendConversations, appendMessages } = dataActions;
function start(user) {
  return eventChannel((emitter) => {
    connect(user, {
      connected: () => {
        debug(`Connected at ${new Date()}`);
        emitter({ connecting: false, connected: true });
      },
      disconnect: () => {
        debug(`disconnected at ${new Date()}`);
        emitter({ connecting: true, connected: false });
      },
      schedule: (attempt, delay) => {
        const scheduled = new Date().getTime() + delay;
        debug(`Attempt ${attempt} about to start reconnecting at ${scheduled}`);
        emitter({ connecting: true, attempt, scheduled, connected: false });
      },
      retry: (attempt) => {
        debug(`Attempt ${attempt} is trying`);
        emitter({ connecting: true, attempt, connected: false });
      },
      reconnect: () => {
        debug('Reconnected');
        emitter({ connecting: true, connected: false });
      },
      stopped: () => {
        debug('Stoped');
        emitter(END);
      },
      message: (message, conversation) => {
        debug(message);
        emitter({ message, conversation });
      },
      unreadmessages: (count, conversation) => {
        emitter({ count, conversation });
      },
    });
    return disconnect;
  });
}

export default {
  connection: (state = {}, action) => {
    if (action.type === UPDATE_CONNECTION_STATE) {
      return action.payload;
    }
    return state;
  },
};

export const actions = {
  start: ({ user }) => ({ type: LOGIN, payload: { user } }),
  stop: () => ({ type: LOGOUT }),
  retry: () => ({ type: RETRY }),
};

export const selectors = { connection: (state) => rootSelector(state).connection };

// sagas
function* loginSaga({ payload: { user } }) {
  yield put({ type: UPDATE_CONNECTION_STATE, payload: { connecting: true, connected: false } });
  const chan = yield call(start, user);
  try {
    while (true) { // eslint-disable-line
      // take(END) will cause the saga to terminate by jumping to the finally block
      const event = yield take(chan);
      if (event.message) {
        yield put(appendConversations([event.conversation]));
        yield put(appendMessages([event.message]));
      } else if (event.count != null) {
        yield put(appendConversations([event.conversation]));
        if (event.conversation.lastMessage) {
          yield put(appendMessages(event.conversation.lastMessage));
        }
      } else {
        yield put({ type: UPDATE_CONNECTION_STATE, payload: event });
      }
    }
  } finally {
    yield put({ type: UPDATE_CONNECTION_STATE, payload: {} });
  }
}

function* logoutSaga() {
  yield call(disconnect);
}

function* retrySaga() {
  yield call(disconnect);
}

function* watcher() {
  yield takeEvery(LOGIN, function* saga(action) {
    yield* loginSaga(action);
  });
  yield takeEvery(LOGOUT, function* saga(action) {
    yield* logoutSaga(action);
  });
  yield takeEvery(RETRY, function* saga(action) {
    yield* retrySaga(action);
  });
}

export const sagas = [watcher];
