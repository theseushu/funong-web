import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/profile/update';
import Addresses from './addresses';

const { update } = actions;
const updateStateSelector = selectors.update;

export default connect(
  (state) => ({ user: currentUserSelector(state), updateState: updateStateSelector(state) }),
  (dispatch) => bindActionCreators({ update }, dispatch),
)(Addresses);
