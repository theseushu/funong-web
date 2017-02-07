import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Products from './products';

export default connect(
  (state) => ({ user: currentUserSelector(state) }),
)(Products);

