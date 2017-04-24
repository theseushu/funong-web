import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { createPublishesSelector } from 'modules/data/ducks/selectors';
import { setPublishes } from 'modules/data/ducks/actions';
import { statusValues, publishTypesInfo } from 'funong-common/lib/appConstants';

export default (type) => {
  const SLICE_NAME = `page_${publishTypesInfo[type].plural}`;

  const rootSelector = (state) => state[SLICE_NAME];

  const pageDucks = createDucks({
    key: 'page',
    apiName: `publishes.${type}.page`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(result) {
        yield put(setPublishes(type, result.results));
        return { result: { ...result, results: result.results.map((i) => i.objectId) } };
      },
    },
  });

  const page = (params = {}) =>
    pageDucks.actions.page({
      ...params,
      status: [statusValues.unverified.value, statusValues.verified.value],
    });

  const recommendDucks = createDucks({
    key: 'recommend',
    apiName: `publishes.${type}.recommend`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(results) {
        yield put(setPublishes(type, results));
        return { result: results.map((p) => p.objectId) };
      },
    },
  });
  const recommend = (params = {}) =>
    recommendDucks.actions.recommend({
      ...params,
      status: [statusValues.unverified.value, statusValues.verified.value],
    });

  return {
    default: {
      [SLICE_NAME]: combineReducers({
        ...pageDucks.default,
        ...recommendDucks.default,
      }),
    },
    actions: {
      page,
      recommend,
    },
    selectors: {
      page: (state) => {
        const { result, ...other } = pageDucks.selector(state);
        if (result) {
          const products = createPublishesSelector(type)(state);
          return { ...other, result: { ...result, results: result.results.map((id) => _find(products, (p) => p.objectId === id)) } };
        }
        return { ...other };
      },
      recommend: (state) => {
        const { result, ...other } = recommendDucks.selector(state);
        if (result) {
          const products = createPublishesSelector(type)(state);
          return { ...other, result: result.map((id) => _find(products, (p) => p.objectId === id)) };
        }
        return { ...other };
      },
    },
    sagas: [
      ...pageDucks.sagas,
      ...recommendDucks.sagas,
    ],
  };
};
