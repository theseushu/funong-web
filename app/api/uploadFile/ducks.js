import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { currentUserSelector } from 'modules/data/ducks/selectors';

import rootSelector from '../rootSelector';

const UPLOAD_FILE = 'api/upload_file';
const UPLOAD_FILE_STATE = 'api/upload_file_state';
const UPLOAD_FILE_PROGRESS = 'api/upload_file_progress';

export function uploadFileReducer(state = {}, action = {}) {
  switch (action.type) {
    case UPLOAD_FILE_STATE: {
      const key = action.meta.key;
      return Object.assign({}, state, { [key]: action.payload });
    }
    case UPLOAD_FILE_PROGRESS: {
      const key = action.meta.key;
      const slice = state[key];
      return (slice && slice.pending) ? Object.assign({}, state, { [key]: Object.assign({}, slice, action.payload) }) : state;
    }
    default:
  }
  return state;
}

export default {
  uploadFile: uploadFileReducer,
};

export const actions = {
  uploadFile: ({ key, filename, width, height, dataUrl, onprogress, meta }) => ({ type: UPLOAD_FILE, payload: { filename, dataUrl, width, height, onprogress }, meta: { key, ...meta } }),
  uploadFileProgress: (key, percent) => ({ type: UPLOAD_FILE_PROGRESS, payload: { percent }, meta: { key } }),
};

export const selector = createSelector(rootSelector, (api) => api.uploadFile);

export function* uploadFileSaga({ payload: { filename, dataUrl, width, height, onprogress }, meta: { key, resolve, reject } }, api) {
  yield put({ type: UPLOAD_FILE_STATE, payload: { pending: true, percent: 0, dataUrl }, meta: { key } });
  try {
    const currentUser = yield select(currentUserSelector);
    const uploadedFile = yield call(api.uploadFile, {
      filename,
      file: { base64: dataUrl.split(',')[1] },
      onprogress,
      metaData: { owner: currentUser.objectId, width, height },
    });
    yield put({ type: UPLOAD_FILE_STATE, payload: { fulfilled: true, result: uploadedFile }, meta: { key } });
    if (typeof resolve === 'function') {
      resolve(uploadedFile);
    }
  } catch (error) {
    yield put({ type: UPLOAD_FILE_STATE, payload: { rejected: true, error }, meta: { key } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(UPLOAD_FILE, function* saga(action) {
    yield* uploadFileSaga(action, api);
  });
}

export const sagas = [
  watcher,
];
