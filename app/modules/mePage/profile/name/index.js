import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Name from './name';
import { currentUserSelector } from '../../../data/ducks/selectors';
import { actions, selectors } from '../../../../api/profile';

const updateProfile = actions.update;
const selector = selectors.update;

export default connect(
  (state) => ({ ...selector(state), profile: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
)(Name);
