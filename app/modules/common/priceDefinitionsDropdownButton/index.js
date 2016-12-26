import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector, actions } from '../../api/fetchPriceDefinitions/ducks';
import Component from './priceDefinitionsDropdownButton';

export default connect(
  (state) => selector(state),
  (dispatch) => bindActionCreators(actions, dispatch),
)(Component);
