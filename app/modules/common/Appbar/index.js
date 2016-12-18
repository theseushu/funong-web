import { connect } from 'react-redux';
import { selectors } from '../../data/ducks';
import Appbar from './components';

export default connect(
  (state) => ({ currentUser: selectors.currentUserSelector(state) }),
  () => ({

  })
)(Appbar);
