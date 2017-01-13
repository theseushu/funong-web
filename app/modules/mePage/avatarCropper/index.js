import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AvatarCropper from './components/avatarCropper';
import { selector, uploadAvatar, uploadAvatarProgress } from '../../api/uploadAvatar';

export default connect(
  (state) => selector(state),
  (dispatch) => bindActionCreators({ uploadAvatar, uploadAvatarProgress }, dispatch),
)(AvatarCropper);
