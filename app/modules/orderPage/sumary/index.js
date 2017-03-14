import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions as orderActions, selectors as orderApiSelectors } from 'api/order';
import { selectors } from '../ducks';
import Summary from './summary';

const addressIndexSelector = selectors.addressIndex;
const ordersSelector = selectors.orders;

const createOrders = orderActions.create;
const createStateSelector = orderApiSelectors.create;

export default connect(
  (state) => ({ orders: ordersSelector(state), address: currentUserSelector(state).addresses[addressIndexSelector(state)], ...createStateSelector(state) }),
  (dispatch) => bindActionCreators({ createOrders }, dispatch),
)(Summary);
