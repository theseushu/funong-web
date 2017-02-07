import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selector as fetchCatalogsSelector, fetchCatalogs } from 'api/fetchCatalogs';
import { selector as fetchCategoriesSelector, fetchCategories } from 'api/fetchCategories';
import Component from './categorySelectorDialog';

export default connect(
  (state) => ({
    fetchCatalogsState: fetchCatalogsSelector(state),
    fetchCategoriesState: fetchCategoriesSelector(state),
  }),
  (dispatch) => ({ actions: bindActionCreators({ fetchCatalogs, fetchCategories }, dispatch) }),
)(Component);
