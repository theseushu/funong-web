import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Avatar from './avatar';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
  () => ({

  })
)(Avatar);
