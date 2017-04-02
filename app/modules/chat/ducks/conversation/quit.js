import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { actions as listActions } from './list';
import { quitConversation } from '../../api/leancloud';
import rootSelector from './rootSelector';
import sliceName from './sliceName';

const debug = require('debug')('funongweb:chat:conversation:quit');

const namespace = `${sliceName}/quit`;
const QUIT_STATE = `${namespace}/state`;
const QUIT = `${namespace}/quit`;

export default {
  quit: (state = {}, action) => {
    if (action.type === QUIT_STATE) {
      return action.payload;
    }
    return state;
  },
};

export const actions = {
  quitConversation: ({ objectId, meta = {} }) => ({ type: QUIT, payload: { objectId }, meta }),
};

export const selector = (state) => rootSelector(state).quit;

// sagas
const { setCurrentConversation, removeConversation } = listActions;

function* quitSaga({ payload: { objectId }, meta: { resolve, reject } }) {
  yield put({ type: QUIT_STATE, payload: { pending: true } });
  try {
    yield call(quitConversation, objectId);
    yield put(removeConversation(objectId));
    yield put(setCurrentConversation(null));
    yield put({ type: QUIT_STATE, payload: { fulfilled: true } });
    if (resolve) {
      resolve(objectId);
    }
  } catch (err) {
    debug(err);
    if (reject) {
      reject(err);
    }
    yield put({ type: QUIT_STATE, payload: { rejected: true, error: err } });
  }
}

function* watcher() {
  yield takeEvery(QUIT, function* saga(action) {
    yield* quitSaga(action);
  });
}

export const sagas = [watcher];
