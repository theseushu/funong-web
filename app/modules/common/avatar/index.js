import { connect } from 'react-redux';
import { currentUserSelector } from '../../data/ducks/selectors';
import Avatar from './avatar';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
  () => ({

  })
)(Avatar);
