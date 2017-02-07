import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { setCurrentUser } from 'modules/data/ducks/actions';
import rootSelector from '../rootSelector';

const UPLOAD_AVATAR = 'api/upload_avatar';
const UPLOAD_AVATAR_STATE = 'api/upload_avatar_state';
const UPLOAD_AVATAR_PROGRESS = 'api/upload_avatar_progress';

export function uploadAvatarReducer(state = {}, action = {}) {
  switch (action.type) {
    case UPLOAD_AVATAR_STATE:
      return action.payload;
    case UPLOAD_AVATAR_PROGRESS:
      return state.pending ? Object.assign({}, state, action.payload) : state;
    default:
      return state;
  }
}

export default {
  uploadAvatar: uploadAvatarReducer,
};

export const actions = {
  uploadAvatar: ({ filename, dataUrl, onprogress }) => ({ type: UPLOAD_AVATAR, payload: { filename, dataUrl, onprogress } }),
  uploadAvatarProgress: (percent) => ({ type: UPLOAD_AVATAR_PROGRESS, payload: { percent } }),
};

export const selector = createSelector(rootSelector, (api) => api.uploadAvatar);

export function* uploadAvatarSaga({ payload: { filename, dataUrl, onprogress } }, api) {
  yield put({ type: UPLOAD_AVATAR_STATE, payload: { pending: true, percent: 0, dataUrl } });
  try {
    const profile = yield call(api.uploadAvatar, {
      filename, file: { base64: dataUrl.split(',')[1] }, onprogress,
    });
    yield put(setCurrentUser(profile));
    yield put({ type: UPLOAD_AVATAR_STATE, payload: { fulfilled: true } });
  } catch (error) {
    yield put({ type: UPLOAD_AVATAR_STATE, payload: { rejected: true, error } });
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(UPLOAD_AVATAR, function* saga(action) {
    yield* uploadAvatarSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
