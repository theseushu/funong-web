import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { bidsSelector } from 'modules/data/ducks/selectors';
import { setBids } from 'modules/data/ducks/actions';
import getSliceName from '../../utils/page/getSliceName';
import type from '../constants';

const SLICE_NAME = getSliceName(type);

const rootSelector = (state) => state[SLICE_NAME];

const pageBidsDucks = createDucks({
  key: 'pageBids',
  apiName: 'pageBids',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(result) {
      yield put(setBids(result.results));
      return { result: { ...result, results: result.results.map((i) => i.objectId) } };
    },
  },
});

const pageMyBidsDucks = createDucks({
  key: 'pageMyBids',
  apiName: 'pageBids',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(result) {
      yield put(setBids(result.results));
      return { result: { ...result, results: result.results.map((i) => i.objectId) } };
    },
  },
});

export default {
  [SLICE_NAME]: combineReducers({
    ...pageBidsDucks.default,
    ...pageMyBidsDucks.default,
  }),
};

export const actions = {
  pageBids: pageBidsDucks.actions.pageBids,
  pageMyBids: pageMyBidsDucks.actions.pageMyBids,
};

export const selectors = {
  pageBids: (state) => {
    const { result, ...other } = pageBidsDucks.selector(state);
    if (result) {
      const allBids = bidsSelector(state);
      return { ...other, result: { ...result, results: result.results.map((id) => _find(allBids, (i) => i.objectId === id)) } };
    }
    return { ...other };
  },
  pageMyBids: (state) => {
    const { result, ...other } = pageMyBidsDucks.selector(state);
    if (result) {
      const allBids = bidsSelector(state);
      return { ...other, result: { ...result, results: result.results.map((id) => _find(allBids, (i) => i.objectId === id)) } };
    }
    return { ...other };
  },
};
export const sagas = [
  ...pageBidsDucks.sagas,
  ...pageMyBidsDucks.sagas,
];
