import { connect } from 'react-redux';
import { currentUserSelector } from '../../data/ducks/selectors';
import Appbar from './appbar';

export default connect(
  (state) => ({ currentUser: currentUserSelector(state) }),
  () => ({

  })
)(Appbar);
