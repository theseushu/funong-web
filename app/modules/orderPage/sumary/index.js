import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { selectors } from '../ducks';
import Summary from './summary';

const addressIndexSelector = selectors.addressIndex;
const ordersSelector = selectors.orders;

export default connect(
  (state) => ({ orders: ordersSelector(state), address: currentUserSelector(state).addresses[addressIndexSelector(state)] }),
  (dispatch) => bindActionCreators({}, dispatch),
)(Summary);
