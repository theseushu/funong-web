import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from '../ducks';
import Orders from './orders';

const changeMessage = actions.changeMessage;
const changeServices = actions.changeServices;
const changeServicesFee = actions.changeServicesFee;
const changeDeliveryFee = actions.changeDeliveryFee;
const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ orders: ordersSelector(state) }),
  (dispatch) => bindActionCreators({ changeMessage, changeServices, changeServicesFee, changeDeliveryFee }, dispatch),
)(Orders);
