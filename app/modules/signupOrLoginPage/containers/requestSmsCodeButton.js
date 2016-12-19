import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector, requestSmsCode } from '../../api/requestSmsCode';
import RequestSmsCodeButton from '../components/requestSmsCodeButton';

export default connect(
  (state) => selector(state),
  (dispatch) => ({
    onClick: bindActionCreators(requestSmsCode, dispatch),
  })
)(RequestSmsCodeButton);
