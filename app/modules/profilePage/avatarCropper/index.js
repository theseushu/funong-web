import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AvatarCropper from './components/avatarCropper';
import { actions, selector } from '../../api/uploadAvatar';

const { uploadAvatar, uploadAvatarProgress } = actions;
export default connect(
  (state) => selector(state),
  (dispatch) => bindActionCreators({ uploadAvatar, uploadAvatarProgress }, dispatch),
)(AvatarCropper);
