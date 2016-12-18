import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../../api/ducks';
import RequestSmsCodeButton from '../components/requestSmsCodeButton';

const { requestSmsCode } = actions;

export default connect(
  (state) => selectors.requestSmsCode(state),
  (dispatch) => ({
    onClick: bindActionCreators(requestSmsCode, dispatch),
  })
)(RequestSmsCodeButton);
