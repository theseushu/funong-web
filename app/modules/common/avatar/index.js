import { connect } from 'react-redux';
import { selectors } from '../../data/ducks';
import Avatar from './components/avatar';

export default connect(
  (state) => ({ user: selectors.currentUserSelector(state) }),
  () => ({

  })
)(Avatar);
