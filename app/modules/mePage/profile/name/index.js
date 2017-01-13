import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Name from './name';
import { currentUserSelector } from '../../../data/ducks/selectors';
import { selector, updateProfile } from '../../../api/updateProfile';

export default connect(
  (state) => ({ ...selector(state), profile: currentUserSelector(state).profile }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
)(Name);
