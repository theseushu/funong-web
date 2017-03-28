import { put } from 'redux-saga/effects';
import { setInquiries } from 'modules/data/ducks/actions';
import { statusValues } from 'appConstants';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'remove',
  apiName: 'changeInquiryStatus',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(inquiry) {
      yield put(setInquiries([inquiry]));
    },
  },
});

const changeInquiryStatus = ducks.actions.remove;
ducks.actions.remove = ({ objectId }) => changeInquiryStatus({ objectId, status: statusValues.removed.value });

module.exports = ducks;
