import { connect } from 'react-redux';
import Personal from './personal';
import { personal } from '../selectors';

export default connect(
  (state) => ({ cert: personal(state) }),
)(Personal);
