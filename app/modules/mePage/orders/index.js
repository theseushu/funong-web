import { bindActionCreators } from 'redux'; // eslint-disable-line
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from './ducks'; // eslint-disable-line
import Orders from './orders';

const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ orders: ordersSelector(state), user: currentUserSelector(state) }),
)(Orders);
