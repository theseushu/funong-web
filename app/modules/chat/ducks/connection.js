import { takeEvery, eventChannel, END } from 'redux-saga';
import { call, take, put } from 'redux-saga/effects';
import { connect, disconnect } from '../api/leancloud';
import rootSelector from './rootSelector';

const debug = require('debug')('funongweb:chat:connection');

function start(user) {
  return eventChannel((emitter) => {
    emitter({ connecting: true, connected: false });
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
    });
    return disconnect;
  });
}

const namespace = 'chat/connection';
const UPDATE_CONNECTION_STATE = `${namespace}/update_connection_state`;
const LOGIN = `${namespace}/login`;
const RETRY = `${namespace}/retry`;
const LOGOUT = `${namespace}/logout`;

export default {
  connection: (state = {}, action) => {
    if (action.type === UPDATE_CONNECTION_STATE) {
      return action.payload;
    }
    return state;
  },
};

export const actions = {
  start: (user) => ({ type: LOGIN, payload: { user } }),
  stop: () => ({ type: LOGOUT }),
  retry: () => ({ type: RETRY }),
};

export const selector = (state) => rootSelector(state).connection;

// sagas
const loginSaga = function* ({ payload: { user } }) {
  const chan = yield call(start, user);
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const state = yield take(chan);
      yield put({ type: UPDATE_CONNECTION_STATE, payload: state });
    }
  } finally {
    yield put({ type: UPDATE_CONNECTION_STATE, payload: {} });
    console.log('countdown terminated');
  }
};

const logoutSaga = function* () {
  yield call(disconnect);
};

const retrySaga = function* () {
  yield call(disconnect);
};

const watcher = function* () {
  yield takeEvery(LOGIN, function* saga(action) {
    yield* loginSaga(action);
  });
  yield takeEvery(LOGOUT, function* saga(action) {
    yield* logoutSaga(action);
  });
  yield takeEvery(RETRY, function* saga(action) {
    yield* retrySaga(action);
  });
};

export const sagas = [watcher];
