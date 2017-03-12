import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from '../ducks';
import Orders from './orders';

const setOrders = actions.setOrders;
const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ user: currentUserSelector(state), orders: ordersSelector(state) }),
  (dispatch) => bindActionCreators({ setOrders }, dispatch),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  })
)(Orders);
