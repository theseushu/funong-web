import { connect } from 'react-redux';
import { currentUserSelector } from '../../data/ducks/selectors';

import Certs from './certs';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(Certs);
