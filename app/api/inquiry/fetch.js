import { put } from 'redux-saga/effects';
import { setInquiries } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'fetch',
  apiName: 'fetchInquiry',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(inquiry) {
      yield put(setInquiries([inquiry]));
    },
  },
});

module.exports = ducks;
