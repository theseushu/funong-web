import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';

import Certs from './certs';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(Certs);
