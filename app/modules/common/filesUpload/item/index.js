import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector, actions } from 'api/uploadFile/ducks';
import Component from './item';

export default connect(
  (state) => ({ uploadStates: selector(state) }),
  (dispatch) => bindActionCreators(actions, dispatch),
)(Component);
