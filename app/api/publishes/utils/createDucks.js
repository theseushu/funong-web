import combineReducers from 'redux/lib/combineReducers';
import { put, select } from 'redux-saga/effects';
import { setPublishes, removePublishes } from 'modules/data/ducks/actions';
import { createPublishSelector } from 'modules/data/ducks/selectors';
import createDucks from 'api/utils/createDucks';
import createCompositeDucks from 'api/utils/createCompositeDucks';
import { NAMESPACE as publishNamespace } from '../constants';
import publishesSelector from '../rootSelector';

export default (type) => {
  const SLICE_NAME = type;
  const NAMESPACE = `${publishNamespace}/${type}`;
  const rootSelector = (state) => publishesSelector(state)[type];
  const create = createDucks({
    key: 'create',
    apiName: `publishes.${type}.create`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setPublishes(type, [product]));
      },
    },
  });
  const fetch = createDucks({
    key: 'fetch',
    apiName: `publishes.${type}.fetch`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled(product) {
        yield put(setPublishes(type, [product]));
      },
    },
  });
  const update = createDucks({
    key: 'update',
    apiName: `publishes.${type}.update`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId, ...attrs }) {
        const product = yield select(createPublishSelector(type, objectId));
        yield put(setPublishes(type, [{ ...product, ...attrs }]));
      },
    },
  });
  const enable = createCompositeDucks({
    key: 'enable',
    apiName: `publishes.${type}.enable`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId, status, updatedAt }) {
        const product = yield select(createPublishSelector(type, objectId));
        yield put(setPublishes(type, [{ ...product, status, updatedAt }]));
      },
    },
  });
  const disable = createCompositeDucks({
    key: 'disable',
    apiName: `publishes.${type}.disable`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId, status, updatedAt }) {
        const product = yield select(createPublishSelector(type, objectId));
        yield put(setPublishes(type, [{ ...product, status, updatedAt }]));
      },
    },
  });
  const remove = createCompositeDucks({
    key: 'remove',
    apiName: `publishes.${type}.remove`,
    rootSelector: (state) => rootSelector(state),
    namespace: NAMESPACE,
    sagas: {
      * beforeFulfilled({ objectId }) {
        yield put(removePublishes(type, [objectId]));
      },
    },
  });
  return {
    actions: {
      ...create.actions,
      ...fetch.actions,
      ...update.actions,
      ...enable.actions,
      ...disable.actions,
      ...remove.actions,
    },
    selectors: {
      create: create.selector,
      update: update.selector,
      fetch: fetch.selector,
      enable: enable.selector,
      disable: disable.selector,
      remove: remove.selector,
    },
    sagas: [
      ...create.sagas,
      ...update.sagas,
      ...fetch.sagas,
      ...enable.sagas,
      ...disable.sagas,
      ...remove.sagas,
    ],
    default: {
      [SLICE_NAME]: combineReducers({
        ...create.default,
        ...update.default,
        ...fetch.default,
        ...enable.default,
        ...disable.default,
        ...remove.default,
      }),
    },
  };
};
