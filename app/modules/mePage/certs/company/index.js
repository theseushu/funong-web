import { connect } from 'react-redux';
import Company from './company';
import { company } from '../selectors';

export default connect(
  (state) => ({ cert: company(state) }),
)(Company);
