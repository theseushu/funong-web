import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, selectors } from '../ducks';
import Component from './criteria';

export default connect(
  (state) => ({
    ...selectors.criteria(state),
  }),
  (dispatch) => bindActionCreators({ setCriteria: actions.setCriteria }, dispatch),
)(Component);
