import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { logout } from 'api/logout';

import Profile from './profile';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ logout }, dispatch),
)(Profile);
