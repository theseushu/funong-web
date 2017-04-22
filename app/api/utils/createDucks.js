import snakeCase from 'snake-case';
import _get from 'lodash/get';
import { createSelector } from 'reselect';
import { takeEvery, call, put } from 'redux-saga/effects';
const debug = require('debug')('funong-web:api/utils/createDucks');

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
export const restCallStateReducerCreator = (ACTION_TYPE) => (state = {}, action) => (action.type === ACTION_TYPE ? { ...state, ...action.payload } : state);

export const createReducer = ({ slice, stateActionConstant }, reducerCreator) => {
  if (typeof reducerCreator === 'function') {
    return {
      [slice]: reducerCreator(stateActionConstant),
    };
  }
  return {
    [slice]: restCallStateReducerCreator(stateActionConstant),
  };
};

// selector
export const createStateSelector = (rootSelector, { slice }) => createSelector(rootSelector, (root) => root ? { ...root[slice] } : null);

// sagas
export const createSaga = ({ apiName, actionConstant, stateActionConstant }, beforeFulfilledSaga, apiSaga) => {
  const actionSaga = function* ({ payload, meta: { resolve, reject } }, api) {
    yield put({ type: stateActionConstant, payload: { pending: true, fulfilled: false, rejected: false, error: null } });
    try {
      // if you need to do other stuff rather than simply call the api, use apiSaga
      // a sample usage would be cache result in api state after 1st call, use the cached results later
      const result = apiSaga ? yield* apiSaga(api, payload) : yield call(_get(api, (apiName)), payload);
      if (beforeFulfilledSaga) {
        const beforeResult = yield* beforeFulfilledSaga(result, { payload, meta: { resolve, reject } });
        yield put({ type: stateActionConstant, payload: { pending: false, fulfilled: true, error: null, rejected: false, ...beforeResult } });
      } else {
        yield put({ type: stateActionConstant, payload: { pending: false, fulfilled: true, error: null, rejected: false } });
      }
      if (typeof resolve === 'function') {
        resolve(result);
      }
    } catch (error) {
      debug(`Error when calling ${apiName}`);
      debug(error);
      yield put({ type: stateActionConstant, payload: { pending: false, fulfilled: false, rejected: true, error } });
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
 * @param apiName the api to call (api.apiName) NOTE: you can use name like 'products.supply.create', the api to call will be api.products.supply.create
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
