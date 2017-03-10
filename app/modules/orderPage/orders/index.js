import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Orders from './orders';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({}, dispatch),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  })
)(Orders);
