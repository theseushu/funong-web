/*
 * This is for apis like 'likeProduct', 'deleteProduct', which can be called simultaneously for different object
 * store state will be like:
 * {
 *  key1: {
 *    pending
 *    error
 *    fulfilled
 *    result
 *  },
 *  key2: {
 *    pending
 *    error
 *    fulfilled
 *    result
 *  }
 *  ...
 * }
 */
import snakeCase from 'snake-case';
import { createSelector } from 'reselect';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// names
export const createNames = ({ apiName, namespace, key = apiName }) => ({
  slice: key,
  actionConstant: `${namespace}/${snakeCase(key)}`,
  stateActionConstant: `${namespace}/${snakeCase(key)}_state`,
  action: key,
  apiName,
});

// action creators
export const createActionCreators = ({ actionConstant, action }) => ({
  [action]: (actionParams) => {
    const { meta = {}, ...params } = actionParams || {};
    return { type: actionConstant, payload: { ...params }, meta };
  },
});

// reducer
// a simple default one. it just replace states with action.payload
export const restCallStateReducerCreator = (ACTION_TYPE) => (state = {}, action) => {
  if (action.type === ACTION_TYPE) {
    const { meta: { storeKey }, payload } = action;
    return { ...state, [storeKey]: payload };
  }
  return state;
};

export const createReducer = ({ ids, slice, stateActionConstant }, reducerCreator, storeKeyGenerator) => {
  if (typeof reducerCreator === 'function') {
    return {
      [slice]: reducerCreator(stateActionConstant, storeKeyGenerator),
    };
  }
  return {
    [slice]: restCallStateReducerCreator(stateActionConstant, storeKeyGenerator),
  };
};

// selector
export const createStateSelector = (rootSelector, { slice }) => createSelector(rootSelector, (root) => root ? { ...root[slice] } : null);

// sagas
export const createSaga = ({ apiName, actionConstant, stateActionConstant }, beforeFulfilledSaga, apiSaga) => {
  const actionSaga = function* ({ payload, meta: { storeKey, resolve, reject } }, api) {
    if (!storeKey) {
      throw new Error('You must include storeKey in action.meta.');
    }
    yield put({ type: stateActionConstant, payload: { pending: true }, meta: { storeKey } });
    try {
      // if you need to do other stuff rather than simply call the api, use apiSaga
      // a sample usage would be cache result in api state after 1st call, use the cached results later
      const result = apiSaga ? yield* apiSaga(api, payload) : yield call(api[apiName], payload);
      if (beforeFulfilledSaga) {
        const beforeResult = yield* beforeFulfilledSaga(result, { payload, meta: { resolve, reject } });
        yield put({ type: stateActionConstant, payload: { fulfilled: true, ...beforeResult }, meta: { storeKey } });
      } else {
        yield put({ type: stateActionConstant, payload: { fulfilled: true }, meta: { storeKey } });
      }
      if (typeof resolve === 'function') {
        resolve(result);
      }
    } catch (error) {
      yield put({ type: stateActionConstant, payload: { rejected: true, error }, meta: { storeKey } });
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

/**
 * @param apiName the api to call (api.apiName)
 * @param key optional key name. (default is same as apiName). it will be used to create the slice name of the state, the action creator's name and the action types
 * @param rootSelector the slice of store state this reducer will be put in. eg: state => state.api.user
 * @param reducerCreator optional creator for reducer. if reducer is not as simple as replacing state by action.payload, set one here
 * @param namespace namespace for action.type. eg: api/user
 * @param beforeFulfilled optioal generator function to call before finishing api call. typical usage would be set data by normalizr. the result of this generator will be put into state as well
 * @param api optional generator function. instead of calling api, the generated saga will call this generator method. you can do complicated things here. like a fetch-once cache
 * @returns {{actions, default: {}, selector, sagas}}
 */
export default ({ key, apiName, rootSelector, reducerCreator, namespace, sagas: { beforeFulfilled, api } }) => {
  const names = createNames({ apiName, namespace, key });
  const actions = createActionCreators(names);
  const reducer = createReducer(names, reducerCreator);
  const selector = createStateSelector(rootSelector, names);
  const sagas = createSaga(names, beforeFulfilled, api);

  return {
    actions,
    default: reducer,
    selector,
    sagas,
  };
};
