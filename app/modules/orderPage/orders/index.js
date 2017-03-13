import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from '../ducks';
import Orders from './orders';

const changeServices = actions.changeServices;
const changeServicesFee = actions.changeServicesFee;
const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ orders: ordersSelector(state) }),
  (dispatch) => bindActionCreators({ changeServices, changeServicesFee }, dispatch),
)(Orders);
