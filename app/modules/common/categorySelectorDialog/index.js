import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector as fetchCatalogsSelector, actions as fetchCatalogsActions } from '../../api/fetchCatalogs/ducks';
import { selector as fetchCategoriesSelector, actions as fetchCategoriesActions } from '../../api/fetchCategories/ducks';
import Component from './categorySelectorDialog';

export default connect(
  (state) => ({
    fetchCatalogsState: fetchCatalogsSelector(state),
    fetchCategoriesState: fetchCategoriesSelector(state),
  }),
  (dispatch) => ({ actions: bindActionCreators({ ...fetchCatalogsActions, ...fetchCategoriesActions }, dispatch) }),
)(Component);
