import { connect } from 'react-redux';
import { currentUserSelector } from '../../data/ducks/selectors';
import Avatar from './components/avatar';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
  () => ({

  })
)(Avatar);
