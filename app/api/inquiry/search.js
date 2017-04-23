import { put } from 'redux-saga/effects';
import { setInquiries } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'search',
  apiName: 'searchInquiries',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(inquiries) {
      yield put(setInquiries(inquiries));
      return { result: inquiries.map((inquiry) => inquiry.objectId) };
    },
  },
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;
