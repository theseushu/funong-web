import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Desc from './desc';
import { currentUserSelector } from '../../../data/ducks/selectors';
import { selector, updateProfile } from '../../../api/updateProfile';

export default connect(
  (state) => ({ ...selector(state), profile: currentUserSelector(state).profile }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
)(Desc);
