import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { createPublishesSelector } from 'modules/data/ducks/selectors';
import { setPublishes } from 'modules/data/ducks/actions';
import { statusValues, publishTypes } from 'funong-common/lib/appConstants';

const type = publishTypes.supply;
const SLICE_NAME = 'page_home';

const rootSelector = (state) => state[SLICE_NAME];

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
    pageSize: 8,
    ...params,
    status: [statusValues.unverified.value, statusValues.verified.value],
  });

export default {
  [SLICE_NAME]: combineReducers({
    ...recommendDucks.default,
  }),
};
export const actions = {
  recommend,
};
export const selectors = {
  recommend: (state) => {
    const { result, ...other } = recommendDucks.selector(state);
    if (result) {
      const products = createPublishesSelector(type)(state);
      return { ...other, result: result.map((id) => _find(products, (p) => p.objectId === id)) };
    }
    return { ...other };
  },
};
export const sagas = [
  ...recommendDucks.sagas,
];
