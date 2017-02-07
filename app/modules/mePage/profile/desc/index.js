import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from 'api/profile';
import Desc from './desc';

const updateProfile = actions.update;
const selector = selectors.update;

export default connect(
  (state) => ({ ...selector(state), user: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ updateProfile }, dispatch),
)(Desc);
