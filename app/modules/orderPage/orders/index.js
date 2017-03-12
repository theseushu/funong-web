import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from '../ducks';
import Orders from './orders';

const changeOrder = actions.changeOrder;
const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ orders: ordersSelector(state) }),
  (dispatch) => bindActionCreators({ changeOrder }, dispatch),
)(Orders);
