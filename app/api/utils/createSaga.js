import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

export default ({ apiName, actionConstant, stateActionConstant }, fulfilledSaga, apiSaga) => {
  const actionSaga = function* ({ payload, meta: { resolve, reject } }, api) {
    yield put({ type: stateActionConstant, payload: { pending: true } });
    try {
      const result = apiSaga ? yield* apiSaga(api[apiName], payload) : yield call(api[apiName], payload);
      yield put({ type: stateActionConstant, payload: { fulfilled: true } });
      if (fulfilledSaga) {
        yield* fulfilledSaga(result, { payload, meta: { resolve, reject } });
      }
      if (typeof resolve === 'function') {
        resolve(result);
      }
    } catch (error) {
      yield put({ type: stateActionConstant, payload: { rejected: true, error } });
      if (typeof reject === 'function') {
        reject(error);
      }
    }
  };
  const watcher = function* ({ api }) {
    yield takeEvery(actionConstant, function* saga(action) {
      yield* actionSaga(action, api);
    });
  };
  return [watcher];
};
