import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/profile';
import Type from './type';

const updateProfile = actions.update;
const selector = selectors.update;

export default connect(
  (state) => ({ ...selector(state), profile: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
)(Type);
