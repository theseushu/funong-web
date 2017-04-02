import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { actions as listActions } from './list';
import { createConversation } from '../../api/leancloud';
import rootSelector from './rootSelector';
import sliceName from './sliceName';

const debug = require('debug')('funongweb:chat:conversation:create');

const namespace = `${sliceName}/create`;
const CREATE_STATE = `${namespace}/state`;
const START = `${namespace}/start`;

export default {
  create: (state = {}, action) => {
    if (action.type === CREATE_STATE) {
      return action.payload;
    }
    return state;
  },
};

export const actions = {
  createConversation: ({ currentUser, user, meta = {} }) => ({ type: START, payload: { currentUser, user }, meta }),
};

export const selector = (state) => rootSelector(state).create;

// sagas
const { setCurrentConversation, appendConversations } = listActions;
const createSaga = function* ({ payload: { currentUser, user }, meta: { resolve, reject } }) {
  yield put({ type: CREATE_STATE, payload: { pending: true } });
  try {
    const conversation = yield call(createConversation, currentUser, user);
    yield put(appendConversations([conversation]));
    yield put(setCurrentConversation(conversation.objectId));
    yield put({ type: CREATE_STATE, payload: { fulfilled: true } });
    if (resolve) {
      resolve(conversation);
    }
  } catch (err) {
    debug(err);
    if (reject) {
      reject(err);
    }
    yield put({ type: CREATE_STATE, payload: { rejected: true, error: err } });
  }
};

const watcher = function* () {
  yield takeEvery(START, function* saga(action) {
    yield* createSaga(action);
  });
};

export const sagas = [watcher];
