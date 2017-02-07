import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selector, uploadAvatar, uploadAvatarProgress } from 'api/uploadAvatar';
import AvatarCropper from './components/avatarCropper';

export default connect(
  (state) => selector(state) || {},
  (dispatch) => bindActionCreators({ uploadAvatar, uploadAvatarProgress }, dispatch),
)(AvatarCropper);
