import { bindActionCreators } from 'redux'; // eslint-disable-line
import { connect } from 'react-redux';
import { actions, selectors } from './ducks'; // eslint-disable-line
import Orders from './orders';

const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ orders: ordersSelector(state) }),
)(Orders);
