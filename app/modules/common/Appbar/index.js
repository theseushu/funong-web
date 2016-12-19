import { connect } from 'react-redux';
import { currentUserSelector } from '../../data/ducks/selectors';
import Appbar from './components';

export default connect(
  (state) => ({ currentUser: currentUserSelector(state) }),
  () => ({

  })
)(Appbar);
