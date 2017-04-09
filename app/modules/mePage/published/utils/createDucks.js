import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';

export default (SLICE_NAME, apiName, setData, selectFromData) => {
  const rootSelector = (state) => state[SLICE_NAME];

  const pageDucks = createDucks({
    key: 'page',
    apiName,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(result) {
        yield put(setData(result.results));
        return { result: { ...result, results: result.results.map((i) => i.objectId) } };
      },
    },
  });

  return {
    default: {
      [SLICE_NAME]: combineReducers({
        ...pageDucks.default,
      }),
    },
    actions: {
      page: pageDucks.actions.page,
    },
    selectors: {
      page: (state) => {
        const { result, ...other } = pageDucks.selector(state);
        if (result) {
          return { ...other, result: { ...result, results: selectFromData(state, result.results) } };
        }
        return { ...other };
      },
    },
    sagas: [
      ...pageDucks.sagas,
    ],
  };
};
