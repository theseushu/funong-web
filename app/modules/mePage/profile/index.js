import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from '../../data/ducks/selectors';

import Profile from './profile';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(Profile);
