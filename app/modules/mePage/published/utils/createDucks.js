import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';

export default (SLICE_NAME, apiName, setData) => {
  const rootSelector = (state) => state[SLICE_NAME];

  const searchDucks = createDucks({
    key: 'search',
    apiName,
    rootSelector: (state) => rootSelector(state),
    namespace: `${SLICE_NAME}`,
    sagas: {
      * beforeFulfilled(products) {
        yield put(setData(products));
      },
    },
  });

  return {
    default: {
      [SLICE_NAME]: combineReducers({
        ...searchDucks.default,
      }),
    },
    actions: {
      search: searchDucks.actions.search,
    },
    selectors: {
      search: searchDucks.selector,
    },
    sagas: [
      ...searchDucks.sagas,
    ],
  };
};
