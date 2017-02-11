import { connect } from 'react-redux';
import Expert from './expert';
import { expert } from '../selectors';

export default connect(
  (state) => ({ cert: expert(state) }),
)(Expert);
