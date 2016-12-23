import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector as fetchCatalogsSelector, actions as fetchCatalogsActions } from '../../api/fetchCatalogs/ducks';
import { catalogsSelector } from '../../data/ducks/selectors';
import Component from './components';

export default connect(
  (state) => ({ fetchCatalogsState: fetchCatalogsSelector(state), catalogs: catalogsSelector(state) }),
  (dispatch) => ({ actions: bindActionCreators(fetchCatalogsActions, dispatch) }),
)(Component);
