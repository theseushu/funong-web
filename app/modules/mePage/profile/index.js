import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';

import Profile from './profile';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(Profile);
