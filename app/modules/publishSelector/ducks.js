import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { createPublishesSelector } from 'modules/data/ducks/selectors';
import { setPublishes } from 'modules/data/ducks/actions';
import { publishTypes } from 'appConstants';

const SLICE_NAME = 'publish_selector';

const rootSelector = (state) => state[SLICE_NAME];

const ducks = _reduce(publishTypes, (result, type) => ({
  ...result,
  [type]: createDucks({
    key: type,
    apiName: `publishes.${type}.page`,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(r) {
        yield put(setPublishes(type, r.results));
        return { result: { ...r, results: r.results.map((p) => p.objectId) } };
      },
    },
  }),
}), {});

export default {
  [SLICE_NAME]: combineReducers(_reduce(ducks, (result, duckOfType) => ({ ...result, ...duckOfType.default }), {})),
};

export const actions = _reduce(ducks, (result, duckOfType, type) => ({ ...result, [type]: duckOfType.actions[type] }), {});

export const selectors = _reduce(ducks, (sum, duckOfType, type) => ({
  ...sum,
  [type]: (state) => {
    const { result, ...other } = duckOfType.selector(state);
    if (result) {
      const publishes = createPublishesSelector(type)(state);
      return { ...other, result: { ...result, results: result.results.map((id) => _find(publishes, (p) => p.objectId === id)) } };
    }
    return { ...other };
  },
}), {});

export const sagas = _reduce(ducks, (result, duckOfType) => [...result, ...duckOfType.sagas], []);

