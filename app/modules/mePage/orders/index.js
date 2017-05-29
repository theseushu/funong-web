import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { actions, selectors } from './ducks';
import Orders from './orders';

const pageSelector = selectors.page;
const selectedSelector = selectors.selected;

const { select, deselect } = actions;

export default connect(
  (state) => ({ ...pageSelector(state), selected: selectedSelector(state), user: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({ select, deselect }, dispatch),
)(Orders);
